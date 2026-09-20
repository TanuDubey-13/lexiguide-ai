import React, { useState } from 'react';
import { FileText, ArrowRight, GitCompare, Sparkles, Check } from 'lucide-react';
import { DemoModeBadge } from '../common/DemoModeBadge';
import { DocumentTypeSelector } from '../common/DocumentTypeSelector';
import { DocumentType } from '../../types/legal';

interface CompareUploaderProps {
  onCompare: (docAName: string, docBName: string) => Promise<void>;
  onLoadSample: () => void;
  isComparing: boolean;
}

export const CompareUploader: React.FC<CompareUploaderProps> = ({
  onCompare,
  onLoadSample,
  isComparing,
}) => {
  const [docAName, setDocAName] = useState<string>('Rental_Agreement_V1.pdf');
  const [docBName, setDocBName] = useState<string>('Rental_Agreement_V2.pdf');
  const [docType, setDocType] = useState<DocumentType>('Residential Rental Agreement');
  const [isSampleLoaded, setIsSampleLoaded] = useState<boolean>(true);

  const handleRunComparison = async () => {
    await onCompare(docAName, docBName);
  };

  const handleSampleClick = () => {
    setDocAName('Rental_Agreement_V1.pdf');
    setDocBName('Rental_Agreement_V2.pdf');
    setIsSampleLoaded(true);
    onLoadSample();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 mb-2">
          <DemoModeBadge compact />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43]">
          Compare legal documents
        </h1>
        <p className="text-base text-[#64748B] max-w-xl mx-auto">
          See what changed, what matters, and what deserves a closer look.
        </p>
      </div>

      {/* Preset & Document Category Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-1/2">
          <DocumentTypeSelector
            value={docType}
            onChange={(type) => setDocType(type)}
            label="Comparison Type"
          />
        </div>
        <div className="w-full sm:w-1/2 flex items-end">
          <button
            onClick={handleSampleClick}
            className={`w-full py-2.5 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              isSampleLoaded
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-[#F7F5F0] text-[#102A43] border-[#CBD5E1] hover:bg-[#EAE5D9]'
            }`}
          >
            {isSampleLoaded ? <Check className="w-4 h-4 text-emerald-600" /> : <Sparkles className="w-4 h-4 text-[#C49A3A]" />}
            <span>Try sample comparison (V1 vs V2)</span>
          </button>
        </div>
      </div>

      {/* Two Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document A */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-subtle flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Document A (Baseline)
            </span>
            <span className="text-[10px] bg-[#F1EFE9] text-[#102A43] px-2 py-0.5 rounded font-mono">
              Original Version
            </span>
          </div>

          <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center bg-[#FAF9F5] space-y-2">
            <FileText className="w-8 h-8 text-[#102A43] mx-auto opacity-70" />
            <div className="font-semibold text-sm text-[#102A43] truncate">{docAName}</div>
            <p className="text-xs text-[#64748B]">
              {isSampleLoaded ? 'Demo: Standard 11-month tenancy agreement' : 'Upload first document'}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
            <span>Formats: PDF, DOCX</span>
            <label className="text-[#102A43] font-semibold hover:underline cursor-pointer">
              Change file
              <input
                type="file"
                aria-label="Upload Document A file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setDocAName(e.target.files[0].name);
                    setIsSampleLoaded(false);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Document B */}
        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-subtle flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Document B (Revised)
            </span>
            <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-mono">
              New Version
            </span>
          </div>

          <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 text-center bg-[#FAF9F5] space-y-2">
            <FileText className="w-8 h-8 text-[#C49A3A] mx-auto" />
            <div className="font-semibold text-sm text-[#102A43] truncate">{docBName}</div>
            <p className="text-xs text-[#64748B]">
              {isSampleLoaded ? 'Demo: Modified terms with revised deposits & notice' : 'Upload second document'}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
            <span>Formats: PDF, DOCX</span>
            <label className="text-[#102A43] font-semibold hover:underline cursor-pointer">
              Change file
              <input
                type="file"
                aria-label="Upload Document B file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setDocBName(e.target.files[0].name);
                    setIsSampleLoaded(false);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Compare Button */}
      <div className="text-center pt-2">
        <button
          onClick={handleRunComparison}
          disabled={isComparing}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-base font-semibold shadow-card hover:shadow-card-hover transition-all duration-200 active:scale-98 disabled:opacity-75 cursor-pointer"
        >
          {isComparing ? (
            <>
              <GitCompare className="w-5 h-5 text-[#C49A3A] animate-spin" />
              <span>Analyzing Differences...</span>
            </>
          ) : (
            <>
              <GitCompare className="w-5 h-5 text-[#C49A3A]" />
              <span>Compare with AI</span>
              <ArrowRight className="w-4 h-4 text-white/70" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
