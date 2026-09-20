"""Document upload, indexing, and grounded question answering routes."""
import os
from fastapi import APIRouter, File, HTTPException, UploadFile, status

from ..models.schemas import (
    AskQuestionRequest,
    AskQuestionResponse,
    DocumentUploadResponse,
    SourceReference,
)
from ..services.gemini_service import gemini_service
from ..services.pdf_service import (
    DocumentExtractionError,
    ScannedOrEmptyPDFError,
    extract_text_from_pdf,
    extract_text_from_txt,
)
from ..services.retrieval_service import document_store

router = APIRouter(prefix="/api/documents", tags=["documents"])

ALLOWED_EXTENSIONS = {".pdf", ".txt"}
MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024  # 25 MB


@router.post(
    "/upload",
    response_model=DocumentUploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload and process a PDF or TXT legal document",
    description="Extracts page-preserved text, segments into logical chunks, and indexes in-memory."
)
async def upload_document(file: UploadFile = File(...)):
    filename = file.filename or "unnamed_document"
    ext = os.path.splitext(filename)[1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. LexiGuide AI currently supports .pdf and .txt files."
        )

    try:
        file_bytes = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to read uploaded file: {str(e)}"
        )

    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty (0 bytes)."
        )

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds the 25 MB size limit ({len(file_bytes) / (1024 * 1024):.1f} MB)."
        )

    # Extract text by file type
    try:
        if ext == ".pdf":
            pages_data = extract_text_from_pdf(file_bytes)
        else:
            pages_data = extract_text_from_txt(file_bytes)
    except ScannedOrEmptyPDFError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail=str(e)
        )
    except DocumentExtractionError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error processing document: {str(e)}"
        )

    # Index in-memory
    clean_type = ext.lstrip(".")
    stored_doc = document_store.store_document(
        filename=filename,
        file_type=clean_type,
        pages_data=pages_data
    )

    return DocumentUploadResponse(
        document_id=stored_doc.document_id,
        filename=stored_doc.filename,
        file_type=stored_doc.file_type,
        page_count=stored_doc.page_count,
        chunk_count=len(stored_doc.chunks),
        preview=stored_doc.preview,
        uploaded_at=stored_doc.uploaded_at
    )


@router.post(
    "/{document_id}/ask",
    response_model=AskQuestionResponse,
    summary="Ask a grounded question about an uploaded document",
    description="Retrieves the most relevant chunks with page attribution and calls Gemini for grounded synthesis."
)
async def ask_question(document_id: str, request: AskQuestionRequest):
    # Validate document exists
    doc = document_store.get_document(document_id)
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document with ID '{document_id}' not found. Please upload the document first."
        )

    cleaned_query = request.question.strip()
    if not cleaned_query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question cannot be empty or whitespace only."
        )

    # Retrieve relevant chunks
    relevant_chunks = document_store.retrieve_relevant_chunks(
        document_id=document_id,
        query=cleaned_query,
        top_k=4
    )

    # Generate answer with Gemini (or document-only fallback if rate limited)
    result = gemini_service.generate_grounded_answer(
        question=cleaned_query,
        retrieved_chunks=relevant_chunks,
        filename=doc.filename
    )

    # Format citations - ALWAYS returned with original document pages and scores
    sources: list[SourceReference] = []
    for chunk, score in relevant_chunks:
        snippet_text = chunk.text
        if len(snippet_text) > 240:
            snippet_text = snippet_text[:240].rsplit(" ", 1)[0] + "..."

        sources.append(
            SourceReference(
                page=chunk.page,
                snippet=snippet_text,
                relevance_score=score
            )
        )

    return AskQuestionResponse(
        document_id=document_id,
        question=cleaned_query,
        answer=result.answer,
        sources=sources,
        status=result.status,
        fallback_used=result.fallback_used,
    )


@router.get(
    "/{document_id}",
    summary="Get metadata and chunk summary for an uploaded document"
)
async def get_document_info(document_id: str):
    doc = document_store.get_document(document_id)
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Document '{document_id}' not found."
        )

    return {
        "document_id": doc.document_id,
        "filename": doc.filename,
        "file_type": doc.file_type,
        "page_count": doc.page_count,
        "chunk_count": len(doc.chunks),
        "uploaded_at": doc.uploaded_at,
        "preview": doc.preview
    }
