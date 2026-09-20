import React from 'react';
import {
  UploadCloud,
  FileText,
  Search,
  MessageCircle,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload',
      description: 'Upload a PDF or TXT document.',
      icon: UploadCloud,
    },
    {
      step: '02',
      title: 'Understand',
      description: 'Extract and organize relevant legal content.',
      icon: FileText,
    },
    {
      step: '03',
      title: 'Retrieve',
      description: 'Find the document sections relevant to your question.',
      icon: Search,
    },
    {
      step: '04',
      title: 'Ask',
      description: 'Ask questions in natural language.',
      icon: MessageCircle,
    },
    {
      step: '05',
      title: 'Grounded Answer',
      description: 'Gemini generates an answer using retrieved document context and page references.',
      icon: Sparkles,
      highlight: true,
    },
    {
      step: '06',
      title: 'Prepare',
      description: 'Use the output to prepare clearer questions for a qualified legal professional.',
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F7F5F0] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C49A3A] mb-2 font-mono">
            Structured Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
            From Legal Document to Clearer Questions
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-3 leading-relaxed">
            A transparent, step-by-step process designed to help you understand your agreement before consulting a legal professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className={`bg-white rounded-2xl p-6 sm:p-7 border shadow-subtle relative flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all duration-200 ${
                  item.highlight
                    ? 'border-[#C49A3A]/60 ring-1 ring-[#C49A3A]/30'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-[#C49A3A]/80">
                      {item.step}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                        item.highlight
                          ? 'bg-[#102A43] text-[#C49A3A] border-[#102A43]'
                          : 'bg-[#F7F5F0] text-[#102A43] border-[#E2E8F0]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#102A43] mb-2 font-sans flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.highlight && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Live AI
                      </span>
                    )}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F1EFE9] flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-[#64748B]">
                  <span>Step {index + 1} of 6</span>
                  {index < steps.length - 1 && (
                    <span className="text-[#C49A3A] select-none font-mono">↓ Next</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
