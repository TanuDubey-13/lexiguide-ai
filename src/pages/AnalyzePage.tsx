import React, { useState } from 'react';
import { useDocument } from '../context/DocumentContext';
import { DocumentUploadDropzone } from '../components/analyze/DocumentUploadDropzone';
import { DocumentViewer } from '../components/analyze/DocumentViewer';
import { AnalysisSidebar } from '../components/analyze/AnalysisSidebar';
import { ClauseDetailDrawer } from '../components/analyze/ClauseDetailDrawer';
import { LoadingAnalysisModal } from '../components/common/LoadingAnalysisModal';
import { ActionChecklistPanel } from '../components/checklist/ActionChecklistPanel';
import { EmptyState } from '../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';
import { FileUp, ArrowLeft, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
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
              <span className="text-xs text-[#64748B]">•</span>
              <span className="text-xs text-[#102A43] font-semibold">{activeDocument.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowUploadView(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#102A43] text-xs font-semibold hover:bg-[#F1EFE9] transition-all shadow-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102A43]"
              >
                <FileUp className="w-3.5 h-3.5 text-[#C49A3A]" />
                <span>Upload Different Document</span>
              </button>
            </div>
          </div>

          {/* Prominent Ask AI About This Document Discovery Banner */}
          <div className="bg-gradient-to-r from-[#102A43] via-[#163352] to-[#0B1F33] text-white rounded-2xl p-5 sm:p-6 border border-[#102A43] shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="p-1.5 rounded-lg bg-white/10 text-[#C49A3A]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-white font-sans tracking-tight">
                    Ask AI About This Document
                  </h3>
                  {activeDocument.backendDocumentId ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Gemini 3.6 Flash Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/85 border border-white/20">
                      Document-Grounded Q&amp;A
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Ask questions in plain language and get answers grounded in the uploaded document.
                </p>
              </div>

              <button
                onClick={() => navigate('/ask')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C49A3A] hover:bg-[#b08830] text-[#0B1F33] font-bold text-xs sm:text-sm shadow-sm transition-all flex-shrink-0 active:scale-98 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask AI About This Document</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Example Questions */}
            <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider flex-shrink-0">
                Try asking:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  'What happens if I terminate the agreement early?',
                  'What are my payment obligations?',
                  'What does the agreement say about the security deposit?',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate('/ask', { state: { prefilledQuery: q, autoSubmit: true } })}
                    className="text-left text-xs bg-white/10 hover:bg-white/20 hover:border-white/30 text-white px-3.5 py-1.5 rounded-lg border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span className="text-[#C49A3A] font-bold text-[11px]">Q:</span>
                    <span>{q}</span>
                    <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-white ml-0.5" />
                  </button>
                ))}
              </div>
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
