import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentProvider } from './context/DocumentContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { LandingPage } from './pages/LandingPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ComparePage } from './pages/ComparePage';
import { AskAiPage } from './pages/AskAiPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <DocumentProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#102A43]">
          {/* Global Safety / Legal Notice Banner */}
          <DisclaimerBanner />

          {/* Sticky Persistent Navbar */}
          <Navbar />

          {/* Main Application Routes */}
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/ask" element={<AskAiPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </HashRouter>
    </DocumentProvider>
  );
};

export default App;
