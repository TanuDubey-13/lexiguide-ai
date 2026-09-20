import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';
import { DocumentTypeSelector } from '../common/DocumentTypeSelector';
import { DocumentType } from '../../types/legal';

interface DocumentUploadDropzoneProps {
  onUploadSuccess?: () => void;
}

export const DocumentUploadDropzone: React.FC<DocumentUploadDropzoneProps> = ({ onUploadSuccess }) => {
  const { uploadCustomDocument, loadDemoDocument, documentType, setDocumentType } = useDocument();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await uploadCustomDocument(file.name, documentType);
      if (onUploadSuccess) onUploadSuccess();
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await uploadCustomDocument(file.name, documentType);
      if (onUploadSuccess) onUploadSuccess();
    }
  };

  const handleSampleClick = async () => {
    await loadDemoDocument();
    if (onUploadSuccess) onUploadSuccess();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43]">
          Understand your document
        </h1>
        <p className="text-base text-[#64748B] max-w-xl mx-auto">
          Upload a legal document and explore it in plain language.
        </p>
      </div>

      {/* Document Type Selector */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-2/3">
          <DocumentTypeSelector
            value={documentType}
            onChange={(type: DocumentType) => setDocumentType(type)}
            label="Document Classification"
          />
        </div>
        <div className="w-full sm:w-1/3 flex items-end">
          <button
            onClick={handleSampleClick}
            className="w-full py-2.5 px-3 rounded-lg bg-[#F7F5F0] hover:bg-[#EAE5D9] text-[#102A43] border border-[#CBD5E1] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Try sample rental agreement</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C49A3A]" />
          </button>
        </div>
      </div>

      {/* Large Drag-and-Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? 'border-[#C49A3A] bg-[#C49A3A]/5 scale-[1.01]'
            : 'border-[#CBD5E1] bg-white hover:border-[#102A43] hover:bg-[#FAF9F5]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#102A43]/5 text-[#102A43] flex items-center justify-center border border-[#102A43]/10">
            <UploadCloud className="w-8 h-8 text-[#102A43]" />
          </div>

          <div className="space-y-1">
            <p className="text-base sm:text-lg font-bold text-[#102A43]">
              Drop your document here
            </p>
            <p className="text-sm text-[#64748B]">
              or <span className="text-[#C49A3A] font-semibold underline underline-offset-2">choose a file</span> from your computer
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-[#94A3B8]">
            <span className="px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E2E8F0]">PDF</span>
            <span className="px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E2E8F0]">DOCX</span>
            <span className="px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#E2E8F0]">TXT</span>
            <span>(Max 25 MB)</span>
          </div>
        </div>
      </div>

      {/* Quick sample option */}
      <div className="bg-[#FAF9F5] border border-[#E2E8F0] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#916F22]">
            <FileText className="w-5 h-5 text-[#C49A3A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#102A43]">
                Residential_Rental_Agreement.pdf
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.2 rounded">
                DEMO
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Standard residential tenancy contract with 12 clauses, notice terms, and deposit obligations.
            </p>
          </div>
        </div>

        <button
          onClick={handleSampleClick}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Try with sample document</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C49A3A]" />
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="text-center text-xs text-[#64748B] flex items-center justify-center gap-1.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Files are processed locally in simulated client session for privacy.</span>
      </div>
    </div>
  );
};
