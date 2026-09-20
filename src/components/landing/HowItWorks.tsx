import React from 'react';
import { UploadCloud, Cpu, BookOpenCheck, CheckSquare2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload',
      description: 'Upload a contract, agreement, policy, or other legal document in PDF, DOCX, or text format.',
      icon: UploadCloud,
    },
    {
      step: '02',
      title: 'Analyze',
      description: 'LexiGuide AI identifies important sections, payment conditions, obligations, and key information.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Understand',
      description: 'Get simple explanations of complex clauses, potential pitfalls, and side-by-side contract comparisons.',
      icon: BookOpenCheck,
    },
    {
      step: '04',
      title: 'Act',
      description: 'Generate actionable checklists, key dates, and tailored questions to discuss with a qualified legal professional.',
      icon: CheckSquare2,
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C49A3A] mb-2">
            The User Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
            How LexiGuide AI works
          </h2>
          <p className="text-base text-[#64748B] mt-3">
            From overwhelming legal jargon to structured, actionable clarity in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-subtle relative flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-extrabold text-[#C49A3A]/80">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E2E8F0] flex items-center justify-center text-[#102A43]">
                      <Icon className="w-5 h-5 text-[#102A43]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#102A43] mb-2 font-sans">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F1EFE9] text-[11px] font-semibold tracking-wider uppercase text-[#94A3B8]">
                  Step {index + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
