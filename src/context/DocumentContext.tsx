import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import {
  uploadDocumentToBackend,
  checkBackendHealth,
  BackendApiError,
  BackendConnectionError,
} from '../services/backendApi';

export type BackendStatus = 'connected' | 'disconnected' | 'checking';

interface DocumentContextType {
  activeDocument: LegalDocument | null;
  analysis: DocumentAnalysis | null;
  isAnalyzing: boolean;
  isUploading: boolean;
  uploadError: string | null;
  backendStatus: BackendStatus;
  analysisStep: number;
  analysisStepLabel: string;
  selectedClause: ClauseHighlight | null;
  comparisonResult: ComparisonResult | null;
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
  loadDemoDocument: () => Promise<void>;
  uploadCustomDocument: (fileOrName: File | string, type?: DocumentType) => Promise<void>;
  reuploadCurrentDocument: () => Promise<boolean>;
  clearDocument: () => void;
  openClauseExplainer: (clause: ClauseHighlight) => void;
  closeClauseExplainer: () => void;
  setComparisonResult: (result: ComparisonResult | null) => void;
  loadDemoComparison: () => void;
  refreshBackendStatus: () => Promise<boolean>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(SAMPLE_RENTAL_DOCUMENT);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(SAMPLE_ANALYSIS);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisStepLabel, setAnalysisStepLabel] = useState<string>(ANALYSIS_STEPS[0]);
  const [selectedClause, setSelectedClause] = useState<ClauseHighlight | null>(null);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(SAMPLE_COMPARISON_RESULT);
  const [documentType, setDocumentType] = useState<DocumentType>('Residential Rental Agreement');

  // Probe backend health
  const refreshBackendStatus = useCallback(async (): Promise<boolean> => {
    const health = await checkBackendHealth();
    const isOnline = health !== null && health.status === 'ok';
    setBackendStatus(isOnline ? 'connected' : 'disconnected');
    return isOnline;
  }, []);

  // Check health on mount
  useEffect(() => {
    refreshBackendStatus();
  }, [refreshBackendStatus]);

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

  /**
   * Helper to upload the demo Residential_Rental_Agreement.pdf to backend if online
   */
  const uploadDemoPdfToBackend = async (): Promise<string | undefined> => {
    try {
      const isOnline = await refreshBackendStatus();
      if (!isOnline) return undefined;

      // Fetch public PDF asset
      const pathsToTry = [
        'Residential_Rental_Agreement.pdf',
        './Residential_Rental_Agreement.pdf',
        '/lexiguide-ai/Residential_Rental_Agreement.pdf',
        '/Residential_Rental_Agreement.pdf',
      ];

      let blob: Blob | null = null;
      for (const p of pathsToTry) {
        try {
          const res = await fetch(p);
          if (res.ok) {
            blob = await res.blob();
            break;
          }
        } catch {
          continue;
        }
      }

      if (blob) {
        const file = new File([blob], 'Residential_Rental_Agreement.pdf', { type: 'application/pdf' });
        const res = await uploadDocumentToBackend(file);
        return res.document_id;
      }
    } catch (err) {
      console.warn('Could not auto-index demo PDF on backend:', err);
    }
    return undefined;
  };

  const loadDemoDocument = async () => {
    setUploadError(null);
    let backendDocId: string | undefined = undefined;

    try {
      backendDocId = await uploadDemoPdfToBackend();
    } catch (err) {
      console.warn('Demo PDF backend indexing skipped:', err);
    }

    const demoDoc: LegalDocument = {
      ...SAMPLE_RENTAL_DOCUMENT,
      backendDocumentId: backendDocId,
    };

    setActiveDocument(demoDoc);
    setDocumentType(demoDoc.type);
    await runAnalysisWorkflow(demoDoc);
  };

  // Attempt to index initial demo document with backend if available
  useEffect(() => {
    let mounted = true;
    (async () => {
      const isOnline = await refreshBackendStatus();
      if (isOnline && mounted && !activeDocument?.backendDocumentId) {
        const id = await uploadDemoPdfToBackend();
        if (id && mounted) {
          setActiveDocument((prev) => (prev ? { ...prev, backendDocumentId: id } : null));
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [refreshBackendStatus]);

  const uploadCustomDocument = async (
    fileOrName: File | string,
    type: DocumentType = 'Other Legal Document'
  ) => {
    setIsUploading(true);
    setUploadError(null);

    const isFile = fileOrName instanceof File;
    const fileName = isFile ? fileOrName.name : fileOrName;
    const rawFile = isFile ? fileOrName : undefined;

    let backendDocId: string | undefined = undefined;
    let pageCount = 6;
    let previewSnippet: string | undefined = undefined;

    if (isFile) {
      try {
        const uploadRes = await uploadDocumentToBackend(fileOrName);
        backendDocId = uploadRes.document_id;
        pageCount = uploadRes.page_count;
        previewSnippet = uploadRes.preview;
        setBackendStatus('connected');
      } catch (err: any) {
        if (err instanceof BackendApiError) {
          setIsUploading(false);
          setUploadError(err.detail);
          throw err;
        } else if (err instanceof BackendConnectionError) {
          setBackendStatus('disconnected');
          console.warn('FastAPI backend is offline. Storing document for local client mode:', err.message);
        } else {
          setIsUploading(false);
          setUploadError(err.message || 'Unknown upload error');
          throw err;
        }
      }
    }

    const fileSizeStr = isFile ? `${(fileOrName.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB';

    const newDoc: LegalDocument = {
      id: `doc-${Date.now()}`,
      backendDocumentId: backendDocId,
      rawFile: rawFile,
      preview: previewSnippet,
      name: fileName,
      type: type,
      pageCount: pageCount,
      fileSize: fileSizeStr,
      uploadDate: new Date().toISOString().split('T')[0],
      isDemo: false,
      description: `Uploaded ${type} for automated analysis and clause extraction.`,
      fullTextSections: [
        {
          sectionNumber: 'Section 1',
          heading: 'Recitals and Operational Scope',
          page: 1,
          paragraphs: [
            previewSnippet || `This legal instrument ("Agreement") governs the formal terms, covenants, and responsibilities established under ${fileName}.`,
            'The parties agree to adhere strictly to all stipulated performance obligations, notification requirements, and confidentiality covenants.'
          ]
        },
        {
          sectionNumber: 'Section 2',
          heading: 'Terms, Termination and Notice Period',
          page: 2,
          clauseId: 'clause-termination',
          paragraphs: [
            'Either party may terminate this agreement upon delivering advance written notice to the registered address.',
            'Early termination without justifiable breach shall entail liquidated reimbursement for administrative and transition expenses incurred.'
          ]
        },
        {
          sectionNumber: 'Section 3',
          heading: 'Financial Obligations and Retainers',
          page: Math.min(3, pageCount),
          clauseId: 'clause-security-deposit',
          paragraphs: [
            'All deposits, fees, and payments shall be remitted in advance within five (5) business days of statement issuance.',
            'Any refundable balances shall be remitted within thirty (30) business days following final clearance and audit of deliverables.'
          ]
        },
        {
          sectionNumber: 'Section 4',
          heading: 'Indemnity and Limitation of Liability',
          page: Math.min(4, pageCount),
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
    setIsUploading(false);
    await runAnalysisWorkflow(newDoc);
  };

  /**
   * Re-uploads the active document if backend restarted and lost in-memory session.
   */
  const reuploadCurrentDocument = async (): Promise<boolean> => {
    if (!activeDocument) return false;

    setIsUploading(true);
    setUploadError(null);

    try {
      if (activeDocument.rawFile) {
        const res = await uploadDocumentToBackend(activeDocument.rawFile);
        setActiveDocument((prev) => prev ? { ...prev, backendDocumentId: res.document_id } : null);
        setBackendStatus('connected');
        setIsUploading(false);
        return true;
      } else if (activeDocument.isDemo) {
        const id = await uploadDemoPdfToBackend();
        if (id) {
          setActiveDocument((prev) => prev ? { ...prev, backendDocumentId: id } : null);
          setBackendStatus('connected');
          setIsUploading(false);
          return true;
        }
      }
    } catch (err: any) {
      setUploadError(err.detail || err.message || 'Failed to re-upload document');
    } finally {
      setIsUploading(false);
    }
    return false;
  };

  const clearDocument = () => {
    setActiveDocument(null);
    setAnalysis(null);
    setSelectedClause(null);
    setUploadError(null);
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
        isUploading,
        uploadError,
        backendStatus,
        analysisStep,
        analysisStepLabel,
        selectedClause,
        comparisonResult,
        documentType,
        setDocumentType,
        loadDemoDocument,
        uploadCustomDocument,
        reuploadCurrentDocument,
        clearDocument,
        openClauseExplainer,
        closeClauseExplainer,
        setComparisonResult,
        loadDemoComparison,
        refreshBackendStatus,
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
