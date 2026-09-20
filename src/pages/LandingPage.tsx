import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { ChallengeAlignment } from '../components/landing/ChallengeAlignment';
import { GroundedWorkflowSection } from '../components/landing/GroundedWorkflowSection';
import { InteractivePreview } from '../components/landing/InteractivePreview';
import {
  ArrowRight,
  Sparkles,
  Scale,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  MessageCircle,
  FileText,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDocument } from '../context/DocumentContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadDemoDocument } = useDocument();

  const handleLaunchWorkspace = async () => {
    await loadDemoDocument();
    navigate('/analyze');
  };

  const responsibleAiPillars = [
    {
      title: 'Document-grounded responses',
      description: 'Answers are strictly constrained to retrieved excerpts from the uploaded document.',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Insufficient-information handling',
      description: 'If the document does not contain enough context, the system states so rather than guessing.',
      icon: AlertCircle,
      iconColor: 'text-amber-600',
    },
    {
      title: 'AI rate-limit fallback',
      description: 'If external AI quotas are reached, relevant document excerpts are still provided without errors.',
      icon: RefreshCw,
      iconColor: 'text-sky-600',
    },
    {
      title: 'Qualified legal professional recommended for actual legal matters',
      description: 'Designed to help you understand agreements and prepare clearer questions for licensed attorneys.',
      icon: Scale,
      iconColor: 'text-[#C49A3A]',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* SECTION 1: Built for AI for Legal Assistance & Access (Directly Below Hero) */}
      <ChallengeAlignment />

      {/* SECTION 2: From Legal Document to Grounded Answer (Workflow + Example + Trust Note) */}
      <GroundedWorkflowSection />

      {/* Interactive Document Workspace Preview */}
      <InteractivePreview />

      {/* Responsible AI Guardrails Block */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-subtle space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43]/5 text-[#102A43] text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C49A3A]" />
                <span>Responsible AI Guardrails</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43] font-sans">
                Designed to Inform, Not Replace Legal Professionals
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] mt-3 leading-relaxed">
                LexiGuide AI provides general legal information and document assistance. It is designed to help users understand documents and prepare clearer questions, not to provide formal legal advice.
              </p>
            </div>

            {/* 4 Trust Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {responsibleAiPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-2xs flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-xl bg-[#F7F5F0] border border-[#E2E8F0] flex-shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${pillar.iconColor}`} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#102A43] font-sans">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#E2E8F0]/70">
              <span className="text-xs text-[#64748B]">
                Always consult licensed counsel for contract disputes, execution, or binding legal decisions.
              </span>
              <div className="flex items-center gap-3">
                <Link
                  to="/about"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F1EFE9] text-[#102A43] border border-[#CBD5E1] font-semibold text-xs text-center shadow-subtle transition-all"
                >
                  Our AI Principles
                </Link>
                <button
                  onClick={handleLaunchWorkspace}
                  className="px-4 py-2.5 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Demo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C49A3A]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="py-20 bg-gradient-to-b from-[#FAF9F5] to-[#F7F5F0] text-center border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#102A43] text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-7 h-7 text-[#C49A3A]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#102A43] tracking-tight font-sans">
            Ready to decode your next agreement?
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Upload any contract or use our fictional demo agreement to experience grounded legal clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/analyze"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white font-bold text-base shadow-card hover:shadow-card-hover transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5 text-[#C49A3A]" />
              <span>Analyze a Document</span>
              <ArrowRight className="w-4 h-4 text-white/70" />
            </Link>
            <Link
              to="/ask"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#102A43] border border-[#CBD5E1] font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-subtle hover:border-[#102A43]"
            >
              <MessageCircle className="w-5 h-5 text-[#C49A3A]" />
              <span>Ask AI About Your Document</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
