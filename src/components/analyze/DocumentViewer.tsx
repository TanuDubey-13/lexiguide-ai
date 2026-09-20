import React, { useState } from 'react';
import {
  FileText,
  Download,
  MessageCircle,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Filter,
} from 'lucide-react';
import { LegalDocument, ClauseHighlight, ClauseCategory } from '../../types/legal';
import { DemoModeBadge } from '../common/DemoModeBadge';
import { useNavigate } from 'react-router-dom';

interface DocumentViewerProps {
  document: LegalDocument;
  keyClauses: ClauseHighlight[];
  onSelectClause: (clause: ClauseHighlight) => void;
  onResetDocument: () => void;
  selectedClauseId?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  keyClauses,
  onSelectClause,
  onResetDocument,
  selectedClauseId,
}) => {
  const navigate = useNavigate();
  const [filterCategory, setFilterCategory] = useState<ClauseCategory | 'all'>('all');
  const [downloadToast, setDownloadToast] = useState(false);

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
  };


  return (
    <div className="flex flex-col h-full min-h-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-card overflow-hidden">
      {/* Top Bar */}
      <div className="flex-shrink-0 bg-[#0B1F33] text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A5F]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#1B365D] text-[#C49A3A]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base tracking-wide text-white font-sans">
                {document.name}
              </h3>
              {document.isDemo && (
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-amber-950">
                  DEMO
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span>{document.type}</span>
              <span>•</span>
              <span>{document.pageCount} pages</span>
              <span>•</span>
              <span>{document.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <DemoModeBadge compact />

          <button
            onClick={handleDownload}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            title="Download document copy"
            aria-label="Download document copy"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/ask')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C49A3A] hover:bg-[#B38928] text-[#0B1F33] text-xs font-bold transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            aria-label="Ask AI about this document"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          <button
            onClick={onResetDocument}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            title="Upload or change document"
            aria-label="Upload or change document"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Download toast */}
      {downloadToast && (
        <div className="flex-shrink-0 bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 flex items-center justify-between animate-in fade-in duration-150">
          <span>Preparing download copy of <strong>{document.name}</strong> with AI clause annotations...</span>
          <span className="text-[11px] font-semibold text-emerald-700">Simulated Download</span>
        </div>
      )}

      {/* Filter Tabs for Highlights */}
      <div className="flex-shrink-0 px-4 py-2.5 bg-[#FAF9F5] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-[#64748B]">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">Filter Highlights:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              filterCategory === 'all'
                ? 'bg-[#102A43] text-white shadow-xs'
                : 'text-[#64748B] hover:bg-[#EAE5D9]'
            }`}
          >
            All ({keyClauses.length})
          </button>
          <button
            onClick={() => setFilterCategory('important')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
              filterCategory === 'important'
                ? 'bg-amber-600 text-white'
                : 'text-[#916F22] hover:bg-amber-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Important ({keyClauses.filter(c => c.category === 'important').length})
          </button>
          <button
            onClick={() => setFilterCategory('obligation')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
              filterCategory === 'obligation'
                ? 'bg-sky-700 text-white'
                : 'text-sky-800 hover:bg-sky-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Obligations ({keyClauses.filter(c => c.category === 'obligation').length})
          </button>
          <button
            onClick={() => setFilterCategory('review')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${
              filterCategory === 'review'
                ? 'bg-rose-700 text-white'
                : 'text-rose-800 hover:bg-rose-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Review ({keyClauses.filter(c => c.category === 'review').length})
          </button>
        </div>
      </div>

      {/* Document Body View (Simulated Paginated Document) */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 space-y-8 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-subtle border border-[#E2E8F0] space-y-6">
          {/* Document Header */}
          <div className="text-center pb-6 border-b border-[#E2E8F0] space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase">
              FICTIONAL DEMO DOCUMENT
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0B1F33]">
              {document.name.replace('.pdf', '').replace(/_/g, ' ')}
            </h2>
            <p className="text-xs text-[#64748B]">
              Fictional Demo Document for Evaluation & Plain-Language Explanation
            </p>
          </div>

          {/* Document Sections & Highlighted Clauses */}
          <div className="space-y-6 font-serif text-[#102A43] text-sm leading-relaxed">
            {document.fullTextSections.map((sec) => {
              const matchedClause = keyClauses.find(c => c.id === sec.clauseId);
              const isSelected = selectedClauseId === sec.clauseId;
              const matchesFilter = !matchedClause || filterCategory === 'all' || matchedClause.category === filterCategory;

              if (!matchesFilter) return null;

              return (
                <div key={sec.sectionNumber} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans font-bold text-[#64748B]">
                    <span>{sec.sectionNumber} — {sec.heading}</span>
                    <span className="text-[10px] text-[#64748B] font-mono">Page {sec.page}</span>
                  </div>

                  {matchedClause ? (
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`Explain clause: ${matchedClause.title}`}
                      aria-haspopup="dialog"
                      onClick={() => onSelectClause(matchedClause)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectClause(matchedClause);
                        }
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C49A3A] ${
                        isSelected
                          ? 'ring-2 ring-[#C49A3A] bg-amber-50/60 border-[#C49A3A] shadow-card'
                          : matchedClause.category === 'important'
                          ? 'bg-amber-50/40 border-amber-200/80 hover:bg-amber-50/80 hover:border-amber-300'
                          : matchedClause.category === 'obligation'
                          ? 'bg-sky-50/40 border-sky-200/80 hover:bg-sky-50/80 hover:border-sky-300'
                          : 'bg-rose-50/40 border-rose-200/80 hover:bg-rose-50/80 hover:border-rose-300'
                      }`}
                    >
                      {/* Badge Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-sans font-bold flex items-center gap-1.5">
                          {matchedClause.category === 'important' && (
                            <>
                              <AlertTriangle className="w-4 h-4 text-[#C49A3A]" />
                              <span className="text-[#916F22]">Important Clause</span>
                            </>
                          )}
                          {matchedClause.category === 'obligation' && (
                            <>
                              <CheckCircle className="w-4 h-4 text-[#1B365D]" />
                              <span className="text-[#1B365D]">Operational Obligation</span>
                            </>
                          )}
                          {matchedClause.category === 'review' && (
                            <>
                              <HelpCircle className="w-4 h-4 text-rose-700" />
                              <span className="text-rose-800">High-Priority Review Item</span>
                            </>
                          )}
                        </span>

                        <span className="text-[10px] font-sans font-semibold text-[#64748B] group-hover:text-[#102A43] group-hover:underline flex items-center gap-1">
                          Click to explain in plain language →
                        </span>
                      </div>

                      {/* Text */}
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="mb-2 last:mb-0 text-[#102A43] text-sm">
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      {sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm text-[#334E68]">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-8 border-t border-[#E2E8F0] text-center text-xs text-[#64748B] font-sans">
            End of Document Preview • {document.fullTextSections.length} Sections Loaded
          </div>
        </div>
      </div>
    </div>
  );
};
