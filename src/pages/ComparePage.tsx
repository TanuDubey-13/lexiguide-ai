import React, { useState } from 'react';
import { useDocument } from '../context/DocumentContext';
import { CompareUploader } from '../components/compare/CompareUploader';
import { DiffSummaryCards } from '../components/compare/DiffSummaryCards';
import { ClauseDiffTable } from '../components/compare/ClauseDiffTable';
import { compareDocuments } from '../../src/services/aiService';
import { SAMPLE_RENTAL_DOCUMENT } from '../data/mockData';
import { LegalDocument } from '../types/legal';
import { ArrowLeft, RefreshCw, GitCompare, ShieldAlert } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { comparisonResult, setComparisonResult, loadDemoComparison } = useDocument();
  const [isComparing, setIsComparing] = useState(false);
  const [showUploaderOnly, setShowUploaderOnly] = useState(!comparisonResult);

  const handleRunComparison = async (docAName: string, docBName: string) => {
    setIsComparing(true);
    try {
      const docA: LegalDocument = {
        ...SAMPLE_RENTAL_DOCUMENT,
        name: docAName,
      };
      const docB: LegalDocument = {
        ...SAMPLE_RENTAL_DOCUMENT,
        name: docBName,
      };

      const result = await compareDocuments(docA, docB);
      setComparisonResult(result);
      setShowUploaderOnly(false);
    } catch (err) {
      console.error('Error during comparison:', err);
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* If showing uploader or no result yet */}
      {showUploaderOnly ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {comparisonResult && (
            <button
              onClick={() => setShowUploaderOnly(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#102A43] hover:text-[#C49A3A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to active comparison results</span>
            </button>
          )}
          <CompareUploader
            onCompare={handleRunComparison}
            onLoadSample={loadDemoComparison}
            isComparing={isComparing}
          />
        </div>
      ) : comparisonResult ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#102A43] text-white">
                <GitCompare className="w-4 h-4 text-[#C49A3A]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
                Active Comparison: {comparisonResult.docAName} vs {comparisonResult.docBName}
              </span>
            </div>

            <button
              onClick={() => setShowUploaderOnly(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F7F5F0] hover:bg-[#EAE5D9] text-[#102A43] border border-[#CBD5E1] text-xs font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C49A3A]" />
              <span>New Comparison</span>
            </button>
          </div>

          {/* Diff Summary Cards */}
          <DiffSummaryCards result={comparisonResult} />

          {/* Clause Diff Table */}
          <ClauseDiffTable diffs={comparisonResult.diffs} />

          {/* Bottom Legal Notice */}
          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#C49A3A]" />
              Diff analysis highlights text and semantic modifications. Consult an attorney for jurisdiction-specific interpretations.
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
