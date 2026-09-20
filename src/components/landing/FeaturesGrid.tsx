import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  GitCompare,
  MessageCircle,
  AlertTriangle,
  Compass,
  ClipboardList,
  ArrowUpRight,
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      id: 'simplify',
      title: 'Simplify',
      description: 'Turn complex legal language into plain, understandable explanations.',
      icon: Sparkles,
      iconColor: 'text-[#C49A3A]',
      iconBg: 'bg-[#C49A3A]/10',
      link: '/analyze',
      badge: 'Plain Language'
    },
    {
      id: 'compare',
      title: 'Compare',
      description: 'Find meaningful differences between contracts, agreements, and policies.',
      icon: GitCompare,
      iconColor: 'text-[#102A43]',
      iconBg: 'bg-[#102A43]/10',
      link: '/compare',
      badge: 'Diff Engine'
    },
    {
      id: 'ask-ai',
      title: 'Ask AI',
      description: 'Ask questions about a document and get answers grounded in its content.',
      icon: MessageCircle,
      iconColor: 'text-sky-700',
      iconBg: 'bg-sky-50',
      link: '/ask',
      badge: 'Document Q&A'
    },
    {
      id: 'spot-clauses',
      title: 'Spot Important Clauses',
      description: 'Identify obligations, risks, unusual terms, and clauses worth reviewing.',
      icon: AlertTriangle,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50',
      link: '/analyze',
      badge: 'Risk Detection'
    },
    {
      id: 'understand-options',
      title: 'Understand Your Options',
      description: 'Turn document insights into practical questions and next steps.',
      icon: Compass,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50',
      link: '/resources',
      badge: 'Actionable Insights'
    },
    {
      id: 'prepare-lawyer',
      title: 'Prepare for a Lawyer',
      description: 'Generate a checklist of information and questions to discuss with a legal professional.',
      icon: ClipboardList,
      iconColor: 'text-indigo-700',
      iconBg: 'bg-indigo-50',
      link: '/analyze',
      badge: 'Lawyer Prep'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F1EFE9]/60 border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans mb-4">
            Everything you need to understand your documents.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Legal contracts shouldn't require a law degree to decipher. LexiGuide AI organizes, translates, and prepares document knowledge for every citizen and business owner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.id}
                to={feature.link}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-subtle hover:shadow-card-hover hover:border-[#CBD5E1] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.iconBg} ${feature.iconColor} transition-transform group-hover:scale-110 duration-200`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#64748B] bg-[#F7F5F0] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#C49A3A] transition-colors mb-2 flex items-center gap-1.5">
                    {feature.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C49A3A]" />
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1EFE9] flex items-center text-xs font-semibold text-[#102A43] group-hover:text-[#C49A3A] transition-colors">
                  <span>Explore capability</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
