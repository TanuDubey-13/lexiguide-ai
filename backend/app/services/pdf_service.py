"""PDF and plain text extraction service using PyMuPDF (fitz)."""
from typing import List, Dict, Any
import pymupdf as fitz  # PyMuPDF


class ScannedOrEmptyPDFError(Exception):
    """Raised when a PDF contains no extractable digital text (e.g., scanned image)."""
    pass


class DocumentExtractionError(Exception):
    """Raised when document extraction fails due to formatting or corrupted data."""
    pass


def extract_text_from_pdf(file_bytes: bytes) -> List[Dict[str, Any]]:
    """
    Extract text page-by-page from PDF bytes using PyMuPDF.

    Returns:
        List of dicts: [{"page": 1, "text": "Page text..."}, ...]

    Raises:
        ScannedOrEmptyPDFError: If the PDF contains no machine-readable text.
        DocumentExtractionError: If the PDF cannot be opened or parsed.
    """
    if not file_bytes:
        raise ScannedOrEmptyPDFError("Uploaded PDF file is empty.")

    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
    except Exception as e:
        raise DocumentExtractionError(f"Failed to open or parse PDF: {str(e)}") from e

    try:
        if len(doc) == 0:
            raise ScannedOrEmptyPDFError("The uploaded PDF has 0 pages.")

        pages_data: List[Dict[str, Any]] = []
        total_extracted_chars = 0

        for page_idx in range(len(doc)):
            page = doc[page_idx]
            # Extract plain text
            page_text = page.get_text("text").strip()
            pages_data.append({
                "page": page_idx + 1,
                "text": page_text
            })
            total_extracted_chars += len(page_text)

        # Scanned or image-only PDF check
        # If total characters across all pages is fewer than 15, the PDF is either blank or scanned images
        if total_extracted_chars < 15:
            raise ScannedOrEmptyPDFError(
                "The uploaded PDF contains no selectable digital text. "
                "It appears to be a scanned image or empty document. "
                "LexiGuide AI currently requires documents with embedded text layers or OCR pre-processing."
            )

        return pages_data
    finally:
        doc.close()


def extract_text_from_txt(file_bytes: bytes) -> List[Dict[str, Any]]:
    """
    Extract text from a plain text file.

    Returns:
        List with a single page entry: [{"page": 1, "text": "..."}]

    Raises:
        ScannedOrEmptyPDFError: If text is empty or whitespace only.
        DocumentExtractionError: If encoding cannot be decoded.
    """
    if not file_bytes:
        raise ScannedOrEmptyPDFError("Uploaded text file is empty.")

    decoded_text = ""
    for encoding in ("utf-8", "utf-8-sig", "latin-1", "cp1252"):
        try:
            decoded_text = file_bytes.decode(encoding).strip()
            break
        except UnicodeDecodeError:
            continue

    if not decoded_text:
        raise DocumentExtractionError("Could not decode text file with supported encodings (UTF-8, Latin-1).")

    if len(decoded_text) < 5:
        raise ScannedOrEmptyPDFError("The uploaded text document is too short or contains no meaningful text.")

    return [{"page": 1, "text": decoded_text}]
