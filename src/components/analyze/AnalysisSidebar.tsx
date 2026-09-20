import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  ClipboardList,
  MessageCircle,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { DocumentAnalysis, ClauseHighlight } from '../../types/legal';
import { useNavigate } from 'react-router-dom';

interface AnalysisSidebarProps {
  analysis: DocumentAnalysis;
  onSelectClause: (clause: ClauseHighlight) => void;
  onOpenChecklist: () => void;
}

export const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
  analysis,
  onSelectClause,
  onOpenChecklist,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'clauses' | 'review' | 'obligations' | 'questions'>('clauses');

  const handleAskQuestion = (question: string) => {
    navigate('/ask', { state: { prefilledQuery: question } });
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-[#FAF9F5] px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#102A43] text-[#C49A3A]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#102A43]">AI Analysis</h3>
            <p className="text-xs text-[#64748B]">Automated document intelligence</p>
          </div>
        </div>

        <button
          onClick={onOpenChecklist}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#102A43] hover:bg-[#0B1F33] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <ClipboardList className="w-3.5 h-3.5 text-[#C49A3A]" />
          <span>Action Checklist</span>
        </button>
      </div>

      {/* Overview Card */}
      <div className="flex-shrink-0 p-5 border-b border-[#E2E8F0] space-y-3 bg-[#FDFBF7]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#64748B]">Document Overview</span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
            Plain English
          </span>
        </div>
        <p className="text-sm text-[#102A43] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-subtle">
          {analysis.overview}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
            <span className="text-xl font-bold text-[#102A43]">{analysis.clausesCount}</span>
            <p className="text-[11px] text-[#64748B] font-medium">Clauses</p>
          </div>
          <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200">
            <span className="text-xl font-bold text-[#916F22]">{analysis.importantCount}</span>
            <p className="text-[11px] text-[#916F22] font-medium">Important</p>
          </div>
          <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-200">
            <span className="text-xl font-bold text-rose-700">{analysis.reviewCount}</span>
            <p className="text-[11px] text-rose-700 font-medium">Review Items</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex border-b border-[#E2E8F0] bg-[#FAF9F5] text-xs font-medium px-2 pt-2">
        <button
          onClick={() => setActiveTab('clauses')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'clauses'
              ? 'border-[#102A43] text-[#102A43] font-bold'
              : 'border-transparent text-[#64748B] hover:text-[#102A43]'
          }`}
        >
          Key Clauses ({analysis.keyClauses.length})
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'review'
              ? 'border-[#102A43] text-[#102A43] font-bold'
              : 'border-transparent text-[#64748B] hover:text-[#102A43]'
          }`}
        >
          Things to Review ({analysis.thingsToReview.length})
        </button>
        <button
          onClick={() => setActiveTab('obligations')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'obligations'
              ? 'border-[#102A43] text-[#102A43] font-bold'
              : 'border-transparent text-[#64748B] hover:text-[#102A43]'
          }`}
        >
          Obligations ({analysis.obligations.length})
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            activeTab === 'questions'
              ? 'border-[#102A43] text-[#102A43] font-bold'
              : 'border-transparent text-[#64748B] hover:text-[#102A43]'
          }`}
        >
          Questions
        </button>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
        {/* Tab 1: Key Clauses */}
        {activeTab === 'clauses' && (
          <div className="space-y-3">
            <p className="text-xs text-[#64748B]">
              Click any clause to inspect its plain-language translation and legal check criteria:
            </p>
            {analysis.keyClauses.map((clause) => (
              <div
                key={clause.id}
                onClick={() => onSelectClause(clause)}
                className="p-3.5 rounded-xl border border-[#E2E8F0] hover:border-[#CBD5E1] bg-white hover:bg-[#FAF9F5] cursor-pointer transition-all duration-150 group shadow-subtle flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#102A43] group-hover:text-[#C49A3A] transition-colors">
                      {clause.title}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-mono">{clause.sectionNumber}</span>
                  </div>
                  <p className="text-xs text-[#64748B] line-clamp-2">
                    {clause.plainExplanation}
                  </p>
                </div>
                <div className="p-1 rounded-md text-[#94A3B8] group-hover:text-[#102A43] group-hover:bg-[#EAE5D9] transition-colors mt-1">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Things to Review */}
        {activeTab === 'review' && (
          <div className="space-y-3">
            <p className="text-xs text-[#64748B]">
              Provisions flagged for caution, unusual obligations, or risk of financial penalty:
            </p>
            {analysis.thingsToReview.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    {item.title}
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                    {item.severity} Risk
                  </span>
                </div>
                <p className="text-xs text-rose-950/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Your Obligations */}
        {activeTab === 'obligations' && (
          <div className="space-y-3">
            <p className="text-xs text-[#64748B]">
              Contractual duties categorized by responsible actor:
            </p>
            {analysis.obligations.map((ob) => (
              <div
                key={ob.id}
                className="p-3.5 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5 shadow-subtle"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#102A43] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#1B365D]" />
                    {ob.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F1EFE9] text-[#102A43]">
                    {ob.actor}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {ob.description}
                </p>
                {ob.timeframe && (
                  <div className="text-[11px] font-medium text-[#C49A3A]">
                    Due: {ob.timeframe}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Potential Questions */}
        {activeTab === 'questions' && (
          <div className="space-y-3">
            <p className="text-xs text-[#64748B]">
              Recommended questions to ask your counterparty or legal advisor:
            </p>
            {analysis.potentialQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#102A43] transition-all flex items-center justify-between gap-2 group"
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C49A3A] mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-medium text-[#102A43] group-hover:text-[#C49A3A] transition-colors">
                    {q}
                  </span>
                </div>
                <button
                  onClick={() => handleAskQuestion(q)}
                  className="px-2 py-1 rounded bg-[#F1EFE9] hover:bg-[#102A43] hover:text-white text-[#102A43] text-[11px] font-semibold transition-colors flex items-center gap-1 flex-shrink-0"
                  title="Ask this question in Ask AI"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Ask AI</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Notice at Bottom */}
      <div className="flex-shrink-0 p-3 bg-[#FAF9F5] border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Grounded in document clauses. Review with qualified legal counsel.</span>
      </div>
    </div>
  );
};
