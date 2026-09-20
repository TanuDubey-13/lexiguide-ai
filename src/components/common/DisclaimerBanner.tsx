import React, { useState } from 'react';
import { ShieldAlert, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="bg-[#F1EFE9] border-y border-[#E2E8F0] px-4 py-2 text-xs text-[#64748B] flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
          <ShieldAlert className="w-3.5 h-3.5 text-[#C49A3A] flex-shrink-0" />
          <span>
            <strong>Informational Notice:</strong> LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional.
          </span>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Legal Disclaimer" className="bg-[#F3EFE6] border-b border-[#E7E2D6] px-4 py-2.5 text-xs text-[#102A43] relative transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-[#C49A3A]/15 text-[#916F22] flex-shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm font-normal text-[#1B365D]">
            <span className="font-semibold text-[#0B1F33]">Important Notice:</span> LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/about"
            className="inline-flex items-center gap-1 font-medium text-[#C49A3A] hover:text-[#916F22] transition-colors hover:underline text-xs"
          >
            Responsible AI Principles
            <ChevronRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-[#64748B] hover:text-[#102A43] p-1 rounded hover:bg-[#EAE5D9] transition-colors"
            title="Dismiss notice"
            aria-label="Dismiss legal notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
