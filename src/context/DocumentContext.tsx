import React, { createContext, useContext, useState } from 'react';
import {
  LegalDocument,
  DocumentAnalysis,
  ComparisonResult,
  ClauseHighlight,
  DocumentType,
} from '../types/legal';
import {
  SAMPLE_RENTAL_DOCUMENT,
  SAMPLE_ANALYSIS,
  SAMPLE_COMPARISON_RESULT,
} from '../data/mockData';
import { analyzeDocument, ANALYSIS_STEPS } from '../services/aiService';

interface DocumentContextType {
  activeDocument: LegalDocument | null;
  analysis: DocumentAnalysis | null;
  isAnalyzing: boolean;
  analysisStep: number;
  analysisStepLabel: string;
  selectedClause: ClauseHighlight | null;
  comparisonResult: ComparisonResult | null;
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
  loadDemoDocument: () => Promise<void>;
  uploadCustomDocument: (fileName: string, type?: DocumentType) => Promise<void>;
  clearDocument: () => void;
  openClauseExplainer: (clause: ClauseHighlight) => void;
  closeClauseExplainer: () => void;
  setComparisonResult: (result: ComparisonResult | null) => void;
  loadDemoComparison: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(SAMPLE_RENTAL_DOCUMENT);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(SAMPLE_ANALYSIS);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisStepLabel, setAnalysisStepLabel] = useState<string>(ANALYSIS_STEPS[0]);
  const [selectedClause, setSelectedClause] = useState<ClauseHighlight | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(SAMPLE_COMPARISON_RESULT);
  const [documentType, setDocumentType] = useState<DocumentType>('Residential Rental Agreement');

  const runAnalysisWorkflow = async (doc: LegalDocument) => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisStepLabel(ANALYSIS_STEPS[0]);

    try {
      const result = await analyzeDocument(doc, (step, label) => {
        setAnalysisStep(step);
        setAnalysisStepLabel(label);
      });
      setAnalysis(result);
    } catch (err) {
      console.error('Error analyzing document:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadDemoDocument = async () => {
    setActiveDocument(SAMPLE_RENTAL_DOCUMENT);
    setDocumentType(SAMPLE_RENTAL_DOCUMENT.type);
    await runAnalysisWorkflow(SAMPLE_RENTAL_DOCUMENT);
  };

  const uploadCustomDocument = async (fileName: string, type: DocumentType = 'Other Legal Document') => {
    const newDoc: LegalDocument = {
      id: `doc-${Date.now()}`,
      name: fileName,
      type: type,
      pageCount: 8,
      fileSize: '2.1 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      isDemo: false,
      description: `Uploaded ${type} for automated analysis and clause extraction.`,
      fullTextSections: [
        {
          sectionNumber: 'Section 1',
          heading: 'Recitals and Operational Scope',
          page: 1,
          paragraphs: [
            `This legal instrument ("Agreement") governs the formal terms, covenants, and responsibilities established under ${fileName}.`,
            'The parties agree to adhere strictly to all stipulated performance obligations, notification requirements, and confidentiality covenants.'
          ]
        },
        {
          sectionNumber: 'Section 2',
          heading: 'Terms, Termination and Notice Period',
          page: 2,
          clauseId: 'clause-termination',
          paragraphs: [
            'Either party may terminate this agreement upon delivering forty-five (45) days prior written notice to the registered address.',
            'Early termination without justifiable breach shall entail liquidated reimbursement for administrative and transition expenses incurred.'
          ]
        },
        {
          sectionNumber: 'Section 3',
          heading: 'Financial Obligations and Retainers',
          page: 3,
          clauseId: 'clause-security-deposit',
          paragraphs: [
            'All deposits, fees, and payments shall be remitted in advance within five (5) business days of statement issuance.',
            'Any refundable balances shall be remitted within thirty (30) business days following final clearance and audit of deliverables.'
          ]
        },
        {
          sectionNumber: 'Section 4',
          heading: 'Indemnity and Limitation of Liability',
          page: 4,
          clauseId: 'clause-liability',
          paragraphs: [
            'To the maximum extent permitted under applicable law, liability of either party for incidental or consequential damages shall be limited.',
            'Each party agrees to defend and hold harmless the other from third-party claims arising from gross negligence or willful default.'
          ]
        }
      ]
    };

    setActiveDocument(newDoc);
    setDocumentType(type);
    await runAnalysisWorkflow(newDoc);
  };

  const clearDocument = () => {
    setActiveDocument(null);
    setAnalysis(null);
    setSelectedClause(null);
  };

  const openClauseExplainer = (clause: ClauseHighlight) => {
    setSelectedClause(clause);
  };

  const closeClauseExplainer = () => {
    setSelectedClause(null);
  };

  const loadDemoComparison = () => {
    setComparisonResult(SAMPLE_COMPARISON_RESULT);
  };

  return (
    <DocumentContext.Provider
      value={{
        activeDocument,
        analysis,
        isAnalyzing,
        analysisStep,
        analysisStepLabel,
        selectedClause,
        comparisonResult,
        documentType,
        setDocumentType,
        loadDemoDocument,
        uploadCustomDocument,
        clearDocument,
        openClauseExplainer,
        closeClauseExplainer,
        setComparisonResult,
        loadDemoComparison,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
