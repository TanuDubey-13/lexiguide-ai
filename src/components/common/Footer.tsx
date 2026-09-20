import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Scale, ArrowUpRight } from 'lucide-react';
import { DemoModeBadge } from './DemoModeBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full mt-auto bg-[#0B1F33] text-white border-t border-[#1E3A5F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#1B365D] text-white">
                <svg
                  className="w-5 h-5 text-white/90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <div className="absolute -top-1 -right-1 p-0.5 bg-[#C49A3A] rounded-full text-white">
                  <Sparkles className="w-2.5 h-2.5" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight font-sans">
                LexiGuide <span className="text-[#C49A3A]">AI</span>
              </span>
            </div>

            <p className="text-[#C49A3A] font-serif italic text-sm">
              "Legal documents, explained for you."
            </p>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-md">
              Democratizing legal comprehension. Transform dense contracts, agreements, and policies into plain language, spot hidden obligations, compare versions, and prepare with confidence.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <DemoModeBadge compact />
              <span className="text-xs text-[#94A3B8]/80 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-[#C49A3A]" />
                GenAI Hackathon Challenge: Legal Assistance & Access
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C49A3A]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link to="/analyze" className="hover:text-white transition-colors flex items-center gap-1">
                  Document Analysis
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-white transition-colors flex items-center gap-1">
                  Contract Comparison
                </Link>
              </li>
              <li>
                <Link to="/ask" className="hover:text-white transition-colors flex items-center gap-1">
                  Ask Your Document
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors flex items-center gap-1">
                  Legal Guides & Hub
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1">
                  Why LexiGuide & Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C49A3A]">
              Responsible AI
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#C49A3A] mt-0.5 flex-shrink-0" />
                <span>Does not replace professional legal counsel</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#C49A3A] mt-0.5 flex-shrink-0" />
                <span>Source references grounded in document text</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#C49A3A] mt-0.5 flex-shrink-0" />
                <span>User privacy and data sovereignty first</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/about"
                className="text-xs text-[#C49A3A] hover:underline inline-flex items-center gap-1 font-medium"
              >
                Read our Ethical Framework
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#1E3A5F]/70 text-xs text-[#94A3B8] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left max-w-2xl text-[#94A3B8]">
            <p>
              <strong className="text-white">Legal Disclaimer:</strong> LexiGuide AI provides general informational assistance and document summarization. It is not a law firm, does not provide legal advice, and does not create an attorney-client relationship. Always verify critical terms with a licensed attorney.
            </p>
          </div>
          <div className="text-center md:text-right flex-shrink-0">
            <p>© {new Date().getFullYear()} LexiGuide AI. Built for GenAI Legal Access.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
