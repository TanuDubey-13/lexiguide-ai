"""Gemini LLM grounded Q&A service with graceful rate-limit handling and document-only fallback."""
import os
import re
from dataclasses import dataclass
from typing import List, Optional, Tuple
from dotenv import load_dotenv
from .retrieval_service import DocumentChunk, STOP_WORDS, tokenize

# Load environment variables from backend/.env if present
_env_locations = [
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "backend", ".env"),
    os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), ".env"),
]
for _loc in _env_locations:
    if os.path.exists(_loc):
        load_dotenv(dotenv_path=_loc, override=False)
load_dotenv()


SYSTEM_INSTRUCTION = """You are LexiGuide AI, an intelligent, objective legal document assistant.
Your role is to help users understand legal documents, contracts, agreements, and policies accurately and safely.

STRICT GROUNDING RULES:
1. Answer ONLY using the provided document excerpts. Do NOT fabricate, assume, or hallucinate terms, dates, penalties, obligations, or clauses not present in the excerpts.
2. If the provided excerpts do not contain the answer, explicitly state: "The provided document does not contain information regarding [topic]."
3. Explicitly cite the page number(s) in your answer (e.g., "[Page 1]", "[Page 3]") whenever referencing specific terms or requirements.
4. Structure your response clearly using short paragraphs and bullet points for ease of reading.
5. Highlight important obligations, deadlines, costs, or restrictions if present in the text.
6. Maintain a neutral, professional, and accessible tone. You provide educational document comprehension assistance, not legal counsel or formal legal representation."""


@dataclass
class GroundedAnswerResult:
    """Represents a generated answer along with generation status metadata."""
    answer: str
    status: str = "success"  # "success" | "rate_limited" | "demo_mode" | "error"
    fallback_used: bool = False
    message: Optional[str] = None

    def __str__(self) -> str:
        return self.answer


def is_rate_limit_error(e: Exception) -> bool:
    """Detect HTTP 429 / RESOURCE_EXHAUSTED / quota exceeded errors from Google GenAI."""
    msg = str(e).lower()
    code = getattr(e, "code", None)
    if code == 429:
        return True
    return any(term in msg for term in [
        "429",
        "resource_exhausted",
        "rate limit",
        "quota exceeded",
        "too many requests",
        "quota",
    ])


def split_into_sentences(text: str) -> List[str]:
    """Split text into sentences while protecting abbreviations like Rs. or Sec."""
    protected = re.sub(r'\bRs\.\s*', 'Rs_DOT_', text)
    protected = re.sub(r'\bSec\.\s*', 'Sec_DOT_', protected)
    protected = re.sub(r'\bNo\.\s*', 'No_DOT_', protected)
    protected = re.sub(r'\bLLC\.\s*', 'LLC_DOT_', protected)
    protected = re.sub(r'\bi\.e\.\s*', 'ie_DOT_', protected)
    protected = re.sub(r'\be\.g\.\s*', 'eg_DOT_', protected)

    raw_sents = [s.strip() for s in re.split(r'(?<=[.!?])\s+', protected) if s.strip()]
    cleaned = []
    for s in raw_sents:
        restored = (
            s.replace('Rs_DOT_', 'Rs. ')
            .replace('Sec_DOT_', 'Sec. ')
            .replace('No_DOT_', 'No. ')
            .replace('LLC_DOT_', 'LLC. ')
            .replace('ie_DOT_', 'i.e. ')
            .replace('eg_DOT_', 'e.g. ')
        )
        if restored:
            cleaned.append(restored)
    return cleaned if cleaned else [text.strip()]


def summarize_sentence_topic(sent: str) -> str:
    """Extract or summarize the primary topic covered by a sentence."""
    sent_lower = sent.lower()
    if 'rent' in sent_lower and ('late' in sent_lower or 'unpaid' in sent_lower or 'fee' in sent_lower or 'accrue' in sent_lower):
        return 'late rent payments'
    elif 'rent' in sent_lower:
        return 'monthly rent obligations'
    elif 'security deposit' in sent_lower or 'deposit' in sent_lower:
        return 'security deposit provisions'
    elif 'repair' in sent_lower or 'maintenance' in sent_lower:
        return 'maintenance and repair duties'
    elif 'terminat' in sent_lower or 'notice' in sent_lower:
        return 'termination and notice requirements'
    elif 'sublet' in sent_lower or 'assign' in sent_lower:
        return 'subletting restrictions'
    elif 'alteration' in sent_lower or 'paint' in sent_lower:
        return 'alteration restrictions'
    elif 'utilit' in sent_lower or 'electr' in sent_lower:
        return 'utility clearance and maintenance provisions'
    else:
        words = [w for w in tokenize(sent) if w not in STOP_WORDS and len(w) > 3]
        return ' '.join(words[:3]) if words else 'other lease obligations'


