import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { LoadingScreen } from '../ui/LoadingScreen';
import { useLenis } from '../../hooks/useLenis';
import { ThemeProvider } from '../../context/ThemeContext';
import { AiModalProvider } from '../../context/AiModalContext';
import { LiveResumeProvider } from '../../context/LiveResumeContext';
import { ChatModal } from '../chat/ChatModal';
import { AiFloatingButton } from '../ai/AiFloatingButton';
import { LiveResumeModal } from '../resume/LiveResumeModal';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShellContent: React.FC<PageShellProps> = ({ children }) => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] selection:bg-[#4F8CFF]/30 selection:text-white transition-colors duration-300">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <AiFloatingButton />
      <ChatModal />
      <LiveResumeModal />
    </div>
  );
};

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AiModalProvider>
        <LiveResumeProvider>
          <PageShellContent>{children}</PageShellContent>
        </LiveResumeProvider>
      </AiModalProvider>
    </ThemeProvider>
  );
};
