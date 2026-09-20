import React, { useState } from 'react';
import { useDocument } from '../context/DocumentContext';
import { DocumentUploadDropzone } from '../components/analyze/DocumentUploadDropzone';
import { DocumentViewer } from '../components/analyze/DocumentViewer';
import { AnalysisSidebar } from '../components/analyze/AnalysisSidebar';
import { ClauseDetailDrawer } from '../components/analyze/ClauseDetailDrawer';
import { LoadingAnalysisModal } from '../components/common/LoadingAnalysisModal';
import { ActionChecklistPanel } from '../components/checklist/ActionChecklistPanel';
import { EmptyState } from '../components/common/EmptyState';
import { FileUp, ArrowLeft } from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  const {
    activeDocument,
    analysis,
    isAnalyzing,
    analysisStep,
    selectedClause,
    openClauseExplainer,
    closeClauseExplainer,
    loadDemoDocument,
  } = useDocument();

  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showUploadView, setShowUploadView] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Loading Modal */}
      <LoadingAnalysisModal
        isOpen={isAnalyzing}
        currentStep={analysisStep}
        documentName={activeDocument?.name}
      />

      {/* Clause Detail Drawer */}
      <ClauseDetailDrawer
        clause={selectedClause}
        onClose={closeClauseExplainer}
      />

      {/* Action Checklist Modal */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1F33]/60 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-in fade-in">
          <div className="max-w-4xl w-full">
            <ActionChecklistPanel
              documentName={activeDocument?.name}
              onClose={() => setShowChecklistModal(false)}
            />
          </div>
        </div>
      )}

      {/* View Switcher: Upload Dropzone vs Workspace */}
      {!activeDocument || showUploadView ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {showUploadView && activeDocument && (
            <button
              onClick={() => setShowUploadView(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#102A43] hover:text-[#C49A3A] transition-colors p-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Current Workspace ({activeDocument.name})</span>
            </button>
          )}
          <DocumentUploadDropzone onUploadSuccess={() => setShowUploadView(false)} />
        </div>
      ) : analysis ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Workspace Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Document Workspace
              </span>
              <span className="text-xs text-[#94A3B8]">•</span>
              <span className="text-xs text-[#102A43] font-semibold">{activeDocument.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUploadView(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#102A43] text-xs font-semibold hover:bg-[#F1EFE9] transition-all shadow-subtle"
              >
                <FileUp className="w-3.5 h-3.5 text-[#C49A3A]" />
                <span>Upload Different Document</span>
              </button>
            </div>
          </div>

          {/* Split Screen Workspace: LEFT 7 cols, RIGHT 5 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:h-[calc(100vh-14rem)] lg:min-h-[600px]">
            {/* Left: Document Viewer (7 Cols) */}
            <div className="lg:col-span-7 h-[580px] sm:h-[640px] lg:h-full min-h-0">
              <DocumentViewer
                document={activeDocument}
                keyClauses={analysis.keyClauses}
                onSelectClause={openClauseExplainer}
                onResetDocument={() => setShowUploadView(true)}
                selectedClauseId={selectedClause?.id}
              />
            </div>

            {/* Right: AI Analysis (5 Cols) */}
            <div className="lg:col-span-5 h-[580px] sm:h-[640px] lg:h-full min-h-0">
              <AnalysisSidebar
                analysis={analysis}
                onSelectClause={openClauseExplainer}
                onOpenChecklist={() => setShowChecklistModal(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No document selected"
          description="Upload a contract, lease, or agreement to start exploring its contents in plain language."
          actionText="Load Sample Document"
          onAction={loadDemoDocument}
        />
      )}
    </div>
  );
};
