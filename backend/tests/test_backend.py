"""Integration and unit tests for LexiGuide AI FastAPI backend."""
import io
import pymupdf as fitz
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services.retrieval_service import document_store


@pytest.fixture
def client():
    """Create FastAPI test client."""
    return TestClient(app)


@pytest.fixture
def sample_pdf_bytes() -> bytes:
    """Generate a multi-page searchable PDF in memory using PyMuPDF."""
    doc = fitz.open()

    # Page 1: Rental terms
    page1 = doc.new_page()
    page1.insert_text(
        (50, 72),
        "STANDARD RESIDENTIAL LEASE AGREEMENT\n\n"
        "1. PARTIES: This agreement is made between Metro Properties LLC (Landlord) and Jane Doe (Tenant).\n\n"
        "2. TERM AND RENT: The lease term commences on June 1, 2026. Monthly rent is $2,850 payable on the first day of each calendar month.\n\n"
        "3. LATE CHARGES: If rent is not received by 11:59 PM on the 5th day of the month, Tenant shall pay a late fee of $150."
    )

    # Page 2: Security Deposit & Termination
    page2 = doc.new_page()
    page2.insert_text(
        (50, 72),
        "4. SECURITY DEPOSIT: Tenant shall deposit the sum of $2,850 upon execution. The deposit shall be returned within 30 days after lease expiration minus lawful deductions.\n\n"
        "5. EARLY TERMINATION: Tenant may terminate early by providing 60 days written notice and paying an early termination fee equivalent to two months' rent ($5,700).\n\n"
        "6. PET POLICY: Domestic pets under 35 pounds are permitted with a one-time non-refundable pet fee of $300."
    )

    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


@pytest.fixture
def blank_pdf_bytes() -> bytes:
    """Generate a blank PDF with no selectable text."""
    doc = fitz.open()
    doc.new_page()  # Blank page
    pdf_bytes = doc.tobytes()
    doc.close()
    return pdf_bytes


def test_health_check(client):
    """Test /health endpoint returns 200 and expected status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["app"] == "LexiGuide AI Backend"
    assert "version" in data


def test_upload_unsupported_file_format(client):
    """Uploading an unsupported extension (e.g. .exe) should return 400."""
    fake_file = io.BytesIO(b"binary data")
    response = client.post(
        "/api/documents/upload",
        files={"file": ("malicious.exe", fake_file, "application/octet-stream")}
    )
    assert response.status_code == 400
    assert "Unsupported file format" in response.json()["detail"]


def test_upload_empty_file(client):
    """Uploading an empty 0-byte file should return 400."""
    empty_file = io.BytesIO(b"")
    response = client.post(
        "/api/documents/upload",
        files={"file": ("empty.txt", empty_file, "text/plain")}
    )
    assert response.status_code == 400
    assert "empty" in response.json()["detail"].lower()


def test_upload_plain_text(client):
    """Uploading a valid plain text document extracts text and chunks properly."""
    text_content = (
        "EMPLOYMENT AGREEMENT\n\n"
        "Section 1. Position: Senior Software Engineer.\n\n"
        "Section 2. Compensation: Base salary of $160,000 per annum, paid bi-weekly.\n\n"
        "Section 3. Non-Disclosure: Employee agrees not to disclose proprietary code or trade secrets."
    ).encode("utf-8")

    file_obj = io.BytesIO(text_content)
    response = client.post(
        "/api/documents/upload",
        files={"file": ("employment_agreement.txt", file_obj, "text/plain")}
    )
    assert response.status_code == 201
    data = response.json()
    assert "document_id" in data
    assert data["filename"] == "employment_agreement.txt"
    assert data["file_type"] == "txt"
    assert data["page_count"] == 1
    assert data["chunk_count"] >= 1
    assert "preview" in data


def test_upload_valid_pdf(client, sample_pdf_bytes):
    """Uploading a multi-page PDF extracts pages and chunks."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    response = client.post(
        "/api/documents/upload",
        files={"file": ("sample_lease.pdf", file_obj, "application/pdf")}
    )
    assert response.status_code == 201
    data = response.json()
    assert "document_id" in data
    assert data["filename"] == "sample_lease.pdf"
    assert data["file_type"] == "pdf"
    assert data["page_count"] == 2
    assert data["chunk_count"] >= 2
    assert "LEASE AGREEMENT" in data["preview"]


def test_upload_scanned_or_blank_pdf(client, blank_pdf_bytes):
    """Uploading a PDF with no extractable text returns 422 with explanation."""
    file_obj = io.BytesIO(blank_pdf_bytes)
    response = client.post(
        "/api/documents/upload",
        files={"file": ("scanned_document.pdf", file_obj, "application/pdf")}
    )
    assert response.status_code == 422
    assert "scanned" in response.json()["detail"].lower() or "no selectable digital text" in response.json()["detail"].lower()


