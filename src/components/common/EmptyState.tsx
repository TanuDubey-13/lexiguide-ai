import React from 'react';
import { FileUp, FileSearch } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No document selected',
  description = 'Upload a document to start exploring its contents.',
  actionText = 'Upload Document',
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-dashed border-[#CBD5E1] max-w-lg mx-auto shadow-subtle my-8">
      <div className="w-14 h-14 rounded-2xl bg-[#F7F5F0] border border-[#E2E8F0] flex items-center justify-center text-[#102A43] mb-4">
        {icon || <FileSearch className="w-7 h-7 text-[#C49A3A]" />}
      </div>
      <h3 className="text-lg font-bold text-[#102A43] mb-1.5">{title}</h3>
      <p className="text-sm text-[#64748B] mb-6 max-w-sm">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          <FileUp className="w-4 h-4 text-[#C49A3A]" />
          {actionText}
        </button>
      )}
    </div>
  );
};
