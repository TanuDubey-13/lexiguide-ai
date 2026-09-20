import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface DemoModeBadgeProps {
  compact?: boolean;
}

export const DemoModeBadge: React.FC<DemoModeBadgeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 shadow-sm" title="Running in simulated mode with high-fidelity mock legal data">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        DEMO MODE
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-50/90 text-amber-950 border border-amber-300/80 shadow-subtle backdrop-blur-sm" title="This frontend demonstration uses realistic simulated legal analysis without active backend API keys.">
      <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
      <span className="font-semibold tracking-wide">DEMO MODE</span>
      <span className="text-amber-800/80 hidden sm:inline">• Simulated AI with demo legal data</span>
      <span className="ml-0.5 cursor-help text-amber-700">
        <Info className="w-3 h-3" />
      </span>
    </div>
  );
};
