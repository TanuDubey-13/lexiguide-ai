import {
  LegalDocument,
  DocumentAnalysis,
  ComparisonResult,
  ClauseHighlight,
  QAMessage,
  ChecklistItem,
  LawyerQuestion,
} from '../types/legal';
import {
  SAMPLE_ANALYSIS,
  SAMPLE_COMPARISON_RESULT,
  INITIAL_CHECKLIST_ITEMS,
  SAMPLE_LAWYER_QUESTIONS,
} from '../data/mockData';

// Simulated latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface AnalysisProgressCallback {
  (stepIndex: number, stepLabel: string): void;
}

export const ANALYSIS_STEPS = [
  'Reading document and text extraction',
  'Identifying sections and legal provisions',
  'Finding important clauses and obligations',
  'Preparing plain-language insights'
];

/**
 * Analyzes a legal document with staged progress updates.
 * Simulates AI token generation and analysis pipeline.
 */
export async function analyzeDocument(
  document: LegalDocument,
  onProgress?: AnalysisProgressCallback
): Promise<DocumentAnalysis> {
  for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
    if (onProgress) {
      onProgress(i, ANALYSIS_STEPS[i]);
    }
    await delay(450); // realistic staged progress
  }

  // If analyzing the demo document or a custom uploaded document, return tailored analysis
  return {
    ...SAMPLE_ANALYSIS,
    id: `analysis-${Date.now()}`,
    documentId: document.id,
    documentName: document.name,
    pageCount: document.pageCount,
    overview: document.isDemo
      ? SAMPLE_ANALYSIS.overview
      : `Analysis for "${document.name}": Outlines contractual obligations, terms, conditions, risk allocations, and compliance duties between the executing parties.`
  };
}

/**
 * Explains a specific clause in plain language.
 */
export async function explainClause(clauseId: string): Promise<ClauseHighlight | null> {
  await delay(250);
  const found = SAMPLE_ANALYSIS.keyClauses.find((c) => c.id === clauseId);
  return found || null;
}

/**
 * Compares two documents and identifies meaningful differences.
 */
export async function compareDocuments(
  docA: LegalDocument,
  docB: LegalDocument,
  onProgress?: (step: number, label: string) => void
): Promise<ComparisonResult> {
  const steps = [
    'Parsing baseline document provisions',
    'Analyzing second document structure',
    'Diffing clauses and legal scope',
    'Calculating severity impact and risk levels'
  ];

  for (let i = 0; i < steps.length; i++) {
    if (onProgress) {
      onProgress(i, steps[i]);
    }
    await delay(400);
  }

  return {
    ...SAMPLE_COMPARISON_RESULT,
    id: `comp-${Date.now()}`,
    docAName: docA.name,
    docBName: docB.name,
  };
}

import {
  askBackendDocument,
  BackendDocumentNotFoundError,
  BackendConnectionError,
} from './backendApi';

/**
 * Answers a user question grounded in the document content.
 * If backendDocId is provided, queries the real FastAPI backend + Gemini 3.6 Flash.
 * Otherwise, falls back to the keyword-aware simulated engine.
 */
