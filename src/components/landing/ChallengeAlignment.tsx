import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  AlertTriangle,
  MessageCircle,
  GitCompare,
  ClipboardList,
  ArrowUpRight,
  Scale,
} from 'lucide-react';

export const ChallengeAlignment: React.FC = () => {
  const cards = [
    {
      id: 'understand-language',
      title: 'Understand Legal Language',
      description: 'Plain-language explanations of complex clauses.',
      icon: BookOpen,
      iconColor: 'text-[#C49A3A]',
      iconBg: 'bg-[#C49A3A]/10',
      link: '/analyze',
      badge: 'Plain Language',
    },
    {
      id: 'identify-clauses',
      title: 'Identify Important Clauses',
      description: 'Surface obligations, payments, deadlines, and termination terms.',
      icon: AlertTriangle,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50',
      link: '/analyze',
      badge: 'Clause Discovery',
    },
    {
      id: 'ask-document',
      title: 'Ask Your Document',
      description: 'Ask natural-language questions about uploaded documents.',
      icon: MessageCircle,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50',
      link: '/ask',
      badge: 'Grounded Q&A',
    },
    {
      id: 'compare-documents',
      title: 'Compare Documents',
      description: 'Understand meaningful differences between document versions.',
      icon: GitCompare,
      iconColor: 'text-sky-700',
      iconBg: 'bg-sky-50',
      link: '/compare',
      badge: 'Version Diff',
    },
    {
      id: 'prepare-legal-help',
      title: 'Prepare for Legal Help',
      description: 'Organize questions and discussion points for a qualified legal professional.',
      icon: ClipboardList,
      iconColor: 'text-indigo-700',
      iconBg: 'bg-indigo-50',
      link: '/analyze',
      badge: 'Consultation Prep',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102A43]/5 text-[#102A43] text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-[#C49A3A]" />
            <span>Hackathon Challenge • AI for Legal Assistance & Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
            Built for AI for Legal Assistance &amp; Access
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mt-3 leading-relaxed">
            LexiGuide AI helps people understand complex legal documents, identify important obligations, ask document-grounded questions, and prepare clearer questions for qualified legal professionals.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.slice(0, 3).map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.link}
                className="group relative bg-[#FAF9F5] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-subtle hover:shadow-card-hover hover:border-[#CBD5E1] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor} transition-transform group-hover:scale-105 duration-200`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#64748B] bg-white px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#C49A3A] transition-colors mb-2 flex items-center gap-1.5 font-sans">
                    {card.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C49A3A]" />
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0]/70 flex items-center text-xs font-semibold text-[#102A43] group-hover:text-[#C49A3A] transition-colors">
                  <span>Explore feature</span>
                  <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Row 2: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {cards.slice(3).map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.link}
                className="group relative bg-[#FAF9F5] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-subtle hover:shadow-card-hover hover:border-[#CBD5E1] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor} transition-transform group-hover:scale-105 duration-200`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#64748B] bg-white px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#102A43] group-hover:text-[#C49A3A] transition-colors mb-2 flex items-center gap-1.5 font-sans">
                    {card.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C49A3A]" />
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0]/70 flex items-center text-xs font-semibold text-[#102A43] group-hover:text-[#C49A3A] transition-colors">
                  <span>Explore feature</span>
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