def build_document_only_fallback(
    question: str,
    retrieved_chunks: List[Tuple[DocumentChunk, float]],
    filename: str = "Document"
) -> str:
    """
    Construct a safe, grounded document-only response strictly from retrieved excerpts.
    Used when Gemini is unavailable or rate-limited.
    Does NOT infer or hallucinate missing provisions.
    """
    if not retrieved_chunks:
        return (
            f"The uploaded document {filename} does not contain information regarding your question. "
            "LexiGuide will not guess when the answer is not supported by the document."
        )

    q_tokens = [t for t in tokenize(question) if t not in STOP_WORDS]
    if not q_tokens:
        return "Please ask a specific question about the document."

    all_chunk_text = " ".join(c.text for c, _ in retrieved_chunks)
    c_tokens = set(tokenize(all_chunk_text))

    # Identify matched tokens (with prefix root matching for plurals/conjugations)
    matched_tokens = []
    missing_tokens = []
    for q_t in q_tokens:
        if q_t in c_tokens or any(c_t.startswith(q_t[:4]) for c_t in c_tokens if len(q_t) >= 4):
            matched_tokens.append(q_t)
        else:
            missing_tokens.append(q_t)

    # Clean core question topic
    q_core = re.sub(
        r'^(what is the|what are the|is there a|when is the|how does the|who is responsible for the|what happens if|can i|can the|could the)\s+',
        '',
        question.rstrip('?').strip(),
        flags=re.IGNORECASE
    )

    sentences = split_into_sentences(all_chunk_text)
    best_sent = ""
    best_sent_matches = 0

    for c, _ in retrieved_chunks:
        for s in split_into_sentences(c.text):
            s_toks = set(tokenize(s))
            m = len(set(matched_tokens) & s_toks)
            if m > best_sent_matches:
                best_sent_matches = m
                best_sent = s

    missing_ratio = len(missing_tokens) / len(q_tokens) if q_tokens else 1.0
    QUESTION_AUXILIARY_WORDS = {
        'penalty', 'rule', 'provision', 'fee', 'charge', 'amount', 'date', 'consequence', 'policy',
        'happens', 'happen', 'occur', 'applies', 'apply', 'say', 'says', 'mean', 'means', 'stipulate',
        'require', 'requirement', 'requirements', 'condition', 'conditions', 'term', 'terms', 'early',
    }
    subject_missing = [
        t for t in missing_tokens
        if t not in QUESTION_AUXILIARY_WORDS
    ]

    # If critical subject terms are absent in the retrieved excerpts
    if subject_missing and (
        missing_ratio >= 0.35 or any(
            t in subject_missing
            for t in ['electricity', 'utility', 'bills', 'water', 'gas', 'tiger', 'pet', 'stock', 'parking', 'bonus']
        )
    ):
        missing_str = " ".join(subject_missing)
        retrieved_topic = summarize_sentence_topic(best_sent) if best_sent else "other contractual provisions"
        term_word = "penalty" if ("penalty" in q_tokens or "fee" in q_tokens) else "specific rule or consequence"

        return (
            f"The uploaded document does not provide enough information to determine the {q_core}. "
            f"The retrieved section discusses {retrieved_topic}, but it does not establish that the same consequence applies to {missing_str}. "
            f"LexiGuide will not infer or invent a {term_word}."
        )

    # If query terms ARE substantially present in the retrieved text
    pages = sorted(list(set(c.page for c, _ in retrieved_chunks)))
    pages_str = ", ".join(f"Page {p}" for p in pages)

    scored_sentences = []
    for s in sentences:
        s_toks = set(tokenize(s))
        matches = len(set(matched_tokens) & s_toks)
        if matches > 0:
            # Bonus if sentence directly addresses key section
            bonus = 0
            if 'terminate' in q_tokens and ('termination' in s.lower() or 'lock-in' in s.lower() or 'notice' in s.lower()):
                bonus += 2
            if 'deposit' in q_tokens and ('security deposit' in s.lower() or 'refundable' in s.lower()):
                bonus += 2
            scored_sentences.append((matches + bonus, s))

    scored_sentences.sort(key=lambda x: x[0], reverse=True)
    relevant_sentences = [s for _, s in scored_sentences]

    if not relevant_sentences and best_sent:
        relevant_sentences = [best_sent]

    quote_block = " ".join(relevant_sentences[:2])
    return (
        f"Based strictly on the retrieved document text ({pages_str}):\n\n"
        f"\"{quote_block}\"\n\n"
        f"The document explicitly provides the provisions above regarding your inquiry. "
        f"LexiGuide will not infer or extrapolate beyond this stated text."
    )


