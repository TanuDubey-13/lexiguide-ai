import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { DemoModeBadge } from './DemoModeBadge';
import { useDocument } from '../../context/DocumentContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loadDemoDocument } = useDocument();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Analyze', path: '/analyze' },
    { name: 'Compare', path: '/compare' },
    { name: 'Ask AI', path: '/ask' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
  ];

  const handleGetStarted = async () => {
    await loadDemoDocument();
    navigate('/analyze');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 rounded-lg p-1">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#102A43] to-[#0B1F33] text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              {/* Document + Sparkle concept */}
              <svg
                className="w-5 h-5 text-white/90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div className="absolute -top-1 -right-1 p-0.5 bg-[#C49A3A] rounded-full text-white shadow-sm ring-2 ring-[#F7F5F0]">
                <Sparkles className="w-3 h-3 fill-white" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-[#102A43] font-sans flex items-center gap-1.5">
                LexiGuide <span className="text-[#C49A3A] font-semibold text-sm px-1.5 py-0.2 bg-[#C49A3A]/10 rounded border border-[#C49A3A]/20">AI</span>
              </span>
              <span className="text-[10px] text-[#64748B] tracking-wider uppercase font-medium -mt-1 hidden sm:inline">
                Legal Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#102A43] text-white shadow-sm'
                      : 'text-[#334E68] hover:text-[#102A43] hover:bg-[#EAE5D9]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right side: Demo badge & Get Started CTA */}
          <div className="hidden md:flex items-center gap-3">
            <DemoModeBadge compact />
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#102A43] hover:bg-[#0B1F33] text-white text-sm font-semibold shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98] border border-[#102A43]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 text-[#C49A3A]" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <DemoModeBadge compact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#102A43] hover:bg-[#EAE5D9] focus:outline-none focus:ring-2 focus:ring-[#102A43]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-[#F7F5F0] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#102A43] text-white'
                      : 'text-[#102A43] hover:bg-[#EAE5D9]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-2">
            <button
              onClick={handleGetStarted}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#102A43] text-white text-sm font-semibold shadow-sm active:scale-95"
            >
              <span>Launch Workspace</span>
              <ArrowUpRight className="w-4 h-4 text-[#C49A3A]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
