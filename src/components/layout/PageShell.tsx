import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { LoadingScreen } from '../ui/LoadingScreen';
import { useLenis } from '../../hooks/useLenis';
import { ThemeProvider } from '../../context/ThemeContext';
import { LiveResumeProvider } from '../../context/LiveResumeContext';
import { LiveResumeModal } from '../resume/LiveResumeModal';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShellContent: React.FC<PageShellProps> = ({ children }) => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] selection:bg-[#4F8CFF]/30 selection:text-white transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#4F8CFF] focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-mono font-semibold transition-all"
      >
        Skip to main content
      </a>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main-content" className="relative z-10">{children}</main>
      <Footer />
      <LiveResumeModal />
    </div>
  );
};

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LiveResumeProvider>
        <PageShellContent>{children}</PageShellContent>
      </LiveResumeProvider>
    </ThemeProvider>
  );
};
