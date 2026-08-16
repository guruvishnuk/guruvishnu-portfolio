import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollProgress } from '../ui/ScrollProgress';
import { LoadingScreen } from '../ui/LoadingScreen';
import { useLenis } from '../../hooks/useLenis';

interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-[#4F8CFF]/30 selection:text-white">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