def test_ask_question_nonexistent_document(client):
    """Asking a question on an invalid document ID returns 404."""
    response = client.post(
        "/api/documents/non-existent-doc-id/ask",
        json={"question": "What is the monthly rent?"}
    )
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_ask_question_empty_query(client, sample_pdf_bytes):
    """Asking an empty question returns 400 or 422 validation error."""
    # First upload a document
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "   "}
    )
    assert response.status_code in (400, 422)


def test_ask_question_grounded_response_and_citations(client, sample_pdf_bytes):
    """Asking a question retrieves relevant chunks and cites the appropriate page."""
    # Upload lease document
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_grounding_test.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    # Ask about the security deposit (which is on Page 2)
    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "What is the security deposit amount and when is it returned?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["document_id"] == doc_id
    assert "question" in data
    assert "answer" in data
    assert "sources" in data
    assert len(data["sources"]) > 0
    # Confirm security deposit chunk on Page 2 was retrieved
    source_pages = [s["page"] for s in data["sources"]]
    assert 2 in source_pages
    assert "disclaimer" in data
    assert "not formal legal advice" in data["disclaimer"]


def test_get_document_metadata(client, sample_pdf_bytes):
    """Fetching document metadata by ID returns valid statistics."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("metadata_test.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    meta_res = client.get(f"/api/documents/{doc_id}")
    assert meta_res.status_code == 200
    meta = meta_res.json()
    assert meta["document_id"] == doc_id
    assert meta["filename"] == "metadata_test.pdf"
    assert meta["page_count"] == 2
    assert meta["chunk_count"] >= 2


def test_upload_and_ask_residential_rental_agreement(client):
    """Test uploading the generated Residential_Rental_Agreement.pdf file and performing grounded Q&A."""
    import os
    sample_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "sample_documents", "Residential_Rental_Agreement.pdf")
    if not os.path.exists(sample_path):
        pytest.skip("Residential_Rental_Agreement.pdf not found in sample_documents")

    with open(sample_path, "rb") as f:
        response = client.post(
            "/api/documents/upload",
            files={"file": ("Residential_Rental_Agreement.pdf", f, "application/pdf")}
        )

    assert response.status_code == 201
    doc_info = response.json()
    assert doc_info["filename"] == "Residential_Rental_Agreement.pdf"
    assert doc_info["page_count"] == 4
    assert doc_info["chunk_count"] >= 4
    doc_id = doc_info["document_id"]

    # Ask about early termination notice
    ask_res = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "How many days notice is required to terminate the agreement?"}
    )
    assert ask_res.status_code == 200
    ask_data = ask_res.json()
    assert len(ask_data["sources"]) > 0
    # Termination is Section 7 on Page 3
    retrieved_pages = [s["page"] for s in ask_data["sources"]]
    assert 3 in retrieved_pages


def test_gemini_success(client, sample_pdf_bytes, monkeypatch):
    """Test Gemini successful response path using mock interaction."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_success.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    # Mock interactions.create to simulate Gemini returning an answer
    class MockInteractionResponse:
        output_text = "According to Section 2 [Page 1], the monthly rent is $2,850."

    def mock_create(*args, **kwargs):
        return MockInteractionResponse()

    monkeypatch.setattr("google.genai.Client.__init__", lambda self, *args, **kwargs: None)
    monkeypatch.setattr("google.genai.Client.interactions", property(lambda self: type("MockInteractions", (), {"create": staticmethod(mock_create)})()))

    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "What is the monthly rent?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["fallback_used"] is False
    assert "$2,850" in data["answer"]
    assert len(data["sources"]) > 0


