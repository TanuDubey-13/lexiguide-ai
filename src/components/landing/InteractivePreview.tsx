import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { DemoModeBadge } from '../common/DemoModeBadge';

export const InteractivePreview: React.FC = () => {
  const [activeClausePreview, setActiveClausePreview] = useState<'termination' | 'deposit' | 'renewal'>('termination');

  const clauseData = {
    termination: {
      title: 'Termination & Notice Period',
      tag: 'Section 7',
      severity: 'High Impact',
      severityClass: 'bg-rose-100 text-rose-800 border-rose-200',
      legalText: 'Either party may terminate this agreement by providing thirty (30) days advance written notice... Early departure within 6 months results in deposit forfeiture.',
      plainText: 'You must provide written notice 30 days ahead. Leaving before month 6 forfeits one month of your security deposit.',
      question: 'Can I terminate early without penalty in the event of an unavoidable job relocation?'
    },
    deposit: {
      title: 'Security Deposit & Deductions',
      tag: 'Section 4',
      severity: 'Medium Impact',
      severityClass: 'bg-amber-100 text-amber-800 border-amber-200',
      legalText: 'Tenant shall deposit ₹50,000 refundable within thirty (30) business days following full handover of the Premises, subject to itemized deductions.',
      plainText: 'Refundable ₹50,000 deposit returned within 30 business days after move-out. Deductions require itemized receipts.',
      question: 'Is 30 business days standard, and will interest be accrued in an escrow account?'
    },
    renewal: {
      title: 'Renewal Terms & Escalation',
      tag: 'Section 2',
      severity: 'Notice Needed',
      severityClass: 'bg-sky-100 text-sky-800 border-sky-200',
      legalText: 'Upon mutual written agreement delivered 60 days prior to expiration, this agreement may be renewed with 5% to 7% annual escalation.',
      plainText: 'Lease does not roll over automatically. You must submit written notice at least 60 days before the lease ends to renew.',
      question: 'What happens if neither party provides notice 60 days prior to expiry?'
    }
  };

  const current = clauseData[activeClausePreview];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white rounded-3xl shadow-card-hover border border-[#E2E8F0] overflow-hidden transition-all duration-300">
        {/* Top Window Bar */}
        <div className="bg-[#0B1F33] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A5F]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-white/20 mx-1" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C49A3A]" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">Rental_Agreement.pdf</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white/70">12 pages</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DemoModeBadge compact />
            <Link
              to="/analyze"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C49A3A] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
            >
              <span>Open Full Workspace</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Inner Split Screen Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0] bg-[#F7F5F0]">
          {/* Left Column: Mock Document Page View (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between text-xs text-[#64748B] border-b border-[#E2E8F0] pb-3">
              <span className="font-semibold uppercase tracking-wider text-[#102A43]">
                Document Viewer (Page 4 of 12)
              </span>
              <span className="bg-white px-2 py-1 rounded border border-[#E2E8F0]">
                Active Highlight Mode
              </span>
            </div>

            {/* Document Page Simulation */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-subtle border border-[#E2E8F0] space-y-4 font-serif text-[#1B365D] text-sm leading-relaxed relative">
              <div className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-widest border-b border-[#F1EFE9] pb-2">
                Residential Tenancy Covenants • Executed Copy
              </div>

              <p className="text-xs text-[#64748B] font-sans">
                6. Alterations: Tenant covenants not to make structural modifications without prior written approval.
              </p>

              {/* Clause Highlight 1: Termination */}
              <div
                onClick={() => setActiveClausePreview('termination')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeClausePreview === 'termination'
                    ? 'bg-amber-50/80 border-[#C49A3A] ring-2 ring-[#C49A3A]/20 shadow-sm'
                    : 'bg-amber-50/30 border-amber-200 hover:bg-amber-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-sans font-bold text-[#916F22] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C49A3A]" />
                    Section 7 — Termination and Notice Conditions
                  </span>
                  <span className="text-[10px] font-sans font-semibold uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                    Important Clause
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0B1F33]">
                  "Either party may terminate this agreement by providing thirty (30) days advance written notice... Should the Tenant vacate prior to the six (6) month lock-in period without cause, one month deposit shall be forfeited."
                </p>
              </div>

              {/* Clause Highlight 2: Security Deposit */}
              <div
                onClick={() => setActiveClausePreview('deposit')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeClausePreview === 'deposit'
                    ? 'bg-sky-50/90 border-[#1B365D] ring-2 ring-[#1B365D]/20 shadow-sm'
                    : 'bg-sky-50/30 border-sky-200 hover:bg-sky-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-sans font-bold text-[#1B365D] flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1B365D]" />
                    Section 4 — Security Deposit
                  </span>
                  <span className="text-[10px] font-sans font-semibold uppercase bg-sky-100 text-sky-900 px-2 py-0.5 rounded">
                    Financial Obligation
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0B1F33]">
                  "Tenant shall deposit ₹50,000 refundable within thirty (30) business days following full handover of the Premises, keys, and utility bills..."
                </p>
              </div>

              {/* Clause Highlight 3: Renewal */}
              <div
                onClick={() => setActiveClausePreview('renewal')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeClausePreview === 'renewal'
                    ? 'bg-rose-50/90 border-rose-300 ring-2 ring-rose-200 shadow-sm'
                    : 'bg-rose-50/30 border-rose-200 hover:bg-rose-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-sans font-bold text-rose-900 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    Section 2 — Renewal Terms
                  </span>
                  <span className="text-[10px] font-sans font-semibold uppercase bg-rose-100 text-rose-900 px-2 py-0.5 rounded">
                    Action Required
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#0B1F33]">
                  "Agreement may be renewed upon mutual written agreement delivered at least 60 days prior to expiration with 5% to 7% escalation."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis Panel (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-white">
            {/* Header with Sparkle */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#102A43] text-white">
                  <Sparkles className="w-4 h-4 text-[#C49A3A]" />
                </div>
                <h3 className="text-base font-bold text-[#102A43]">AI Analysis</h3>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
                Analysis Complete
              </span>
            </div>

            {/* Document Overview Section */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Document Overview
              </h4>
              <p className="text-sm text-[#102A43] leading-relaxed bg-[#F7F5F0] p-3.5 rounded-xl border border-[#E2E8F0]">
                This agreement outlines rental terms, payment obligations, termination conditions, and responsibilities of both parties.
              </p>
            </div>

            {/* Metric Cards: 12 Clauses, 3 Important, 2 Review */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                Clause Breakdown
              </h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-[#F7F5F0] p-3 rounded-xl border border-[#E2E8F0] text-center">
                  <div className="text-2xl font-bold text-[#102A43]">12</div>
                  <div className="text-xs text-[#64748B] font-medium mt-0.5">Clauses</div>
                </div>
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-center">
                  <div className="text-2xl font-bold text-[#916F22]">3</div>
                  <div className="text-xs text-[#916F22] font-medium mt-0.5">Important</div>
                </div>
                <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200 text-center">
                  <div className="text-2xl font-bold text-rose-700">2</div>
                  <div className="text-xs text-rose-700 font-medium mt-0.5">Review</div>
                </div>
              </div>
            </div>

            {/* Important Clauses Pill Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  Important Clauses
                </h4>
                <span className="text-[11px] text-[#C49A3A] font-medium">Click to inspect</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveClausePreview('termination')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeClausePreview === 'termination'
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'bg-[#F1EFE9] text-[#102A43] hover:bg-[#E2E8F0]'
                  }`}
                >
                  Termination
                </button>
                <button
                  onClick={() => setActiveClausePreview('deposit')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeClausePreview === 'deposit'
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'bg-[#F1EFE9] text-[#102A43] hover:bg-[#E2E8F0]'
                  }`}
                >
                  Security Deposit
                </button>
                <button
                  onClick={() => setActiveClausePreview('renewal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeClausePreview === 'renewal'
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'bg-[#F1EFE9] text-[#102A43] hover:bg-[#E2E8F0]'
                  }`}
                >
                  Renewal Terms
                </button>
              </div>
            </div>

            {/* Active Clause Plain-Language Explainer Box */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#102A43]">{current.title}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${current.severityClass}`}>
                  {current.severity}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                  Plain-Language Explanation:
                </span>
                <p className="text-xs sm:text-sm text-[#102A43] leading-relaxed bg-[#F7F5F0] p-2.5 rounded-lg">
                  {current.plainText}
                </p>
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                  Suggested Question for Landlord / Legal Advisor:
                </span>
                <p className="text-xs text-[#1B365D] italic">
                  "{current.question}"
                </p>
              </div>
            </div>

            {/* CTA to full workspace */}
            <Link
              to="/analyze"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-sm font-semibold transition-all shadow-sm"
            >
              <span>Explore Interactive Workspace</span>
              <ArrowRight className="w-4 h-4 text-[#C49A3A]" />
            </Link>
          </div>
        </div>

        {/* Trust Notice bar on preview */}
        <div className="bg-[#F1EFE9] px-6 py-2.5 text-xs text-[#64748B] border-t border-[#E2E8F0] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#C49A3A]" />
            LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional.
          </span>
          <Link to="/about" className="hidden sm:inline text-[#102A43] font-medium hover:underline">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};
