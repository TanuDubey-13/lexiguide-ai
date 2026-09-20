import React from 'react';
import { Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  Search,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const GroundedWorkflowSection: React.FC = () => {
  const workflowSteps = [
    {
      title: 'Upload Document',
      description: 'PDF or TXT document',
      icon: UploadCloud,
    },
    {
      title: 'Extract & Understand',
      description: 'Page-preserved text & clauses',
      icon: FileText,
    },
    {
      title: 'Retrieve Relevant Clauses',
      description: 'Token & phrase matching',
      icon: Search,
    },
    {
      title: 'Ask a Question',
      description: 'Natural-language query',
      icon: MessageCircle,
    },
    {
      title: 'Gemini 3.6 Flash',
      description: 'Document context grounding',
      icon: Sparkles,
      highlight: true,
    },
    {
      title: 'Grounded Answer + Page Reference',
      description: 'Source citations attached',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F7F5F0] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-2xs mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI WORKFLOW • DOCUMENT-GROUNDED Q&amp;A</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
            From Legal Document to Grounded Answer
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-3 leading-relaxed">
            LexiGuide retrieves relevant clauses from the uploaded document before calling Gemini 3.6 Flash to deliver answers anchored in the contract text.
          </p>
        </div>

        {/* Visual Workflow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 mb-14">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-4 sm:p-5 border shadow-2xs flex flex-col justify-between transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 ${
                  step.highlight
                    ? 'border-[#C49A3A] ring-1 ring-[#C49A3A]/40 bg-amber-50/20'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#64748B]">
                      0{index + 1}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                        step.highlight
                          ? 'bg-[#102A43] text-[#C49A3A] border-[#102A43]'
                          : 'bg-[#F7F5F0] text-[#102A43] border-[#E2E8F0]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-[#102A43] mb-1 font-sans leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[#64748B] leading-normal">
                    {step.description}
                  </p>
                </div>

                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#CBD5E1] text-xs font-bold select-none">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Example Card Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] shadow-card space-y-5">
            {/* Card Top Badge */}
            <div className="flex items-center justify-between border-b border-[#F1EFE9] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#102A43] text-white">
                  <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#102A43]">LexiGuide AI</span>
                  <span className="text-[#CBD5E1] select-none text-xs hidden sm:inline">•</span>
                  <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Gemini 3.6 Flash
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">Grounded Q&amp;A Example</span>
            </div>

            {/* QUESTION */}
            <div className="bg-[#FAF9F5] rounded-xl p-4 border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                QUESTION
              </span>
              <p className="text-sm font-semibold text-[#102A43]">
                What happens if I terminate the agreement early?
              </p>
            </div>

            {/* ANSWER */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                ANSWER
              </span>
              <p className="text-sm text-[#102A43] leading-relaxed">
                According to the uploaded agreement, the tenant must provide 30 days&apos; notice. The agreement also contains a six-month lock-in provision and specifies consequences for early termination under the stated conditions.
              </p>
            </div>

            {/* SOURCE */}
            <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Bookmark className="w-3.5 h-3.5 text-[#C49A3A]" />
                  <span>SOURCE</span>
                </div>
                <span className="text-[10px] text-amber-800/80 font-mono">Document Citation</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-amber-300 font-mono text-xs font-semibold text-amber-900 shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-[#C49A3A]" />
                  Page 4 — Termination
                </span>
              </div>
            </div>

            {/* Card Footer: Label & CTA */}
            <div className="pt-3 border-t border-[#F1EFE9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-[#64748B] italic text-center sm:text-left">
                Example using the fictional Residential Rental Agreement
              </p>
              <Link
                to="/ask"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#102A43] hover:text-[#C49A3A] transition-colors"
              >
                <span>Try Ask AI on your document</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Small Responsible-AI Note */}
          <div className="mt-6 bg-white rounded-2xl p-4 border border-[#E2E8F0] text-center sm:text-left flex flex-col sm:flex-row items-center gap-3 shadow-2xs">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800 flex-shrink-0">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              <strong className="text-[#102A43]">Responsible AI Note:</strong> LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
