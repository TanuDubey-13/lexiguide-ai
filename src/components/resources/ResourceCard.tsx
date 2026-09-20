import React, { useState } from 'react';
import { LegalResource } from '../../types/legal';
import { Clock, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ResourceCardProps {
  resource: LegalResource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-subtle hover:shadow-card transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div className="p-6 space-y-4">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#C49A3A] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {resource.category}
          </span>
          <span className="text-[#64748B] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {resource.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#102A43] leading-snug">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#64748B] leading-relaxed">
          {resource.description}
        </p>

        {/* Expandable Key Guidance */}
        {expanded && (
          <div className="space-y-4 pt-3 border-t border-[#F1EFE9] animate-in fade-in duration-150">
            {/* Common Pitfalls */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Common Pitfalls
              </h4>
              <ul className="space-y-1.5 text-xs text-[#334E68]">
                {resource.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to look for */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                What to look for in the text
              </h4>
              <ul className="space-y-1.5 text-xs text-[#334E68]">
                {resource.whatToLookFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Footer Toggle Button */}
      <div className="px-6 py-3 bg-[#FAF9F5] border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-[11px] text-[#64748B] font-medium">Educational Guidance</span>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse guide: ${resource.title}` : `Explore guide: ${resource.title}`}
          className="text-xs font-bold text-[#102A43] hover:text-[#C49A3A] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102A43] rounded px-1.5 py-0.5"
        >
          <span>{expanded ? 'Show Less' : 'Explore Guide'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
