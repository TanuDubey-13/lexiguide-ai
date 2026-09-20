import React from 'react';
import { ComparisonResult } from '../../types/legal';
import { RefreshCw, PlusCircle, MinusCircle, AlertTriangle } from 'lucide-react';

interface DiffSummaryCardsProps {
  result: ComparisonResult;
}

export const DiffSummaryCards: React.FC<DiffSummaryCardsProps> = ({ result }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] font-sans">
            {result.diffCount} meaningful differences found
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Comparing <span className="font-semibold text-[#102A43]">{result.docAName}</span> against{' '}
            <span className="font-semibold text-[#102A43]">{result.docBName}</span>
          </p>
        </div>
        <span className="text-xs bg-amber-50 text-amber-900 border border-amber-300 font-semibold px-3 py-1 rounded-full">
          AI Difference Summary
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Changed */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#916F22]">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#102A43]">{result.changedCount}</div>
            <div className="text-xs font-semibold text-[#64748B]">Changed</div>
          </div>
        </div>

        {/* Added */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#102A43]">{result.addedCount}</div>
            <div className="text-xs font-semibold text-[#64748B]">Added</div>
          </div>
        </div>

        {/* Removed */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <MinusCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#102A43]">{result.removedCount}</div>
            <div className="text-xs font-semibold text-[#64748B]">Removed</div>
          </div>
        </div>

        {/* Review */}
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-700">{result.reviewCount}</div>
            <div className="text-xs font-semibold text-rose-700">Review</div>
          </div>
        </div>
      </div>
    </div>
  );
};
