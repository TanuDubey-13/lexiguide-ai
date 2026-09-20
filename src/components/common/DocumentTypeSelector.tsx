import React from 'react';
import { FileText } from 'lucide-react';
import { DocumentType } from '../../types/legal';

interface DocumentTypeSelectorProps {
  value: DocumentType;
  onChange: (type: DocumentType) => void;
  className?: string;
  label?: string;
}

export const DOCUMENT_TYPES: DocumentType[] = [
  'Residential Rental Agreement',
  'Commercial Lease',
  'Non-Disclosure Agreement (NDA)',
  'Employment Contract',
  'Freelance Service Agreement',
  'Terms of Service / Privacy Policy',
  'Other Legal Document',
];

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  value,
  onChange,
  className = '',
  label = 'Document Category',
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#C49A3A]" />
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as DocumentType)}
          className="w-full appearance-none bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#102A43] text-sm rounded-lg px-3.5 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-[#102A43]/15 focus:border-[#102A43] transition-all cursor-pointer font-medium shadow-subtle"
        >
          {DOCUMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#64748B]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
