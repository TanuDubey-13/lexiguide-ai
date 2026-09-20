"""Pydantic schemas for request and response payloads."""
from datetime import datetime, timezone
from typing import List, Optional
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "ok"
    app: str = "LexiGuide AI Backend"
    version: str = "1.0.0"


class SourceReference(BaseModel):
    """Source reference citation from the document."""
    page: int = Field(..., description="1-indexed page number in the original document")
    snippet: str = Field(..., description="Extract snippet supporting the answer")
    relevance_score: float = Field(..., description="Calculated relevance/similarity score between 0.0 and 1.0")


class DocumentUploadResponse(BaseModel):
    """Response returned upon successful document upload and chunking."""
    document_id: str = Field(..., description="Unique document UUID")
    filename: str = Field(..., description="Original filename uploaded")
    file_type: str = Field(..., description="File format extension (pdf or txt)")
    page_count: int = Field(..., description="Total number of pages processed")
    chunk_count: int = Field(..., description="Number of indexed text chunks")
    preview: str = Field(..., description="Text preview snippet of the first page")
    uploaded_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(),
        description="ISO 8601 timestamp of upload"
    )


class AskQuestionRequest(BaseModel):
    """Request payload to ask a grounded question about an uploaded document."""
    question: str = Field(..., min_length=1, max_length=2000, description="The user's query about the document")


class AskQuestionResponse(BaseModel):
    """Grounded Q&A response with document citations and legal disclaimer."""
    document_id: str
    question: str
    answer: str
    sources: List[SourceReference] = Field(default_factory=list)
    disclaimer: str = (
        "LexiGuide AI provides document understanding assistance and informational summaries, "
        "not formal legal advice. Consult a qualified attorney for legal counsel."
    )
    status: str = Field(default="success", description="Status of generation: success, rate_limited, or fallback")
    fallback_used: bool = Field(default=False, description="True if document-only fallback was used due to rate limits")


class ErrorResponse(BaseModel):
    """Standardized error response model."""
    detail: str
