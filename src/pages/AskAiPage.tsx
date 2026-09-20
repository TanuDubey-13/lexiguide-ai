import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDocument } from '../context/DocumentContext';
import { DocumentQaChat } from '../components/ask/DocumentQaChat';
import { SAMPLE_QA_MESSAGES, SAMPLE_RENTAL_DOCUMENT } from '../data/mockData';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const AskAiPage: React.FC = () => {
  const location = useLocation();
  const { activeDocument } = useDocument();

  // Pick query from router state if routed from clause drawer or questions tab
  const prefilledQuery = (location.state as { prefilledQuery?: string })?.prefilledQuery || '';

  const currentDoc = activeDocument || SAMPLE_RENTAL_DOCUMENT;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Intro Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-900 border border-sky-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>DOCUMENT GROUNDED QUESTION & ANSWER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43]">
          Ask your documents
        </h1>
        <p className="text-sm sm:text-base text-[#64748B]">
          Inquire directly about obligations, rights, deadlines, and exceptions grounded strictly in the text of your agreement.
        </p>
      </div>

      {/* Main Q&A Chat Container */}
      <DocumentQaChat
        document={currentDoc}
        initialMessages={SAMPLE_QA_MESSAGES}
        prefilledQuery={prefilledQuery}
      />

      {/* Safety & Source References Notice */}
      <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2E8F0] text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Every answer includes <strong>source references from the uploaded demo document</strong> so you can verify each statement directly in the contract text.
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#94A3B8]">
          Model: LexiGuide Grounded Assistant (Demo)
        </span>
      </div>
    </div>
  );
};
