"""In-memory document storage and keyword/relevance retrieval service."""
import math
import re
import uuid
from typing import Any, Dict, List, Optional, Set, Tuple
from dataclasses import dataclass, field
from datetime import datetime, timezone


STOP_WORDS: Set[str] = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
    "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
    "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
    "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down",
    "during", "each", "few", "for", "from", "further", "had", "hadn't", "has",
    "hasn't", "have", "haven't", "having", "he", "her", "here", "hers", "herself",
    "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn't", "it",
    "its", "itself", "let's", "me", "more", "most", "my", "myself", "no", "nor",
    "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
    "ourselves", "out", "over", "own", "same", "she", "should", "shouldn't", "so",
    "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves",
    "then", "there", "these", "they", "this", "those", "through", "to", "too",
    "under", "until", "up", "very", "was", "wasn't", "we", "were", "weren't",
    "what", "when", "where", "which", "while", "who", "whom", "why", "with",
    "won't", "would", "wouldn't", "you", "your", "yours", "yourself", "yourselves"
}


def tokenize(text: str) -> List[str]:
    """Tokenize text into lowercase alphanumeric words."""
    return re.findall(r"\b[a-zA-Z0-9_]{2,}\b", text.lower())


@dataclass
class DocumentChunk:
    """Represents an extracted, page-attributed chunk of text."""
    chunk_id: str
    page: int
    text: str
    token_counts: Dict[str, int] = field(default_factory=dict)

    def __post_init__(self):
        if not self.token_counts:
            tokens = tokenize(self.text)
            counts: Dict[str, int] = {}
            for t in tokens:
                counts[t] = counts.get(t, 0) + 1
            self.token_counts = counts


@dataclass
class StoredDocument:
    """Represents a processed document stored in-memory."""
    document_id: str
    filename: str
    file_type: str
    page_count: int
    chunks: List[DocumentChunk]
    preview: str
    uploaded_at: str


