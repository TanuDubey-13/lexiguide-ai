import React from 'react';
import { X, Sparkles, AlertTriangle, CheckSquare, MessageCircle, ArrowRight } from 'lucide-react';
import { ClauseHighlight } from '../../types/legal';
import { useNavigate } from 'react-router-dom';

interface ClauseDetailDrawerProps {
  clause: ClauseHighlight | null;
  onClose: () => void;
}

export const ClauseDetailDrawer: React.FC<ClauseDetailDrawerProps> = ({ clause, onClose }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!clause) return null;

  const handleAskFollowUp = () => {
    const question = clause.questionsToAsk[0] || `Can you explain more about ${clause.title}?`;
    navigate('/ask', { state: { prefilledQuery: question, autoSubmit: true } });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clause-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#0B1F33]/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl border-l border-[#E2E8F0] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 bg-[#0B1F33] text-white flex items-start justify-between gap-4 border-b border-[#1E3A5F]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-white/10 text-[#C49A3A]">
                  {clause.sectionNumber} • Page {clause.page}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-white/80">
                  {clause.category}
                </span>
              </div>
              <h2 id="clause-drawer-title" className="text-xl font-bold text-white font-sans">{clause.title}</h2>
              <p className="text-xs text-slate-300">Clause Explanation & Plain Language Breakdown</p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close clause details drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <div className="p-6 space-y-6 flex-1 bg-[#FDFBF7]">
            {/* Original Legal Text */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Original Legal Text
              </span>
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E2E8F0] font-serif text-sm text-[#102A43] leading-relaxed italic border-l-4 border-l-[#102A43]">
                "{clause.originalText}"
              </div>
            </div>

            {/* Plain-Language Explanation */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#102A43]">
                  Plain-language explanation
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] text-sm text-[#102A43] leading-relaxed shadow-subtle">
                {clause.plainExplanation}
              </div>
            </div>

            {/* What should you check? */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#102A43]">
                  What should you check?
                </span>
              </div>
              <ul className="space-y-2">
                {clause.checksToMake.map((check, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#334E68] bg-white p-3 rounded-lg border border-[#E2E8F0]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A3A] mt-1.5 flex-shrink-0" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions to ask */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Suggested Questions to Clarify
              </span>
              <div className="space-y-2">
                {clause.questionsToAsk.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#F7F5F0] border border-[#E2E8F0] text-xs text-[#102A43] italic flex items-center justify-between gap-2"
                  >
                    <span>"{q}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Notice */}
            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs text-[#916F22] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#C49A3A] mt-0.5 flex-shrink-0" />
              <div>
                <strong className="font-semibold">Informational note:</strong> If this provision differs from what you verbally agreed, address it in writing before signing.
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-white border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleAskFollowUp}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#C49A3A]" />
              <span>Ask a follow-up question</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