def test_gemini_429_rate_limit_handled_gracefully(client, sample_pdf_bytes, monkeypatch):
    """Test that HTTP 429 RESOURCE_EXHAUSTED is caught gracefully without exposing raw exception."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_429.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    def mock_rate_limit(*args, **kwargs):
        raise Exception("429 RESOURCE_EXHAUSTED: Quota exceeded for quota metric 'GenerateContent'")

    monkeypatch.setattr("google.genai.Client.__init__", lambda self, *args, **kwargs: None)
    monkeypatch.setattr("google.genai.Client.interactions", property(lambda self: type("MockInteractions", (), {"create": staticmethod(mock_rate_limit)})()))
    monkeypatch.setattr("google.genai.Client.models", property(lambda self: type("MockModels", (), {"generate_content": staticmethod(mock_rate_limit)})()))

    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "What is the monthly rent?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "rate_limited"
    assert data["fallback_used"] is True
    # Ensure raw trace / error message is not exposed as the answer
    assert "RESOURCE_EXHAUSTED" not in data["answer"]
    assert "Traceback" not in data["answer"]
    assert len(data["sources"]) > 0


def test_rate_limit_information_present_in_context(client, sample_pdf_bytes, monkeypatch):
    """When Gemini is rate limited, information present in the document is quoted accurately without guessing."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_present.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    def mock_rate_limit(*args, **kwargs):
        raise Exception("429 Too Many Requests: Rate limit reached")

    monkeypatch.setattr("google.genai.Client.__init__", lambda self, *args, **kwargs: None)
    monkeypatch.setattr("google.genai.Client.interactions", property(lambda self: type("MockInteractions", (), {"create": staticmethod(mock_rate_limit)})()))
    monkeypatch.setattr("google.genai.Client.models", property(lambda self: type("MockModels", (), {"generate_content": staticmethod(mock_rate_limit)})()))

    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "What is the monthly rent?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "rate_limited"
    # Verifies exact stated text from Page 1 is quoted
    assert "2,850" in data["answer"]
    assert "Page 1" in data["answer"]
    assert "will not infer or extrapolate beyond this stated text" in data["answer"]


def test_rate_limit_information_absent_from_context(client, sample_pdf_bytes, monkeypatch):
    """When Gemini is rate limited, query asking about unmentioned terms explicitly refuses to infer."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_absent.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    def mock_rate_limit(*args, **kwargs):
        raise Exception("429 RESOURCE_EXHAUSTED: Rate limit exceeded")

    monkeypatch.setattr("google.genai.Client.__init__", lambda self, *args, **kwargs: None)
    monkeypatch.setattr("google.genai.Client.interactions", property(lambda self: type("MockInteractions", (), {"create": staticmethod(mock_rate_limit)})()))
    monkeypatch.setattr("google.genai.Client.models", property(lambda self: type("MockModels", (), {"generate_content": staticmethod(mock_rate_limit)})()))

    # Ask about late electricity bills (the document only discusses late rent)
    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "What is the penalty for late payment of electricity bills?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "rate_limited"
    assert data["fallback_used"] is True
    answer = data["answer"]
    # Verify exact grounding requirements:
    assert "does not provide enough information" in answer.lower()
    assert "late rent" in answer.lower() or "rent" in answer.lower()
    assert "electricity bills" in answer.lower()
    assert "will not infer or invent a penalty" in answer.lower()


def test_rate_limit_no_hallucinated_answer_for_tiger_pet(client, sample_pdf_bytes, monkeypatch):
    """Verifies that completely unmentioned topics are never hallucinated."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_tiger.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    def mock_rate_limit(*args, **kwargs):
        raise Exception("429 RESOURCE_EXHAUSTED: quota reached")

    monkeypatch.setattr("google.genai.Client.__init__", lambda self, *args, **kwargs: None)
    monkeypatch.setattr("google.genai.Client.interactions", property(lambda self: type("MockInteractions", (), {"create": staticmethod(mock_rate_limit)})()))
    monkeypatch.setattr("google.genai.Client.models", property(lambda self: type("MockModels", (), {"generate_content": staticmethod(mock_rate_limit)})()))

    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "Can I keep a tiger as a pet in the apartment?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "tiger" in data["answer"].lower()
    assert "will not infer or invent" in data["answer"].lower() or "does not contain information" in data["answer"].lower()


def test_sources_still_returned_on_rate_limit(client, sample_pdf_bytes, monkeypatch):
    """Sources, page numbers, and relevance scores are preserved even during rate limits."""
    file_obj = io.BytesIO(sample_pdf_bytes)
    upload_res = client.post(
        "/api/documents/upload",
        files={"file": ("lease_sources.pdf", file_obj, "application/pdf")}
    )
    doc_id = upload_res.json()["document_id"]

    def mock_rate_limit(*args, **kwargs):
        raise Exception("429 RESOURCE_EXHAUSTED")

    monkeypatch.setattr("google.genai.Client.__init__", lambda self, *args, **kwargs: None)
    monkeypatch.setattr("google.genai.Client.interactions", property(lambda self: type("MockInteractions", (), {"create": staticmethod(mock_rate_limit)})()))
    monkeypatch.setattr("google.genai.Client.models", property(lambda self: type("MockModels", (), {"generate_content": staticmethod(mock_rate_limit)})()))

    response = client.post(
        f"/api/documents/{doc_id}/ask",
        json={"question": "When is the security deposit returned?"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "rate_limited"
    assert len(data["sources"]) > 0
    # Confirm fields on sources
    for src in data["sources"]:
        assert "page" in src
        assert isinstance(src["page"], int)
        assert "snippet" in src
        assert len(src["snippet"]) > 0
        assert "relevance_score" in src
        assert 0.0 <= src["relevance_score"] <= 1.0


