# LexiGuide AI

> **"Legal documents, explained for you."**

LexiGuide AI is an AI-powered legal document understanding workspace built for the GenAI hackathon challenge: **"AI for Legal Assistance & Access"**. 

It empowers citizens, tenants, employees, and small business owners to upload, understand, compare, and extract actionable insights from complex legal documents—translating dense legalese into plain language while providing structured questions to discuss with a licensed attorney.

---

## Important Ethical Notice & Disclaimer

> **LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional.**
>
> In this prototype version, all analysis, clause breakdowns, comparison diffs, and Q&A interactions operate in **DEMO MODE** using realistic, high-fidelity simulated legal data without live backend or API keys.

---

## The Problem

Legal agreements—from residential leases and employment contracts to NDAs and service terms—are written in specialized, archaic language designed by and for legal professionals. This creates severe legal information asymmetry:

1. **Incomprehensible Jargon:** Everyday users sign agreements without understanding critical forfeiture clauses, renewal traps, or indemnity burdens.
2. **Hidden Obligations & Penalties:** Subtle clauses (such as 6-month lock-in penalties or 48-hour defect reporting windows) often result in unexpected financial loss.
3. **Difficult Version Comparison:** When a landlord or employer issues a revised contract, spotting subtle shifts in liability or notice periods manually is error-prone.
4. **Unprepared Lawyer Consultations:** When users do seek legal advice, they often lack organized summaries and specific questions, making consultations slower and more expensive.

---

## The Solution

LexiGuide AI provides a dedicated, accessible, and transparent document workspace that guides users through a clear 7-step journey:

```
UPLOAD  ➔  UNDERSTAND  ➔  IDENTIFY IMPORTANT CLAUSES  ➔  COMPARE  ➔  ASK QUESTIONS  ➔  GET ACTIONABLE OUTPUT  ➔  PREPARE FOR A LEGAL PROFESSIONAL
```

The application is purposefully designed as a **premium legal SaaS workspace**, avoiding generic chatbot cliches in favor of an archival-inspired aesthetic (`#F7F5F0` background, `#102A43` slate navy, and `#C49A3A` gold highlights).

---

## Key Features

### 1. Split-Screen Document Analysis Workspace (`/analyze`)
- **Document Viewer:** Simulated paginated viewer with subtle, color-coded highlights for *Important Clauses*, *Operational Obligations*, and *Review Items*.
- **Clause Filter:** Instant filtering to isolate specific risk categories.
- **AI Analysis Sidebar:** Provides plain-English overviews, metric counters (Clauses, Important, Review), actor-based obligation trackers, and flagged risk areas.
- **Document Type Selector:** Categorize documents (Residential Rental, Commercial Lease, NDA, Employment, etc.).

### 2. Plain-Language Clause Explainer (Interactive Drawer)
- Click any clause to view:
  - **Original Text** with verbatim legal excerpts.
  - **Plain-Language Explanation** translating obligations into understandable language.
  - **"What should you check?"** actionable checklist.
  - **One-click bridge** to ask follow-up questions in the AI assistant.

### 3. Side-by-Side Contract Comparison (`/compare`)
- Upload or compare two versions of a contract (e.g. `Rental_Agreement_V1.pdf` vs `Rental_Agreement_V2.pdf`).
- Detailed comparison table with expandable **"Why this matters"** rationale and points to discuss with a legal professional.

### 4. Grounded Document Q&A (`/ask`)
- Query your agreement using natural language or suggested prompt pills (*"What happens if I terminate early?"*, *"Who is responsible for repairs?"*, *"When is the security deposit returned?"*).
- Responses clearly distinguish the plain-language **Answer** from **Source references from the uploaded demo document** (specifying page number, section, and text snippet) along with related sections.

### 5. Interactive Action Checklist & Lawyer Preparation
- Track critical deadlines, payment schedules, and documentation steps.
- **Lawyer Question Exporter:** One-click copy tool that generates structured, context-backed questions ready for consultation with a legal professional.

### 6. Legal Knowledge & Guidance Hub (`/resources`)
- Educational overviews across 7 domains: Housing, Employment, Consumer Protection, Contracts, Cybercrime/Privacy, Family, and Legal Documents.
- Common pitfalls and contract clauses to look for before signing.