export async function askDocument(
  query: string,
  _docId: string,
  backendDocId?: string,
  documentName: string = 'Document'
): Promise<QAMessage> {
  // If a real backend document ID is available, communicate with FastAPI & Gemini 3.6 Flash
  if (backendDocId) {
    try {
      const response = await askBackendDocument(backendDocId, query);
      const mappedSources = response.sources.map((s) => ({
        documentName,
        page: s.page,
        textSnippet: s.snippet,
        relevanceScore: s.relevance_score,
      }));

      return {
        id: `qa-${Date.now()}`,
        sender: 'ai',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceReference: mappedSources.length > 0 ? mappedSources[0] : undefined,
        sources: mappedSources,
        disclaimer: response.disclaimer,
        isRealBackend: true,
        isRateLimited: response.status === 'rate_limited' || Boolean(response.fallback_used),
      };
    } catch (err) {
      if (err instanceof BackendDocumentNotFoundError) {
        throw err;
      }
      if (err instanceof BackendConnectionError) {
        console.warn('Backend connection failed, falling back to simulated response:', err.message);
      } else {
        throw err;
      }
    }
  }

  await delay(700);

  const lower = query.toLowerCase();

  // Keyword-aware simulated response engine
  if (lower.includes('terminate') || lower.includes('end') || lower.includes('cancel') || lower.includes('leave')) {
    return {
      id: `qa-${Date.now()}`,
      sender: 'ai',
      text: 'Based on the uploaded demo agreement, Section 7 states that either party may terminate the agreement prior to expiration by providing thirty (30) days advance written notice. However, if the tenant vacates prior to the 6-month minimum lock-in period without documented cause, the landlord retains the right to forfeit one month\'s rent equivalent from the security deposit as liquidated damages.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: {
        documentName: 'Residential_Rental_Agreement.pdf',
        page: 4,
        section: 'Section 7',
        clauseTitle: 'Termination and Notice Period',
        textSnippet: 'Either party may terminate this agreement by providing thirty (30) days advance written notice delivered via registered post or certified electronic mail.'
      },
      relatedSections: ['Section 4 (Security Deposit)', 'Section 2 (Term of Tenancy)']
    };
  } else if (lower.includes('repair') || lower.includes('maintenance') || lower.includes('fix') || lower.includes('broken')) {
    return {
      id: `qa-${Date.now()}`,
      sender: 'ai',
      text: 'According to Section 5, the tenant is responsible for minor repairs up to ₹1,500 resulting from everyday usage (such as light bulbs, faucets, and fixture adjustments). The landlord is obligated to handle major structural repairs, plumbing mainlines, and electrical circuits, provided you submit written notification within 48 hours of discovering the defect.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: {
        documentName: 'Residential_Rental_Agreement.pdf',
        page: 3,
        section: 'Section 5',
        clauseTitle: 'Maintenance Responsibilities and Repairs',
        textSnippet: 'Minor repairs up to ₹1,500 per occurrence resulting from daily wear and routine usage shall be borne by the Tenant. Major structural repairs... shall be the Landlord\'s responsibility.'
      },
      relatedSections: ['Section 6 (Alterations)', 'Section 8 (Inspection & Entry)']
    };
  } else if (lower.includes('deposit') || lower.includes('refund') || lower.includes('money')) {
    return {
      id: `qa-${Date.now()}`,
      sender: 'ai',
      text: 'Section 4 outlines that the ₹50,000 security deposit is interest-free and refundable within thirty (30) business days following handover of the premises and keys. The landlord may only withhold money for documented physical damages beyond normal wear and tear, or outstanding utility bills, and must provide itemized receipts for any deductions.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: {
        documentName: 'Residential_Rental_Agreement.pdf',
        page: 2,
        section: 'Section 4',
        clauseTitle: 'Security Deposit and Deductions',
        textSnippet: 'The Security Deposit shall be returned to the Tenant within thirty (30) business days following full handover of the Premises, keys, and proof of utility clearance...'
      },
      relatedSections: ['Section 3 (Rent Schedule)', 'Section 7 (Termination)']
    };
  } else if (lower.includes('rent') || lower.includes('increase') || lower.includes('escalat') || lower.includes('hike')) {
    return {
      id: `qa-${Date.now()}`,
      sender: 'ai',
      text: 'Section 3 establishes that monthly rent of ₹24,000 is fixed for the 11-month lease duration and payable on or before the 5th of each month. Rent cannot be unilaterally increased during the active term. Under Section 2, if the lease is renewed after 11 months by mutual agreement, an escalation of between 5% and 7% may be applied.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: {
        documentName: 'Residential_Rental_Agreement.pdf',
        page: 2,
        section: 'Section 3 & Section 2',
        clauseTitle: 'Rent and Payment / Renewal Terms',
        textSnippet: 'The monthly rent for the Premises shall be ₹24,000... Renewal may include an annual escalation of the monthly rent not exceeding five percent (5%) to seven percent (7%).'
      },
      relatedSections: ['Section 2 (Term & Renewal)', 'Section 4 (Security Deposit)']
    };
  } else if (
    lower.includes('electric') ||
    lower.includes('utilit') ||
    lower.includes('power') ||
    (lower.includes('bill') && (lower.includes('late') || lower.includes('penalty') || lower.includes('pay')))
  ) {
    return {
      id: `qa-${Date.now()}`,
      sender: 'ai',
      text: 'The uploaded document does not contain enough information to determine the penalty for late payment of electricity bills. While Section 4 and Section 5 establish obligations regarding utility clearance, utility arrears, and electrical circuitry maintenance, the agreement does not specify a late-payment penalty or financial surcharge for electricity bills. LexiGuide will not infer or invent a penalty that is not stated in the document.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: {
        documentName: 'Residential_Rental_Agreement.pdf',
        page: 2,
        section: 'Section 4 & Section 5',
        clauseTitle: 'Security Deposit & Maintenance (Utility Provisions)',
        textSnippet: 'The Security Deposit shall be returned to the Tenant within thirty (30) business days following full handover of the Premises, keys, and proof of utility clearance, subject to reasonable itemized deductions for documented physical damages exceeding normal wear and tear, unpaid rent, or utility arrears.'
      },
      relatedSections: ['Section 4 (Security Deposit)', 'Section 5 (Maintenance Responsibilities)']
    };
  } else {
    // Unsupported question with no sufficiently relevant passage: refuse to invent, do not display unrelated citations
    return {
      id: `qa-${Date.now()}`,
      sender: 'ai',
      text: `The uploaded document does not contain enough information to answer "${query}". LexiGuide will not infer or invent provisions, penalties, or obligations that are not explicitly stated in the document. Please consult a qualified legal professional for matters not addressed in the agreement.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceReference: undefined,
      sources: [],
      relatedSections: []
    };
  }
}

/**
 * Generates actionable checklist items for the document.
 */
export async function generateChecklist(_docId: string): Promise<ChecklistItem[]> {
  await delay(500);
  return [...INITIAL_CHECKLIST_ITEMS];
}

/**
 * Generates tailored lawyer questions for the document.
 */
export async function generateLawyerQuestions(_docId: string): Promise<LawyerQuestion[]> {
  await delay(500);
  return [...SAMPLE_LAWYER_QUESTIONS];
}
