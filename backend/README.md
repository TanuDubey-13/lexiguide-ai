# LexiGuide AI - Backend Service

FastAPI backend for **LexiGuide AI**, providing PDF/TXT legal document text extraction, page-preserved retrieval, and Google Gemini-powered grounded legal document Q&A with source citations.

---

## Features

- **Multi-page PDF & TXT Extraction:** Extracts clean text page-by-page using PyMuPDF (`fitz`), keeping original page metadata intact.
- **Scanned PDF Detection:** Accurately detects scanned image-only or empty PDFs that lack machine-readable text and returns a descriptive `422 Unprocessable Content` response.
- **In-Memory Document Store & Relevance Retrieval:** Chunks documents into coherent clauses while preserving page citations and scoring relevance using token overlap and phrase matching.
- **Grounded Q&A with Google Gemini:** Employs the official `google-genai` Python SDK with strict grounding instructions to prevent hallucination, cite specific page numbers, and append required legal disclaimers.
- **Safe Key Management:** Server-side `GEMINI_API_KEY` handling. When no key is set, the service provides an informative demo preview without failing or crashing.
- **CORS Configured:** Pre-configured for both local Vite development (`http://localhost:5173`) and the deployed GitHub Pages frontend (`https://tanudubey-13.github.io`).
- **Interactive Documentation:** Automatic Swagger UI (`/docs`) and ReDoc (`/redoc`).

---

## Directory Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                     # FastAPI application & CORS
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py              # Pydantic request/response schemas
│   ├── routes/
│   │   ├── __init__.py
│   │   └── documents.py            # Upload, inspect, and ask endpoints
│   └── services/
│       ├── __init__.py
│       ├── gemini_service.py       # Google GenAI SDK integration & grounding prompt
│       ├── pdf_service.py          # PyMuPDF text extraction & scanned detection
│       └── retrieval_service.py    # In-memory document chunking & search
├── tests/
│   ├── __init__.py
│   └── test_backend.py             # Integration test suite (pytest)
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

## Setup & Running Locally (Windows PowerShell)

### 1. Prerequisites
- Python 3.11 or newer (Python 3.13 tested)

### 2. Set Up Virtual Environment

From the root project directory:
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
```

*(If script execution is restricted, run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` first).*

### 3. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Copy the example file to `.env`:
```powershell
Copy-Item .env.example .env
```

Open `backend/.env` and insert your Google AI Studio API key:
```env
GEMINI_API_KEY=AIzaSy...your_real_key_here
GEMINI_MODEL=gemini-3.6-flash
```

> **Security Note:** `backend/.env` is included in `.gitignore` and must never be committed to source control.

### 5. Start the Server
```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at:
- **Root / Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Alternative ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **Health Check:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

## Running Automated Tests

Run the full pytest suite:
```powershell
# From the backend/ directory:
pytest tests/
```

Or using the virtualenv python directly:
```powershell
.venv\Scripts\python.exe -m pytest tests/ -v
```

---

## API Endpoints

### 1. Health Check
- **`GET /health`**
- Response:
  ```json
  {
    "status": "ok",
    "app": "LexiGuide AI Backend",
    "version": "1.0.0"
  }
  ```

### 2. Upload Document
- **`POST /api/documents/upload`**
- `multipart/form-data` with field `file` (`.pdf` or `.txt`)
- Response:
  ```json
  {
    "document_id": "8f8b030b-0447-49f3-8ea8-37bb805eb393",
    "filename": "lease_agreement.pdf",
    "file_type": "pdf",
    "page_count": 4,
    "chunk_count": 9,
    "preview": "STANDARD LEASE AGREEMENT...",
    "uploaded_at": "2026-09-20T06:20:00.000Z"
  }
  ```

### 3. Grounded Document Q&A
- **`POST /api/documents/{document_id}/ask`**
- Body:
  ```json
  {
    "question": "What happens if rent is late?"
  }
  ```
- Response:
  ```json
  {
    "document_id": "8f8b030b-0447-49f3-8ea8-37bb805eb393",
    "question": "What happens if rent is late?",
    "answer": "According to Section 3 [Page 1], if rent is not received by the 5th of the month, a late fee of $150 will be assessed...",
    "sources": [
      {
        "page": 1,
        "snippet": "Section 3. LATE CHARGES: If rent is not received by 11:59 PM on the 5th...",
        "relevance_score": 0.88
      }
    ],
    "disclaimer": "LexiGuide AI provides document understanding assistance and informational summaries, not formal legal advice. Consult a qualified attorney for legal counsel."
  }
  ```

### 4. Document Metadata
- **`GET /api/documents/{document_id}`**
- Returns page count, chunk count, and upload timestamp.