### 7. Ethical AI Principles (`/about`)
- Transparent documentation of core values: Accessibility, Clarity, Responsible AI, and User Control.
- Clear delineation of AI boundaries: never providing binding legal counsel, never fabricating citations, and always centering human agency.

---

## Technology Stack

- **Framework:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom legal-tech design tokens
- **Routing:** [React Router DOM](https://reactrouter.com/) (configured with `HashRouter` for GitHub Pages static hosting compatibility)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** Inter (modern sans) and Merriweather (archival legal serif)

---

## Project Structure

```
lexiguide-ai/
├── public/
│   ├── 404.html               # GitHub Pages SPA routing fallback
│   └── favicon.svg            # Brand document + sparkle icon
├── src/
│   ├── components/
│   │   ├── common/            # Navbar, Footer, DisclaimerBanner, DemoModeBadge,
│   │   │                      # DocumentTypeSelector, LoadingModal, EmptyState, ErrorState
│   │   ├── landing/           # HeroSection, InteractivePreview, FeaturesGrid, HowItWorks
│   │   ├── analyze/           # DocumentUploadDropzone, DocumentViewer, AnalysisSidebar, ClauseDetailDrawer
│   │   ├── compare/           # CompareUploader, DiffSummaryCards, ClauseDiffTable
│   │   ├── ask/               # DocumentQaChat
│   │   ├── checklist/         # ActionChecklistPanel
│   │   └── resources/         # ResourceCard
│   ├── context/
│   │   └── DocumentContext.tsx # Shared document, analysis, and comparison state
│   ├── data/
│   │   └── mockData.ts        # Realistic sample rental agreement, clauses, diffs, QA dataset, guides
│   ├── services/
│   │   └── aiService.ts       # Typed simulated AI service layer with staged progress
│   ├── types/
│   │   └── legal.ts           # Comprehensive TypeScript interfaces
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AnalyzePage.tsx
│   │   ├── ComparePage.tsx
│   │   ├── AskAiPage.tsx
│   │   ├── ResourcesPage.tsx
│   │   └── AboutPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Responsible AI & Guardrails

- **Information, Not Legal Advice:** Prominently stated across the global navigation banner, preview modules, and footer.
- **Offline Simulated Mode (Demo Mode):** Does not connect to live backend or leak confidential contract files.
- **Source-Grounded Responses:** Answers reference exact sections and clauses from the uploaded document text.
- **No Hallucinated Statutory Claims:** Does not invent non-existent penal code sections or statutory guarantees.

---

## Future Scope

1. **Gemini 1.5 Pro / Flash Integration:** Connect `aiService.ts` to live Google Gemini multimodal API for native PDF parsing and zero-shot legal extraction.
2. **Document Redaction (Sidecar Privacy):** Client-side PII scrubbing (names, bank accounts, Aadhaar/SSN) before documents are tokenized.
3. **Multi-Language Translation:** Translate agreements into local vernacular languages (e.g. Hindi, Tamil, Spanish) to democratize justice.
4. **Export to Word / PDF:** Export annotated copies and lawyer consultation briefing packets with watermark disclaimers.

---

## Local Setup & Development

### Prerequisites
- Node.js (v18 or higher recommended; built and tested on v24.11.0)
- npm (v9 or higher)

### 1. Clone & Install
```bash
git clone https://github.com/TanuDubey-13/lexiguide-ai.git
cd lexiguide-ai
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 3. Production Build
```bash
npm run build
```
Generates production-optimized static assets in the `dist/` folder.

### 4. Preview Build Locally
```bash
npm run preview
```

---

## Deployment to GitHub Pages

The repository is configured for GitHub Pages with base path `/lexiguide-ai/` and client-side routing via `HashRouter`:

1. In `vite.config.ts`, the base path is configured as:
   ```ts
   base: process.env.NODE_ENV === 'production' ? '/lexiguide-ai/' : '/'
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist` directory to the `gh-pages` branch or configure GitHub Actions to deploy from the `dist` folder.