class DocumentStore:
    """In-memory document repository with semantic/lexical chunk retrieval."""

    def __init__(self):
        self._documents: Dict[str, StoredDocument] = {}

    def chunk_document(self, pages_data: List[Dict[str, Any]], target_chunk_chars: int = 600) -> List[DocumentChunk]:
        """
        Segment page-extracted text into coherent logical chunks.
        Preserves original page metadata with each chunk.
        """
        chunks: List[DocumentChunk] = []

        for page_info in pages_data:
            page_num = page_info["page"]
            page_text = page_info["text"]

            # Split page text by double newlines or single newlines
            raw_paragraphs = [p.strip() for p in re.split(r"\n\s*\n", page_text) if p.strip()]
            if not raw_paragraphs:
                # If no double-newline paragraphs, split by single newlines
                raw_paragraphs = [p.strip() for p in page_text.splitlines() if p.strip()]

            if not raw_paragraphs:
                continue

            current_chunk_parts: List[str] = []
            current_len = 0

            for para in raw_paragraphs:
                para_len = len(para)

                # If paragraph itself is very long, split into windowed segments
                if para_len > target_chunk_chars * 1.5:
                    # Flush any pending small paragraphs
                    if current_chunk_parts:
                        chunk_text = " ".join(current_chunk_parts)
                        chunks.append(DocumentChunk(
                            chunk_id=str(uuid.uuid4()),
                            page=page_num,
                            text=chunk_text
                        ))
                        current_chunk_parts = []
                        current_len = 0

                    # Sub-chunk the long paragraph
                    start = 0
                    step = target_chunk_chars - 100  # 100 chars overlap
                    while start < para_len:
                        sub_text = para[start:start + target_chunk_chars].strip()
                        if sub_text:
                            chunks.append(DocumentChunk(
                                chunk_id=str(uuid.uuid4()),
                                page=page_num,
                                text=sub_text
                            ))
                        start += step
                    continue

                if current_len + para_len > target_chunk_chars and current_chunk_parts:
                    chunk_text = " ".join(current_chunk_parts)
                    chunks.append(DocumentChunk(
                        chunk_id=str(uuid.uuid4()),
                        page=page_num,
                        text=chunk_text
                    ))
                    current_chunk_parts = [para]
                    current_len = para_len
                else:
                    current_chunk_parts.append(para)
                    current_len += para_len + 1

            if current_chunk_parts:
                chunk_text = " ".join(current_chunk_parts)
                chunks.append(DocumentChunk(
                    chunk_id=str(uuid.uuid4()),
                    page=page_num,
                    text=chunk_text
                ))

        return chunks

    def store_document(
        self,
        filename: str,
        file_type: str,
        pages_data: List[Dict[str, Any]],
        document_id: Optional[str] = None
    ) -> StoredDocument:
        """Process, chunk, and index a document in memory."""
        doc_id = document_id or str(uuid.uuid4())
        chunks = self.chunk_document(pages_data)

        # Generate a clean text preview
        preview_src = pages_data[0]["text"] if pages_data else ""
        preview = (preview_src[:250] + "...") if len(preview_src) > 250 else preview_src

        doc = StoredDocument(
            document_id=doc_id,
            filename=filename,
            file_type=file_type,
            page_count=len(pages_data),
            chunks=chunks,
            preview=preview,
            uploaded_at=datetime.now(timezone.utc).isoformat()
        )
        self._documents[doc_id] = doc
        return doc

    def get_document(self, document_id: str) -> Optional[StoredDocument]:
        """Retrieve a stored document by ID."""
        return self._documents.get(document_id)

    def retrieve_relevant_chunks(
        self,
        document_id: str,
        query: str,
        top_k: int = 3
    ) -> List[Tuple[DocumentChunk, float]]:
        """
        Retrieve the most relevant document chunks for a query.
        Uses keyword overlap, TF term weighting, and phrase match bonus.
        Returns list of (DocumentChunk, relevance_score) sorted by relevance descending.
        """
        doc = self.get_document(document_id)
        if not doc or not doc.chunks:
            return []

        query_tokens = tokenize(query)
        # Filter out common stop words if meaningful words exist
        meaningful_tokens = [t for t in query_tokens if t not in STOP_WORDS]
        tokens_to_match = meaningful_tokens if meaningful_tokens else query_tokens

        if not tokens_to_match:
            # Fallback: return first chunk(s) if query is symbols or empty
            return [(chunk, 0.5) for chunk in doc.chunks[:top_k]]

        query_lower = query.lower().strip()
        scored_chunks: List[Tuple[DocumentChunk, float]] = []

        total_doc_chunks = len(doc.chunks)

        for chunk in doc.chunks:
            chunk_tokens_count = chunk.token_counts
            chunk_text_lower = chunk.text.lower()

            raw_score = 0.0
            matched_unique_tokens = 0

            for q_token in set(tokens_to_match):
                if q_token in chunk_tokens_count:
                    matched_unique_tokens += 1
                    # Term frequency score with sub-linear saturation
                    tf = 1.0 + math.log(chunk_tokens_count[q_token])
                    raw_score += tf
                elif len(q_token) >= 4:
                    # Root prefix matching (e.g. electric -> electrical, utilit -> utility, bill -> bills)
                    if q_token.startswith("electric"):
                        q_prefix = "electric"
                    elif q_token.startswith("utilit"):
                        q_prefix = "utilit"
                    elif q_token.startswith("terminat"):
                        q_prefix = "terminat"
                    elif q_token.startswith("deposit"):
                        q_prefix = "deposit"
                    else:
                        q_prefix = q_token[:min(len(q_token), 5)]

                    matching_counts = [
                        count for c_tok, count in chunk_tokens_count.items()
                        if c_tok.startswith(q_prefix) and not (q_prefix == "electric" and c_tok.startswith("electron"))
                    ]
                    if matching_counts:
                        matched_unique_tokens += 1
                        tf = 1.0 + math.log(sum(matching_counts))
                        raw_score += tf

            # Coverage boost: reward chunks that match more of the query terms
            coverage_ratio = matched_unique_tokens / len(set(tokens_to_match))
            raw_score *= (0.5 + 0.5 * coverage_ratio)

            # Exact sub-string or phrase bonus
            if len(query_lower) > 4 and query_lower in chunk_text_lower:
                raw_score += 3.0

            # Normalized relevance score between 0.1 and 0.98
            if raw_score > 0:
                # Normalization formula
                normalized_score = min(0.98, max(0.20, 0.35 + (raw_score / (raw_score + 4.0)) * 0.63))
                scored_chunks.append((chunk, round(normalized_score, 2)))

        # Sort descending by score
        scored_chunks.sort(key=lambda x: x[1], reverse=True)

        if scored_chunks:
            return scored_chunks[:top_k]

        # If no keywords matched, return empty list (no relevant chunks found)
        return []


# Global singleton instance
document_store = DocumentStore()
