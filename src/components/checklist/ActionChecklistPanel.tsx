import React, { useState } from 'react';
import {
  CheckSquare2,
  Square,
  Sparkles,
  ClipboardCopy,
  Check,
  HelpCircle,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { ChecklistItem, LawyerQuestion } from '../../types/legal';
import { INITIAL_CHECKLIST_ITEMS, SAMPLE_LAWYER_QUESTIONS } from '../../data/mockData';
import { generateChecklist, generateLawyerQuestions } from '../../services/aiService';

interface ActionChecklistPanelProps {
  documentName?: string;
  onClose?: () => void;
}

export const ActionChecklistPanel: React.FC<ActionChecklistPanelProps> = ({
  documentName = 'Residential_Rental_Agreement.pdf',
  onClose,
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_CHECKLIST_ITEMS);
  const [lawyerQuestions, setLawyerQuestions] = useState<LawyerQuestion[]>(SAMPLE_LAWYER_QUESTIONS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [customItemText, setCustomItemText] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleGenerateChecklist = async () => {
    setIsGenerating(true);
    try {
      const refreshed = await generateChecklist('doc-active');
      const refreshedQuestions = await generateLawyerQuestions('doc-active');
      setItems(refreshed);
      setLawyerQuestions(refreshedQuestions);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyQuestions = () => {
    const text = lawyerQuestions
      .map((q, idx) => `${idx + 1}. ${q.question}\n   Context: ${q.context}`)
      .join('\n\n');

    navigator.clipboard.writeText(
      `LEXIGUIDE AI — QUESTIONS FOR LEGAL COUNSEL\nDocument: ${documentName}\n\n${text}`
    );
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2500);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: customItemText.trim(),
      category: 'Clarification',
      completed: false,
    };
    setItems((prev) => [...prev, newItem]);
    setCustomItemText('');
    setShowAddCustom(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-card overflow-hidden space-y-6">
      {/* Top Header */}
      <div className="bg-[#0B1F33] text-white p-6 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare2 className="w-5 h-5 text-[#C49A3A]" />
            <h2 className="text-xl font-bold font-sans">Your document checklist</h2>
          </div>
          <p className="text-xs text-slate-300">
            Action items and lawyer preparation tailored for <span className="text-white font-medium">{documentName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateChecklist}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C49A3A] hover:bg-[#B38928] text-[#0B1F33] text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Regenerating...' : 'Generate checklist'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Progress bar */}
        <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2E8F0] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#102A43]">
              Completion Progress: {completedCount} of {items.length} tasks done
            </span>
            <span className="font-bold text-[#C49A3A]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#102A43] to-[#C49A3A] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checklist Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43]">
              Essential Next Steps & Obligations
            </h3>
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="text-xs text-[#102A43] hover:text-[#C49A3A] font-semibold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add custom task</span>
            </button>
          </div>

          {showAddCustom && (
            <form onSubmit={handleAddCustomItem} className="flex gap-2 p-3 bg-[#FAF9F5] rounded-xl border border-[#CBD5E1]">
              <input
                type="text"
                value={customItemText}
                onChange={(e) => setCustomItemText(e.target.value)}
                placeholder="Enter personal task or follow-up note..."
                className="flex-1 px-3 py-1.5 text-xs bg-white rounded-lg border border-[#CBD5E1] focus:outline-none focus:ring-1 focus:ring-[#102A43]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#102A43] text-white text-xs font-semibold rounded-lg hover:bg-[#0B1F33]"
              >
                Add
              </button>
            </form>
          )}

          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.id}
                role="checkbox"
                tabIndex={0}
                aria-checked={item.completed}
                aria-label={`Checklist item: ${item.text}`}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102A43] ${
                  item.completed
                    ? 'bg-[#FAF9F5] border-[#E2E8F0] text-[#64748B]'
                    : 'bg-white border-[#CBD5E1] hover:border-[#102A43] shadow-subtle'
                }`}
              >
                <div
                  className="mt-0.5 text-[#102A43] flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.completed ? (
                    <CheckSquare2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-[#64748B]" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        item.completed ? 'line-through text-[#64748B]' : 'text-[#102A43]'
                      }`}
                    >
                      {item.text}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#F1EFE9] text-[#64748B]">
                      {item.category}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-[#64748B]">{item.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lawyer Preparation Questions Section */}
        <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C49A3A]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#102A43]">
                  Prepare questions for a legal professional
                </h3>
              </div>
              <p className="text-xs text-[#64748B]">
                Take these targeted questions to your attorney or legal clinic consultation.
              </p>
            </div>

            <button
              onClick={handleCopyQuestions}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F5F0] hover:bg-[#EAE5D9] text-[#102A43] border border-[#CBD5E1] text-xs font-semibold transition-all shadow-subtle flex-shrink-0"
            >
              {copiedQuestions ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <ClipboardCopy className="w-3.5 h-3.5 text-[#C49A3A]" />
                  <span>Copy Questions</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lawyerQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2E8F0] space-y-2 flex flex-col justify-between hover:border-[#CBD5E1] transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#C49A3A]">
                      Question 0{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#64748B]">
                      {q.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#102A43]">
                    "{q.question}"
                  </h4>
                </div>

                <p className="text-xs text-[#64748B] italic pt-2 border-t border-[#E2E8F0]/70">
                  Basis in Document: {q.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical disclaimer reminder */}
        <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="font-semibold">Counsel Preparation Reminder:</strong> While LexiGuide AI helps structure key points and obligations, only a licensed attorney in your jurisdiction can offer binding legal counsel on specific remedies.
          </div>
        </div>
      </div>
    </div>
  );
};
