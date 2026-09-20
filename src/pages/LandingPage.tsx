import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { InteractivePreview } from '../components/landing/InteractivePreview';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ArrowRight, Sparkles, Scale, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDocument } from '../context/DocumentContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadDemoDocument } = useDocument();

  const handleLaunchWorkspace = async () => {
    await loadDemoDocument();
    navigate('/analyze');
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Interactive Product Preview */}
      <InteractivePreview />

      {/* 3. Features Grid */}
      <FeaturesGrid />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Trust & Responsible AI Callout Section */}
      <section className="py-16 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-subtle flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43]/5 text-[#102A43] text-xs font-bold">
                <Scale className="w-3.5 h-3.5 text-[#C49A3A]" />
                <span>ETHICAL ASSISTANCE • NOT LEGAL ADVICE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#102A43] font-sans">
                Empowering your decisions without overstepping.
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                LexiGuide AI provides general legal information and document assistance. It does not replace advice from a qualified legal professional. Our goal is to prepare you for meaningful conversations with attorneys.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                to="/about"
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#F1EFE9] text-[#102A43] border border-[#CBD5E1] font-semibold text-sm text-center shadow-subtle transition-all"
              >
                Our AI Principles
              </Link>
              <button
                onClick={handleLaunchWorkspace}
                className="px-5 py-3 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Try Demo Now</span>
                <ArrowRight className="w-4 h-4 text-[#C49A3A]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Call To Action */}
      <section className="py-20 bg-gradient-to-b from-[#FAF9F5] to-[#F7F5F0] text-center border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#102A43] text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-7 h-7 text-[#C49A3A]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#102A43] tracking-tight">
            Ready to decode your next agreement?
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
            Upload any contract or use our fictional demo agreement to experience plain-language clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/analyze"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white font-bold text-base shadow-card hover:shadow-card-hover transition-all flex items-center justify-center gap-2"
            >
              <span>Analyze a Document</span>
              <ArrowRight className="w-5 h-5 text-[#C49A3A]" />
            </Link>
            <Link
              to="/resources"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#102A43] border border-[#CBD5E1] font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-subtle"
            >
              <BookOpen className="w-5 h-5 text-[#102A43]" />
              <span>Browse Legal Guides</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
