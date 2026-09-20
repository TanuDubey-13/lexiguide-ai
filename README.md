# LexiGuide AI

> **"Legal documents, explained for you."**

LexiGuide AI is an AI-powered legal document understanding workspace built for the GenAI hackathon challenge:

**"AI for Legal Assistance & Access"**

It helps citizens, tenants, employees, and small business owners understand complex legal documents by translating dense legal language into plain-language explanations, identifying important clauses, comparing document versions, answering document-grounded questions, and preparing structured questions for discussion with a qualified legal professional.

> **LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional.**

---

## 🚀 Live Demo

- **Live Application:** [https://tanudubey-13.github.io/lexiguide-ai/](https://tanudubey-13.github.io/lexiguide-ai/)
- **Backend API:** [https://lexiguide-ai.onrender.com](https://lexiguide-ai.onrender.com)
- **Interactive API Documentation:** [https://lexiguide-ai.onrender.com/docs](https://lexiguide-ai.onrender.com/docs)

### User Journey

```text
UPLOAD → UNDERSTAND → IDENTIFY IMPORTANT CLAUSES → COMPARE → ASK QUESTIONS → GET ACTIONABLE OUTPUT → PREPARE FOR A LEGAL PROFESSIONAL
```

> **Note on Free-Tier Hosting:** The backend is hosted on a free Render web service instance. If the service has been inactive, the initial request (such as a health check or document upload) may take 30–60 seconds while the container spins up. Subsequent requests respond normally.

---

## ⚖️ Important Ethical Notice & Disclaimer

- **General Information Only:** LexiGuide AI provides general legal information, clause breakdowns, and document navigation assistance. It is not a law firm, lawyer, or legal representative, and does not provide formal legal advice.
- **Fictional Demo Document:** The built-in sample document (*Residential Rental Agreement*) available in the application is a fictional demo document created specifically for testing, exploration, and demonstration purposes.
- **Consultation with Professionals:** Real-world legal agreements carry binding obligations, financial risks, and local jurisdictional nuances. Any actual legal questions, disputed terms, or execution decisions should always be evaluated with a qualified legal professional.
- **Sensitive Documents:** Because this is an educational hackathon prototype with in-memory session processing, users should avoid uploading highly sensitive or confidential legal documents without understanding its current infrastructure boundaries.

---

## 🧩 The Problem

Legal agreements—such as residential leases, employment contracts, non-disclosure agreements, and service terms—are written in specialized, archaic language designed by and for legal practitioners. This creates severe legal information asymmetry for everyday individuals:

1. **Incomprehensible Legalese:** Non-lawyers regularly sign agreements without understanding critical forfeiture clauses, renewal traps, or indemnification obligations.
2. **Hidden Obligations & Financial Risks:** Subtle provisions—such as mandatory lock-in periods, liquidated damages, or strict 48-hour defect reporting windows—often lead to unexpected financial losses or forfeiture of rights.
3. **Difficult Version Comparison:** When a landlord or employer issues a revised agreement, detecting subtle modifications in liability, notice periods, or payment dates through manual review is time-consuming and prone to human error.
4. **Unprepared Legal Consultations:** When individuals do seek legal counsel, they often lack organized clause summaries and specific questions, making consultations slower, less focused, and more expensive.

---

## 💡 The Solution

LexiGuide AI provides a dedicated, accessible, and structured document workspace designed to guide users from initial document review to actionable preparation for a qualified attorney.

Rather than presenting an unstructured chat interface, LexiGuide AI provides an archival-inspired, premium legal SaaS aesthetic that promotes clarity, deliberate inspection, and transparency.

### Design Tokens & Typography

- **Archival Canvas:** `#F7F5F0` (warm document background)
- **Slate Navy:** `#102A43` (primary header & branding)
- **Deep Navy:** `#0B1F33` (contrast surfaces & cards)
- **Warm Gold:** `#C49A3A` (accents, citations, & highlights)
- **Muted Slate:** `#64748B` (metadata & captions)
- **Border Slate:** `#E2E8F0` (structural dividers)
- **Typography:** **Inter** for crisp, accessible UI navigation paired with **Merriweather** for authentic, readable legal document text.

---

## ✨ Key Features

### 1. Document Analysis Workspace (`/analyze`)
- **Document Upload & Selection:** Supports digital PDF and UTF-8 plain-text files, with document type categorization (Residential Rental, Commercial Lease, Employment, NDA, Service Agreement, etc.).
- **Paginated Viewer:** Clean document viewer with color-coded highlighting for *Important Clauses*, *Operational Obligations*, and *Review Items*.
- **Interactive Clause Filtering:** Filter by clause type or severity to isolate specific risk categories.
- **AI Analysis Sidebar:** Summarizes key terms, displays metric counters (Total Clauses, Important, Needs Review), and lists actor-specific obligations.

### 2. Plain-Language Clause Explainer (Interactive Drawer)
- Selecting any clause opens an in-depth breakdown containing:
  - **Original Text:** Verbatim legal excerpt from the agreement.
  - **Plain-Language Explanation:** Translates legal terminology into clear, accessible prose.
  - **What to Check:** Practical checklist items to inspect prior to signing.
  - **Follow-up Bridge:** Direct link to ask targeted questions about that specific clause in the Q&A assistant.

### 3. Side-by-Side Contract Comparison (`/compare`)
- Compare two contract revisions side by side (e.g., *Draft V1* vs. *Revised V2*).
- Tabular clause-by-clause diff breakdown detailing changes in rent, lock-in duration, security deposits, and notice periods.
- **Why This Matters:** Contextual guidance highlighting the practical impact of each modification.
- **Points to Discuss:** Neutral discussion topics prepared for a legal professional (the system objectively highlights differences without declaring which agreement is legally superior).

### 4. Grounded Document Q&A (`/ask`)
- Natural-language query interface powered by **Google Gemini 3.6 Flash** and connected to the live FastAPI backend.
- **Strictly Grounded Answers:** The AI is constrained exclusively to the retrieved document context.
- **Page-Aware Citations:** Every answer links directly to the specific page numbers and clauses from the uploaded agreement.
- **Safe Markdown Rendering:** Formats answers into bold headings, bullet lists, and paragraphs with zero HTML injection risks.

### 5. Action Checklist & Lawyer Preparation
- Automatically categorizes critical milestones: notice deadlines, payment schedules, move-in inspections, and renewal windows.
- **Lawyer Question Exporter:** One-click tool that compiles structured, context-backed questions ready to be shared with a legal professional.

### 6. Legal Knowledge & Guidance Hub (`/resources`)
- Practical reference guides across 7 major legal domains:
  - Housing & Tenancy
  - Employment & Workplace Rights
  - Consumer Protection
  - Contracts & Commercial Agreements
  - Cybercrime & Digital Privacy
  - Family & Personal Law
  - Common Legal Document Structures

### 7. Ethical Principles & Guardrails (`/about`)
- Transparent documentation of LexiGuide AI's design philosophy:
  - **Accessibility:** Democratizing legal comprehension for underserved individuals.
  - **Clarity:** Eliminating confusing jargon without oversimplifying legal reality.
  - **Responsible AI:** Operating within strict boundaries, preventing hallucinations, and never substituting for legal representation.
  - **User Control:** Keeping the user in charge of decisions and consultations.

> **Implementation Note on Live vs. Demo Capabilities:**
> LexiGuide AI clearly distinguishes between live and simulated experiences:
> - **Live Deployed Backend:** Document upload, digital PDF text extraction, page-preserved clause indexing, lexical context retrieval, Gemini 3.6 Flash grounded Q&A, and rate-limit fallbacks are fully functional via the live FastAPI backend on Render.
> - **Demo / Simulated Components:** The built-in *Residential Rental Agreement*, preloaded comparison diffs, sample checklist items, and simulated clause annotations on the Analyze page operate on high-fidelity structured demo datasets.

---

## 🏗️ Architecture

```text
USER
  │
  ▼
React + TypeScript + Vite (Frontend)
  │
  ▼
GitHub Pages (Static Hosting & Routing)
  │
  ▼  (HTTPS REST API)
FastAPI Backend (Hosted on Render)
  │
  ├── PyMuPDF (Digital PDF / TXT Text Extraction)
  │
  ├── Clause-Oriented Document Chunking
  │
  ├── In-Memory Lexical / Phrase Retrieval Engine
  │
  └── Google GenAI SDK (Gemini 3.6 Flash)
        │
        ▼
Grounded Plain-Language Response + Page Citations
```

### End-to-End Request Flow

1. **Document Upload:** The user selects a `.pdf` or `.txt` file on the frontend. The file is transmitted via `multipart/form-data` to `POST /api/documents/upload`.
2. **Extraction & Validation:** The backend uses PyMuPDF (`fitz`) to extract text while maintaining page boundaries. Scanned or image-only PDFs lacking selectable text are rejected with a descriptive `422 Unprocessable Content` error.
3. **Chunking & In-Memory Indexing:** The document is split into coherent clause chunks, preserving page associations, and stored in an active in-memory session.
4. **Natural-Language Question:** When the user queries the document, `POST /api/documents/{document_id}/ask` is triggered.
5. **Lexical Context Retrieval:** The retrieval service ranks and extracts relevant clause excerpts using token-overlap scoring and phrase matching.
6. **Gemini Grounded Inference:** The retrieved excerpts and user query are formatted into a strict grounding prompt sent to `gemini-3.6-flash`.
7. **Safe Response Delivery:** The answer, page references, and clause snippets are returned to the client and rendered safely using pure React components.

---

## 🔎 Document Processing & Retrieval

The document indexing and retrieval pipeline consists of 9 sequential stages:

1. **Upload:** Accepts digital PDF and UTF-8 plain-text documents up to 10 MB.
2. **Validation:** Verifies file extension, MIME type, and non-empty file size.
3. **Text Extraction:** PyMuPDF extracts full text page by page, preserving digital pagination.
4. **Scanned PDF Check:** Detects non-OCR scanned documents and informs the user that digital selectable text is required.
5. **Clause-Oriented Chunking:** Segments document content into semantic legal paragraphs and numbered sections rather than arbitrary character splits.
6. **In-Memory Indexing:** Assigns a unique `document_id` and indexes chunks with page metadata.
7. **Relevance Retrieval:** Computes query-to-chunk lexical relevance using token overlap, legal keyword matching, and phrase proximity.
8. **Prompt Grounding:** Assembles the top-scoring excerpts into a structured system context for Gemini.
9. **Grounded Generation:** Generates an objective, plain-language answer citing the specific pages utilized.

> **Note on Retrieval Architecture:** LexiGuide AI currently utilizes a deterministic, lightweight lexical and token-overlap retrieval engine with phrase matching. It does not currently use a vector database or embedding model.

---

## 🛡️ Rate-Limit & AI Failure Handling

Free-tier LLM services are subject to strict request and daily token quotas. LexiGuide AI implements graceful error-handling mechanisms to ensure continuous usability:

- **HTTP 429 Detection:** The backend catches Gemini API quota and rate-limit exceptions (`ResourceExhausted` / HTTP 429) at the service boundary.
- **No Raw Stack Traces:** Technical stack traces and provider exceptions are never leaked to the client.
- **Document-Only Fallback Mode:** When Gemini is temporarily unavailable, the endpoint returns a structured response containing:
  - `status: "rate_limited"`
  - A user-friendly message explaining temporary AI unavailability.
  - The actual relevant document excerpts and page citations retrieved by the backend.
- **No Fabrication on Failure:** The backend strictly refrains from guessing or fabricating answers when the model is unreachable, ensuring users still receive grounded document excerpts.

---

## 🧠 Responsible AI & Guardrails

LexiGuide AI is engineered around safety, transparency, and factual fidelity:

- **General Information Only:** Explicit disclaimers remind users that outputs are for educational and preparation purposes, not formal legal counsel.
- **Strict Document Grounding:** Prompts instruct the model to answer exclusively from the retrieved document text.
- **Zero Hallucinated Statutory Claims:** The model is prohibited from inventing non-existent statutory sections, legal codes, penalties, or statutory rights.
- **Insufficient-Information Handling:** If a question cannot be answered from the document, the system explicitly states that the document does not contain sufficient information rather than making assumptions.
- **Source Transparency:** Answers cite specific document pages and excerpts so users can verify every claim against the original text.

---

## 🔐 Security & Privacy Considerations

- **Server-Side API Keys:** The `GEMINI_API_KEY` is maintained exclusively on the backend server. It is never exposed to the client, never included in Vite environment variables, and never committed to version control (`.env` is strictly gitignored).
- **Encrypted In-Transit:** All production communication between the frontend and the Render backend occurs over secure HTTPS.
- **In-Memory Volatile Processing:** Uploaded documents and indexed chunks are held in server memory during an active session and are not stored in a persistent database.
- **Session Boundary & Recovery:** Server restarts or platform spin-downs clear in-memory sessions. The frontend detects missing sessions and provides an intuitive one-click re-upload prompt to re-index the document.
- **Data Sensitivity Guidance:** Users are advised not to upload sensitive personal data, classified agreements, or confidential trade secrets to this public prototype.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) |
| **Frontend Tooling** | [Vite 6](https://vitejs.dev/) |
| **Styling & Icons** | [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **Client Routing** | [React Router DOM](https://reactrouter.com/) (`HashRouter` for GitHub Pages) |
| **Typography** | Inter (sans-serif) & Merriweather (serif) |
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+) |
| **ASGI Web Server** | [Uvicorn](https://www.uvicorn.org/) |
| **Data Validation** | [Pydantic v2](https://docs.pydantic.dev/) |
| **Document Processing** | [PyMuPDF (`fitz`)](https://pymupdf.readthedocs.io/) |
| **GenAI SDK** | Google GenAI Python SDK (`google-genai`) |
| **AI Model** | Google **Gemini 3.6 Flash** (`gemini-3.6-flash`) |
| **CI / CD** | GitHub Actions (`deploy.yml`) |
| **Hosting** | GitHub Pages (Frontend) & Render (Backend Web Service) |

---

## 📁 Project Structure

```text
lexiguide-ai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── documents.py
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── gemini_service.py
│   │       ├── pdf_service.py
│   │       └── retrieval_service.py
│   ├── sample_documents/
│   │   └── Residential_Rental_Agreement.pdf
│   ├── scripts/
│   │   └── generate_rental_pdf.py
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_backend.py
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   └── requirements.txt
├── public/
│   ├── 404.html
│   ├── favicon.svg
│   └── Residential_Rental_Agreement.pdf
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── landing/
│   │   ├── analyze/
│   │   ├── compare/
│   │   ├── ask/
│   │   ├── checklist/
│   │   └── resources/
│   ├── context/
│   │   └── DocumentContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AnalyzePage.tsx
│   │   ├── ComparePage.tsx
│   │   ├── AskAiPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   └── AboutPage.tsx
│   ├── services/
│   │   ├── aiService.ts
│   │   └── backendApi.ts
│   ├── types/
│   │   └── legal.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔌 Backend API

The backend exposes a clean RESTful interface documented via OpenAPI:

- **Interactive Swagger UI:** [https://lexiguide-ai.onrender.com/docs](https://lexiguide-ai.onrender.com/docs)
- **ReDoc Documentation:** [https://lexiguide-ai.onrender.com/redoc](https://lexiguide-ai.onrender.com/redoc)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health check, version, and status |
| `POST` | `/api/documents/upload` | Upload a PDF or TXT file; extracts text, chunks clauses, and initializes session |
| `POST` | `/api/documents/{document_id}/ask` | Submit a natural-language question; retrieves relevant clauses and generates a grounded Gemini answer |
| `GET` | `/api/documents/{document_id}` | Retrieve indexed document metadata, chunk count, and text preview |

---

## 🧪 Testing

### Backend Automated Test Suite
The backend is validated with an extensive automated test suite covering 17 test cases across input validation, document extraction, retrieval accuracy, and error handling:

- `test_health_check`: Verifies API health and version payload.
- `test_upload_unsupported_file_format`: Rejects unaccepted file extensions.
- `test_upload_empty_file`: Validates rejection of 0-byte uploads.
- `test_upload_plain_text`: Tests UTF-8 text file processing.
- `test_upload_valid_pdf`: Tests multi-page PDF extraction and metadata calculation.
- `test_upload_scanned_or_blank_pdf`: Verifies 422 error on image-only/blank PDFs.
- `test_ask_question_nonexistent_document`: Confirms 404 response on invalid document IDs.
- `test_ask_question_empty_query`: Validates rejection of blank questions.
- `test_ask_question_grounded_response_and_citations`: Tests relevance retrieval and page-aware citations.
- `test_get_document_metadata`: Validates document lookup endpoint.
- `test_gemini_service_rate_limit_handling`: Verifies graceful handling of HTTP 429 quota exceptions.
- `test_ask_gemini_rate_limited`: Confirms document-only fallback response when the AI model is rate-limited.
- Additional tests for chunking boundaries, CORS headers, and edge-case queries.

**Test Results:** All **17 tests pass** cleanly.

### Frontend Build Verification
The frontend code is verified using strict TypeScript checking and the Vite production bundler:

- **TypeScript Compilation:** 0 errors.
- **Module Transformation:** 1,624 modules transformed successfully.
- **Production Asset Output:** Clean static bundle generated in `dist/`.

---

## 💻 Local Development

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **Python:** v3.11 or higher
- **Google Gemini API Key:** Optional for local development; required for live Q&A execution.

### 1. Clone the Repository

```bash
git clone https://github.com/TanuDubey-13/lexiguide-ai.git
cd lexiguide-ai
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install
```

Create a `.env.local` file in the root directory:

```ini
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### 3. Backend Setup

In a separate terminal window:

```bash
cd backend

# On Windows (PowerShell)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# On macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```ini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.6-flash
```

Start the FastAPI application:

```bash
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at `http://127.0.0.1:8000`, with interactive documentation at `http://127.0.0.1:8000/docs`.

---

## 🏗️ Production Build

To verify and build the static frontend assets for production:

```bash
npm run build
```

This runs `tsc` (TypeScript compiler) to ensure type safety, followed by `vite build` to bundle optimized assets into `dist/`.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

### Frontend (GitHub Pages)
The frontend is deployed automatically via GitHub Actions upon pushes to the `main` branch:

1. Workflow configuration: `.github/workflows/deploy.yml`.
2. The workflow checks out the repository, installs Node dependencies, and sets:
   ```bash
   VITE_API_BASE_URL=https://lexiguide-ai.onrender.com
   ```
3. Runs `npm run build` with the production API URL.
4. Deploys the resulting `dist/` directory to GitHub Pages.
5. Production URL: [https://tanudubey-13.github.io/lexiguide-ai/](https://tanudubey-13.github.io/lexiguide-ai/)

### Backend (Render)
The backend is deployed as a Web Service on Render:

- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Configuration:** The `GEMINI_API_KEY` is securely injected via Render's encrypted environment variables dashboard.
- Production API URL: [https://lexiguide-ai.onrender.com](https://lexiguide-ai.onrender.com)

---

## 🚧 Current Limitations

As an educational and hackathon prototype, LexiGuide AI operates within defined boundaries:

1. **In-Memory Document Sessions:** Document chunks and metadata are stored in volatile server memory. A server restart or Render free-tier spin-down clears active sessions. (The frontend detects expired sessions and offers a one-click re-upload button).
2. **Lexical Retrieval Engine:** Document retrieval relies on token overlap, phrase proximity, and keyword matching rather than dense vector embeddings.
3. **No Persistent User Database:** There are currently no user accounts, login systems, or persistent database tables for long-term document history.
4. **Digital Text Requirement:** The system parses digital text via PyMuPDF; scanned image-only PDFs without an OCR layer cannot be indexed.
5. **Partial Demo Scope in Frontend:** While the backend document upload, extraction, and grounded Q&A pipeline are live, other frontend views (e.g., initial sample document on Analyze, pre-calculated comparison diffs, and checklist templates) operate on high-fidelity structured demo datasets.

---

## 🔮 Future Scope

1. **Advanced Semantic Retrieval:**
   - Integrate vector databases (e.g., Chroma, Pinecone, or pgvector).
   - Implement dense text embeddings and hybrid lexical-semantic reranking.
2. **Automated Document Redaction:**
   - Detect and mask personally identifiable information (PII) including names, phone numbers, email addresses, bank accounts, and national identity numbers (Aadhaar, SSN) before processing.
3. **Multilingual Legal Understanding:**
   - Expand document explanation and Q&A to Hindi, Tamil, Telugu, Bengali, Spanish, and other regional languages.
4. **Deep Semantic Contract Comparison:**
   - Automated semantic diffing for uploaded custom contract pairs to detect nuanced shifts in obligations, liability, payment schedules, and dispute mechanisms.
5. **Export & Legal Briefing Reports:**
   - Generate structured PDF and Word summary reports, including highlighted clause indices and formal consultation packets for lawyers.
6. **Persistent User Accounts & Document Vaults:**
   - Secure authentication, multi-document organization, and historical audit trails.
7. **Enhanced Privacy Architecture:**
   - Configurable document retention policies, automated post-session purge routines, and client-side encryption.

---

## 🎯 Why LexiGuide AI?

```text
Complex Legal Document
         │
         ▼
   AI Assistance
         │
         ▼
Plain-Language Understanding
         │
         ▼
Better-Informed Questions
         │
         ▼
Professional Legal Consultation
```

LexiGuide AI was created with a clear objective: **to bridge the legal comprehension gap**. 

The solution is not built to replace legal professionals or offer automated legal verdicts. Instead, it empowers everyday citizens to understand what they are reading, recognize potential concerns, and approach legal professionals with focused, well-organized questions.

---

## 👩‍💻 Author

**Tanu Dubey**  
B.Tech in Computer Science & Engineering  

- **Interests:** Software Engineering, AI/ML, Full-Stack Development, Responsible AI, and building technology for real-world impact.
- **GitHub:** [https://github.com/TanuDubey-13](https://github.com/TanuDubey-13)
- **LinkedIn:** [https://www.linkedin.com/in/tanu-dubey-259214338](https://www.linkedin.com/in/tanu-dubey-259214338)
- **LeetCode:** [https://leetcode.com/u/TANU_DUBEY/](https://leetcode.com/u/TANU_DUBEY/)

---

## 📄 License

This project is developed as an open-source educational prototype for the GenAI Hackathon.

Any production deployment intended for commercial or confidential legal document processing would require additional enterprise security, data privacy compliance, formal legal review, and hardened infrastructure controls.

---

## ⚠️ Final Disclaimer

**LexiGuide AI is an AI-assisted document understanding tool. It is not a law firm, lawyer, or legal representative.**

The explanations, summaries, risk indicators, and answers generated by LexiGuide AI are provided strictly for informational and educational purposes. They do not constitute legal advice, a formal legal opinion, or an attorney-client relationship. Legal outcomes, obligations, and rights vary across jurisdictions. For any decision involving legal rights, liabilities, disputed provisions, or formal execution of agreements, users should consult a qualified legal professional.
