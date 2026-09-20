export type ClauseCategory = 'important' | 'obligation' | 'review';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface ClauseHighlight {
  id: string;
  documentId: string;
  title: string;
  category: ClauseCategory;
  page: number;
  sectionNumber: string;
  originalText: string;
  plainExplanation: string;
  checksToMake: string[];
  questionsToAsk: string[];
  riskLevel: RiskLevel;
}

export interface DocumentObligation {
  id: string;
  actor: string; // e.g. "Tenant (You)", "Landlord / Lessor", "Employee"
  title: string;
  description: string;
  timeframe?: string;
}

export interface DocumentAnalysis {
  id: string;
  documentId: string;
  documentName: string;
  pageCount: number;
  overview: string;
  clausesCount: number;
  importantCount: number;
  reviewCount: number;
  obligationsCount: number;
  keyClauses: ClauseHighlight[];
  thingsToReview: {
    id: string;
    title: string;
    description: string;
    severity: RiskLevel;
  }[];
  obligations: DocumentObligation[];
  potentialQuestions: string[];
}

export type DiffChangeType = 'changed' | 'added' | 'removed' | 'review';

export interface ComparisonDiff {
  id: string;
  clauseTitle: string;
  docAValue: string;
  docBValue: string;
  changeType: DiffChangeType;
  severity: RiskLevel;
  whyItMatters: string;
  actionRequired?: string;
}

export interface ComparisonResult {
  id: string;
  docAName: string;
  docBName: string;
  diffCount: number;
  changedCount: number;
  addedCount: number;
  removedCount: number;
  reviewCount: number;
  summary: string;
  diffs: ComparisonDiff[];
}

export interface SourceReference {
  documentName: string;
  page: number;
  section?: string;
  clauseTitle?: string;
  textSnippet: string;
  relevanceScore?: number;
}

export interface QAMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sourceReference?: SourceReference;
  sources?: SourceReference[];
  disclaimer?: string;
  relatedSections?: string[];
  isSimulating?: boolean;
  isRealBackend?: boolean;
  isRateLimited?: boolean;
  errorType?: 'not_found' | 'offline' | 'general';
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: 'Critical' | 'Compliance' | 'Documentation' | 'Clarification';
  completed: boolean;
  notes?: string;
}

export interface LawyerQuestion {
  id: string;
  question: string;
  context: string;
  category: string;
}

export type DocumentType = 
  | 'Residential Rental Agreement'
  | 'Commercial Lease'
  | 'Non-Disclosure Agreement (NDA)'
  | 'Employment Contract'
  | 'Freelance Service Agreement'
  | 'Terms of Service / Privacy Policy'
  | 'Other Legal Document';

export interface LegalDocument {
  id: string;
  backendDocumentId?: string;
  rawFile?: File;
  preview?: string;
  name: string;
  type: DocumentType;
  pageCount: number;
  fileSize: string;
  uploadDate: string;
  isDemo: boolean;
  description: string;
  fullTextSections: {
    sectionNumber: string;
    heading: string;
    page: number;
    paragraphs: string[];
    clauseId?: string;
  }[];
}

export interface LegalResource {
  id: string;
  title: string;
  category: 'Housing' | 'Employment' | 'Consumer' | 'Contracts' | 'Cybercrime' | 'Family' | 'Legal Documents';
  readTime: string;
  description: string;
  commonPitfalls: string[];
  whatToLookFor: string[];
}
