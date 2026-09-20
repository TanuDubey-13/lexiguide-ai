import React, { useState } from 'react';
import { ComparisonDiff } from '../../types/legal';
import { ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';

interface ClauseDiffTableProps {
  diffs: ComparisonDiff[];
}

export const ClauseDiffTable: React.FC<ClauseDiffTableProps> = ({ diffs }) => {
  const [expandedId, setExpandedId] = useState<string | null>(diffs[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeStyle = (type: ComparisonDiff['changeType']) => {
    switch (type) {
      case 'changed':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'review':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'added':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'removed':
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-card overflow-hidden">
      <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#E2E8F0] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#102A43]">Detailed Clause Differences</h3>
          <p className="text-xs text-[#64748B]">Click any row to reveal plain-language implications & points to discuss with a legal professional</p>
        </div>
        <span className="text-xs text-[#64748B] hidden sm:inline">
          {diffs.length} Clauses Modified
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F1EFE9]/70 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4 sm:px-6">Clause</th>
              <th className="py-3 px-4">Document A (V1)</th>
              <th className="py-3 px-4">Document B (V2)</th>
              <th className="py-3 px-4">Change Type</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] text-sm">
            {diffs.map((diff) => {
              const isExpanded = expandedId === diff.id;
              return (
                <React.Fragment key={diff.id}>
                  <tr
                    onClick={() => toggleExpand(diff.id)}
                    className={`hover:bg-[#FAF9F5] cursor-pointer transition-colors ${
                      isExpanded ? 'bg-[#FAF9F5]' : ''
                    }`}
                  >
                    <td className="py-4 px-4 sm:px-6 font-bold text-[#102A43]">
                      <div className="flex items-center gap-2">
                        {diff.severity === 'high' && (
                          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        )}
                        <span>{diff.clauseTitle}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-[#64748B] font-mono text-xs">
                      <span className="bg-[#F1EFE9] px-2 py-1 rounded">
                        {diff.docAValue}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs font-semibold text-[#102A43]">
                      <span className="bg-amber-50/90 text-amber-900 border border-amber-200 px-2 py-1 rounded">
                        {diff.docBValue}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
                          diff.changeType
                        )}`}
                      >
                        {diff.changeType.charAt(0).toUpperCase() + diff.changeType.slice(1)}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(diff.id);
                        }}
                        className="p-1 rounded-md text-[#64748B] hover:text-[#102A43] hover:bg-[#EAE5D9] transition-colors"
                        aria-label="Toggle clause analysis"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>

                  {/* Expandable "Why this matters" section */}
                  {isExpanded && (
                    <tr className="bg-[#FAF9F5]/80">
                      <td colSpan={5} className="py-4 px-6 border-b border-[#E2E8F0]">
                        <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-subtle space-y-3">
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-[#C49A3A]" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
                              Why this matters
                            </h4>
                          </div>

                          <p className="text-sm text-[#102A43] leading-relaxed">
                            {diff.whyItMatters}
                          </p>

                          {diff.actionRequired && (
                            <div className="pt-2 border-t border-[#F1EFE9] flex items-start gap-2 text-xs text-[#1B365D]">
                              <strong className="font-semibold text-[#102A43] flex-shrink-0">
                                Points to discuss with a legal professional:
                              </strong>
                              <span>{diff.actionRequired}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
