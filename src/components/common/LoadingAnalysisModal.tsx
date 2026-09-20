import React from 'react';
import { CheckCircle2, Loader2, Circle, Sparkles } from 'lucide-react';
import { ANALYSIS_STEPS } from '../../services/aiService';

interface LoadingAnalysisModalProps {
  isOpen: boolean;
  currentStep: number;
  documentName?: string;
}

export const LoadingAnalysisModal: React.FC<LoadingAnalysisModalProps> = ({
  isOpen,
  currentStep,
  documentName = 'Document',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F33]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-modal border border-[#E2E8F0] p-6 sm:p-8 max-w-md w-full relative overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#102A43] via-[#C49A3A] to-[#102A43] animate-pulse" />

        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#102A43]/5 text-[#102A43] mb-1">
            <Sparkles className="w-6 h-6 text-[#C49A3A] animate-spin-slow" />
          </div>
          <h3 className="text-xl font-bold text-[#102A43]">Analyzing your document...</h3>
          <p className="text-xs sm:text-sm text-[#64748B] truncate max-w-xs mx-auto">
            Processing <span className="font-medium text-[#102A43]">{documentName}</span>
          </p>
        </div>

        {/* Sequential Step indicators */}
        <div className="space-y-3.5 bg-[#F7F5F0] rounded-xl p-4 border border-[#E2E8F0]/70">
          {ANALYSIS_STEPS.map((stepLabel, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={stepLabel}
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'text-[#102A43] font-medium'
                    : isCurrent
                    ? 'text-[#102A43] font-semibold scale-[1.01]'
                    : 'text-[#94A3B8]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#C49A3A] animate-spin flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-[#CBD5E1] flex-shrink-0" />
                )}
                <span>{stepLabel}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#64748B]">
            Applying plain-language translation & legal safety guardrails...
          </p>
        </div>
      </div>
    </div>
  );
};
