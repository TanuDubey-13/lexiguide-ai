import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  Bookmark,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const GroundedAiShowcase: React.FC = () => {
  const trustPoints = [
    'Relevant document sections are retrieved before answering',
    'Page/source references are shown when available',
    'The system does not guess when the document does not contain enough information',
    'Legal-information disclaimer remains visible',
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F7F5F0] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Factual explanation & Trust points */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE AI WORKFLOW • GEMINI 3.6 FLASH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
              Document-Grounded AI Q&A
            </h2>

            <p className="text-base sm:text-lg text-[#334E68] leading-relaxed font-normal">
              LexiGuide retrieves relevant sections from the uploaded document and uses Google Gemini 3.6 Flash to generate a response grounded in that document context.
            </p>

            <div className="space-y-3 pt-2">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#102A43] font-medium leading-relaxed">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/ask"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white font-semibold text-sm shadow-card hover:shadow-card-hover transition-all"
              >
                <span>Ask AI About Your Document</span>
                <ArrowRight className="w-4 h-4 text-[#C49A3A]" />
              </Link>
              <div className="flex items-center gap-1.5 text-xs text-[#64748B] px-2 py-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Strictly grounded in document context</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Example Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CBD5E1] shadow-card relative overflow-hidden space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#F1EFE9] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#102A43] text-white">
                    <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102A43]">LexiGuide AI</span>
                    <span className="text-[#CBD5E1] select-none text-xs hidden sm:inline">•</span>
                    <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Gemini 3.6 Flash
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#94A3B8]">Grounded Q&A</span>
              </div>

              {/* Question Section */}
              <div className="bg-[#F7F5F0] rounded-xl p-4 border border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Question
                </span>
                <p className="text-sm font-semibold text-[#102A43]">
                  What happens if I terminate the agreement early?
                </p>
              </div>

              {/* Answer Section */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  Answer
                </span>
                <p className="text-sm text-[#102A43] leading-relaxed">
                  According to the uploaded agreement, the tenant must provide 30 days&apos; notice. The agreement also contains a six-month lock-in provision and specifies consequences for early termination under the stated conditions.
                </p>
              </div>

              {/* Source Reference */}
              <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Bookmark className="w-3.5 h-3.5 text-[#C49A3A]" />
                    <span>Document Source References</span>
                  </div>
                  <span className="text-[10px] text-amber-800/80 font-mono">Page Citation</span>
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-amber-300 font-mono text-xs font-semibold text-amber-900 shadow-2xs">
                    <FileText className="w-3 h-3 text-[#C49A3A]" />
                    Page 4 — Termination
                  </span>
                </div>
              </div>

              {/* Fictional Demo Document Notice */}
              <div className="pt-2 border-t border-[#F1EFE9] text-center">
                <p className="text-[11px] text-[#94A3B8] italic">
                  Example using the fictional Residential Rental Agreement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
