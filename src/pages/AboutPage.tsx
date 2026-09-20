import React from 'react';
import {
  Scale,
  Eye,
  CheckCircle2,
  Lock,
  Users,
  Compass,
  FileCheck,
} from 'lucide-react';
import { DemoModeBadge } from '../components/common/DemoModeBadge';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'Accessibility',
      icon: Users,
      description: 'Demystifying intimidating legal language so anyone can understand contracts before committing their money or rights.',
    },
    {
      title: 'Clarity',
      icon: Eye,
      description: 'Translating dense boilerplate into plain English, highlighting direct obligations, financial fees, and critical deadlines.',
    },
    {
      title: 'Responsible AI',
      icon: Scale,
      description: 'Grounding every generated explanation strictly in document text, preventing AI hallucinations and avoiding unwarranted legal assertions.',
    },
    {
      title: 'User Control',
      icon: Lock,
      description: 'Equipping individuals with targeted questions and checklists to consult attorneys efficiently, preserving human agency.',
    },
  ];

  const ethicalPrinciples = [
    {
      title: 'Does not replace a lawyer',
      description: 'LexiGuide AI is an informational workspace. It does not provide legal representation, legal advice, or attorney-client relationships.',
    },
    {
      title: 'Does not make legal decisions for users',
      description: 'The platform highlights facts and clauses so you can make educated choices, without recommending risky unilateral actions.',
    },
    {
      title: 'Should not fabricate legal information',
      description: 'All answers feature source references pointing back to exact clauses and sections within the uploaded document.',
    },
    {
      title: 'Encourages users to verify important information',
      description: 'Users are consistently prompted to check ambiguous provisions, penalty thresholds, and local statutory rights with professionals.',
    },
    {
      title: 'Helps users prepare questions for professionals',
      description: 'Instead of replacing legal consultations, LexiGuide AI organizes your documents to make lawyer consultations shorter, cheaper, and more focused.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Mission */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-2">
          <DemoModeBadge />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#102A43] font-sans">
          Why LexiGuide AI?
        </h1>
        <p className="text-lg text-[#64748B] leading-relaxed">
          Legal documents are notoriously difficult to navigate. Specialized Latin terminology, multi-tiered clauses, and dense layouts create an asymmetric barrier between ordinary citizens and contract drafters.
        </p>
      </div>

      {/* Mission narrative card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-card space-y-6">
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="p-2 rounded-xl bg-[#102A43] text-[#C49A3A]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#102A43]">Our Mission: Legal Assistance & Access</h2>
            <p className="text-xs text-[#64748B]">Built for the GenAI Hackathon Challenge</p>
          </div>
        </div>

        <div className="text-sm sm:text-base text-[#334E68] leading-relaxed space-y-4">
          <p>
            Whether signing an apartment lease, entering a freelance agreement, or agreeing to website terms of service, individuals often sign away rights simply because the document was impossible to read in plain language.
          </p>
          <p>
            <strong>LexiGuide AI</strong> bridges this gap not by issuing speculative legal opinions, but by providing an interactive, transparent workspace where contracts are broken down into plain-language summaries, side-by-side diffs, and structured questions.
          </p>
        </div>
      </div>

      {/* Four Core Pillars */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C49A3A]">
            Foundational Values
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102A43] mt-1">
            Built on four essential pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#102A43] shadow-subtle">
                  <Icon className="w-6 h-6 text-[#C49A3A]" />
                </div>
                <h3 className="text-lg font-bold text-[#102A43]">{pillar.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsible AI Framework Grid */}
      <div className="bg-[#0B1F33] text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-card">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C49A3A] tracking-wider uppercase">
            <Scale className="w-4 h-4" />
            <span>Ethical AI Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Responsible AI Principles in Practice
          </h2>
          <p className="text-sm text-slate-300">
            How we protect users and maintain absolute transparency around AI capabilities and limitations.
          </p>
        </div>

        <div className="space-y-4">
          {ethicalPrinciples.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#102A43] p-5 rounded-2xl border border-[#1E3A5F] flex items-start gap-4"
            >
              <div className="p-1 rounded-full bg-[#C49A3A]/20 text-[#C49A3A] mt-0.5 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="p-4 bg-[#1B365D]/60 rounded-2xl border border-[#C49A3A]/30 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 text-xs text-white">
            <FileCheck className="w-5 h-5 text-[#C49A3A] flex-shrink-0" />
            <span>
              All demo documents and analyses in this hackathon prototype run in simulated offline demo mode.
            </span>
          </div>
          <Link
            to="/analyze"
            className="px-4 py-2 bg-[#C49A3A] hover:bg-[#B38928] text-[#0B1F33] font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            Launch Demo Workspace
          </Link>
        </div>
      </div>
    </div>
  );
};
