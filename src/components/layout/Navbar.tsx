import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_EASE } from '../../lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAiModal } from '../../context/AiModalContext';
import { useLiveResume } from '../../context/LiveResumeContext';
import {
  Home,
  FileText,
  Compass,
  BarChart2,
  Cpu,
  FolderGit2,
  Rocket,
  Terminal,
  Code2,
  Send,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'live-resume', label: 'Resume', icon: FileText },
  { id: 'roadmap', label: 'Roadmap', icon: Compass },
  { id: 'dashboard', label: 'Metrics', icon: BarChart2 },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'services', label: 'Services', icon: Rocket },
  { id: 'philosophy', label: 'Craft', icon: Terminal },
  { id: 'playground', label: 'Sandbox', icon: Code2 },
  { id: 'contact', label: 'Contact', icon: Send },
];

export const Navbar: React.FC = () => {
  const { openModal } = useAiModal();
  const { openLiveResume } = useLiveResume();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      }

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeItem = navItems.find((item) => item.id === activeSection) || navItems[0];
  const ActiveIcon = activeItem.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: SIGNATURE_EASE }}
          className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto max-w-full"
        >
          {/* DESKTOP MENU BAR */}
          <nav className="hidden md:flex glass-pill items-center gap-1 p-1.5 px-3 shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-white/15 backdrop-blur-2xl">
            {/* Morphing GK Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center justify-center p-2 mr-1 rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title="Guruvishnu Kajagar"
              data-cursor="hover"
            >
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
                <path
                  d="M30 68V32H44C52 32 58 37 58 45C58 53 52 58 44 58H30"
                  stroke="#4F8CFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 50L68 68"
                  stroke="#4F8CFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Desktop Nav Items */}
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors opacity-80 hover:opacity-100 whitespace-nowrap cursor-pointer"
                    data-cursor="hover"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[#4F8CFF]/20 border border-[#4F8CFF]/50 rounded-full shadow-[0_0_15px_rgba(79,140,255,0.25)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'font-bold' : ''}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Ask AI, Live Resume & Theme Toggle Pill Button */}
            <div className="ml-1 pl-2 border-l border-white/15 flex items-center gap-1.5">
              <button
                onClick={() => openLiveResume()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-xs font-semibold text-white shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                title="View Live Interactive Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live Resume</span>
              </button>

              <button
                onClick={() => openModal()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4F8CFF]/20 hover:bg-[#4F8CFF]/30 border border-[#4F8CFF]/50 text-xs font-semibold text-white shadow-[0_0_12px_rgba(79,140,255,0.3)] transition-all cursor-pointer"
                title="Ask AI about Guruvishnu (Ctrl+K)"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
                <span>Ask AI</span>
              </button>
              <ThemeToggle />
            </div>
          </nav>

          {/* MOBILE RESPONSIVE FLOATING MENU BAR (< md screens) */}
          <div className="flex md:hidden flex-col items-center w-full max-w-sm relative">
            {/* Top Compact Floating Pill Bar */}
            <div className="w-full glass-pill flex items-center justify-between p-1.5 px-3 shadow-[0_10px_35px_rgba(0,0,0,0.7)] border border-white/15 backdrop-blur-2xl">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M30 68V32H44C52 32 58 37 58 45C58 53 52 58 44 58H30"
                    stroke="#4F8CFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50 50L68 68"
                    stroke="#4F8CFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Active Item Badge Pill */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 text-xs font-semibold shadow-sm cursor-pointer"
              >
                <ActiveIcon className="w-3.5 h-3.5 text-[#4F8CFF]" />
                <span>{activeItem.label}</span>
                <ChevronDown className={`w-3 h-3 text-[#4F8CFF] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-1">
                {/* Live Resume Trigger */}
                <button
                  onClick={() => openLiveResume()}
                  className="p-2 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  title="View Live Resume"
                >
                  <FileText className="w-4 h-4" />
                </button>

                {/* AI Trigger */}
                <button
                  onClick={() => openModal()}
                  className="p-2 rounded-full bg-[#4F8CFF]/20 border border-[#4F8CFF]/50 text-[#38BDF8] hover:bg-[#4F8CFF]/30 transition-colors cursor-pointer"
                  title="Ask AI"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </button>

                {/* Theme Toggle Button */}
                <ThemeToggle />

                {/* Menu Toggle Trigger */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4 text-red-400" /> : <Menu className="w-4 h-4 text-[#4F8CFF]" />}
                </button>
              </div>
            </div>

            {/* Mobile Expanding Glass Menu Overlay */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 8 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full p-3 rounded-2xl glass-card border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-1 overflow-hidden"
                >
                  <div className="text-[10px] font-mono uppercase opacity-60 px-3 py-1 flex items-center justify-between border-b border-white/10 mb-1">
                    <span>Navigation Menu</span>
                    <span className="text-[#4F8CFF]">@guruvishnuk</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                            isActive
                              ? 'bg-[#4F8CFF]/20 border border-[#4F8CFF]/50 font-bold shadow-[0_0_12px_rgba(79,140,255,0.25)]'
                              : 'bg-white/5 border border-white/5 hover:bg-white/10'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4F8CFF]' : 'opacity-60'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
