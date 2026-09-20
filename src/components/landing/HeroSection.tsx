import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, FileText, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { loadDemoDocument } = useDocument();

  const handleTryDemo = async () => {
    await loadDemoDocument();
    navigate('/analyze');
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#C49A3A]/10 to-[#102A43]/5 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-subtle mb-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <Sparkles className="w-4 h-4 text-[#C49A3A]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#102A43]">
            AI-POWERED LEGAL ASSISTANCE
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#102A43] font-sans leading-[1.1] mb-6">
          Legal documents, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#102A43] via-[#1B365D] to-[#C49A3A]">
            explained for you.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl text-[#64748B] max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          Understand complex legal language, identify important obligations, compare documents, and ask grounded questions about your document with AI assistance.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-8">
          <Link
            to="/analyze"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white font-semibold text-base shadow-card hover:shadow-card-hover transition-all duration-200 active:scale-98"
          >
            <FileText className="w-5 h-5 text-[#C49A3A]" />
            <span>Analyze a Document</span>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </Link>

          <Link
            to="/ask"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F1EFE9] text-[#102A43] border border-[#CBD5E1] font-semibold text-base shadow-subtle hover:border-[#102A43] transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-[#C49A3A]" />
            <span>Ask AI About Your Document</span>
          </Link>
        </div>

        {/* Quick Demo button */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <span>Want an immediate walkthrough?</span>
          <button
            onClick={handleTryDemo}
            className="font-semibold text-[#102A43] hover:text-[#C49A3A] underline underline-offset-4 decoration-[#C49A3A] transition-colors inline-flex items-center gap-1"
          >
            Launch with Sample Residential Agreement (Demo)
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Subtle trust badge */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0]/70 flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Informational workspace — Not professional legal advice</span>
        </div>
      </div>
    </section>
  );
};