class GeminiService:
    """Service wrapper for Google Gemini API grounded generation via official google-genai SDK."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "").strip()
        raw_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash").strip()
        if not raw_model or "gemini-2.5-flash" in raw_model:
            raw_model = "gemini-3.6-flash"
        self.model_name = raw_model

    def is_configured(self) -> bool:
        """Check if a valid, non-placeholder Gemini API key is configured."""
        return bool(self.api_key and self.api_key != "your_api_key_here")

    def generate_grounded_answer(
        self,
        question: str,
        retrieved_chunks: List[Tuple[DocumentChunk, float]],
        filename: str = "Document"
    ) -> GroundedAnswerResult:
        """
        Generate a strictly grounded answer to the user's question.
        Gracefully handles HTTP 429 / rate limits by providing a document-only fallback.
        """
        # Format retrieved context
        if not retrieved_chunks:
            return GroundedAnswerResult(
                answer=(
                    f"No relevant excerpts could be retrieved from {filename} to answer your question. "
                    "Please verify that the uploaded document contains information on this topic or try rephrasing your question."
                ),
                status="success",
                fallback_used=False
            )

        context_blocks = []
        for chunk, score in retrieved_chunks:
            context_blocks.append(
                f"--- [EXCERPT FROM PAGE {chunk.page}] (Relevance: {score:.2f}) ---\n{chunk.text}"
            )
        formatted_context = "\n\n".join(context_blocks)

        prompt = f"""DOCUMENT: {filename}

DOCUMENT EXCERPTS:
{formatted_context}

USER QUESTION:
{question}

Please provide a clear, grounded explanation answering the question based strictly on the excerpts above. Include page citations."""

        # If API key is not configured, return informative demo preview
        if not self.is_configured():
            top_pages = sorted(list({c.page for c, _ in retrieved_chunks}))
            pages_str = ", ".join(f"Page {p}" for p in top_pages)
            return GroundedAnswerResult(
                answer=(
                    f"[DEMO MODE - GEMINI_API_KEY not configured in backend/.env]\n\n"
                    f"LexiGuide AI retrieved {len(retrieved_chunks)} relevant excerpt(s) from {filename} ({pages_str}) matching your query: \"{question}\".\n\n"
                    f"Most relevant passage preview:\n\"{retrieved_chunks[0][0].text[:300]}...\"\n\n"
                    f"To enable live Gemini {self.model_name} synthesis, configure a valid GEMINI_API_KEY in backend/.env."
                ),
                status="demo_mode",
                fallback_used=False
            )

        # Call Gemini via official google-genai SDK
        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=self.api_key)

            # Preferred: Use Google's recommended Interactions API
            if hasattr(client, "interactions") and hasattr(client.interactions, "create"):
                response = client.interactions.create(
                    model=self.model_name,
                    input=prompt,
                    system_instruction=SYSTEM_INSTRUCTION
                )

                if hasattr(response, "output_text") and response.output_text:
                    return GroundedAnswerResult(
                        answer=response.output_text.strip(),
                        status="success",
                        fallback_used=False
                    )
                elif hasattr(response, "text") and response.text:
                    return GroundedAnswerResult(
                        answer=response.text.strip(),
                        status="success",
                        fallback_used=False
                    )

            # Fallback to models.generate_content if interactions is unavailable
            response = client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_INSTRUCTION,
                    temperature=0.2,
                )
            )

            if response and response.text:
                return GroundedAnswerResult(
                    answer=response.text.strip(),
                    status="success",
                    fallback_used=False
                )

            return GroundedAnswerResult(
                answer="Unable to generate an answer from the provided document excerpts.",
                status="error",
                fallback_used=False
            )

        except Exception as e:
            # Handle rate-limit / HTTP 429 errors gracefully without exposing raw traces
            if is_rate_limit_error(e):
                fallback_answer = build_document_only_fallback(
                    question=question,
                    retrieved_chunks=retrieved_chunks,
                    filename=filename
                )
                return GroundedAnswerResult(
                    answer=fallback_answer,
                    status="rate_limited",
                    fallback_used=True,
                    message="Gemini Free Tier daily rate limit reached (HTTP 429). Document-only grounded answer provided."
                )

            error_msg = str(e)
            if "API_KEY_INVALID" in error_msg or "invalid api key" in error_msg.lower():
                return GroundedAnswerResult(
                    answer=(
                        "Error: The provided Gemini API key appears to be invalid. "
                        "Please check your GEMINI_API_KEY in backend/.env."
                    ),
                    status="error",
                    fallback_used=False
                )

            # Generic sanitized error response
            return GroundedAnswerResult(
                answer=f"An error occurred while communicating with Gemini AI: {error_msg}",
                status="error",
                fallback_used=False
            )


# Singleton instance
gemini_service = GeminiService()
