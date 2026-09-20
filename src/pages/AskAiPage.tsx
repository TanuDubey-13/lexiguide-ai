import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDocument } from '../context/DocumentContext';
import { DocumentQaChat } from '../components/ask/DocumentQaChat';
import { SAMPLE_QA_MESSAGES, SAMPLE_RENTAL_DOCUMENT } from '../data/mockData';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const AskAiPage: React.FC = () => {
  const location = useLocation();
  const { activeDocument } = useDocument();

  // Pick query and autoSubmit from router state if routed from clause drawer or questions tab
  const state = location.state as { prefilledQuery?: string; autoSubmit?: boolean } | undefined;
  const prefilledQuery = state?.prefilledQuery || '';
  const autoSubmit = state?.autoSubmit || false;

  const currentDoc = activeDocument || SAMPLE_RENTAL_DOCUMENT;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Intro Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C49A3A]" />
          <span className="font-bold text-[#102A43]">Document-Grounded AI</span>
          <span className="text-[#CBD5E1] select-none">•</span>
          {currentDoc.backendDocumentId ? (
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Gemini 3.6 Flash Active
            </span>
          ) : (
            <span className="text-[#64748B] font-medium">
              Demo Grounded Mode
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
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
        autoSubmit={autoSubmit}
      />

      {/* Safety & Source References Notice */}
      <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2E8F0] text-xs text-[#64748B] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            Every answer includes <strong>source references from your uploaded document</strong> so you can verify each statement directly in the contract text.
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#64748B]">
          Model: {currentDoc.backendDocumentId ? 'Gemini 3.6 Flash (Live Backend)' : 'LexiGuide Grounded Assistant (Demo)'}
        </span>
      </div>
    </div>
  );
};
