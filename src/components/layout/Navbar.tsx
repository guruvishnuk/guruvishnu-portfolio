import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_EASE } from '../../lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';
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
          <nav className="hidden md:flex glass-pill items-center gap-1 p-1.5 px-3 border border-slate-200/80 dark:border-white/15 backdrop-blur-2xl">
            {/* Morphing GK Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center justify-center p-2 mr-1 rounded-full hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
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
                    className="relative px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white whitespace-nowrap cursor-pointer"
                    data-cursor="hover"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[#4F8CFF]/15 dark:bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 dark:border-[#4F8CFF]/50 rounded-full shadow-[0_0_15px_rgba(79,140,255,0.2)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-blue-600 dark:text-white font-bold' : ''}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Ask AI, Live Resume & Theme Toggle Pill Button */}
            <div className="ml-1 pl-2 border-l border-slate-300/80 dark:border-white/15 flex items-center gap-1.5">
              <button
                onClick={() => openLiveResume()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all cursor-pointer"
                title="View Live Interactive Resume PDF"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Live Resume</span>
              </button>

              <ThemeToggle />
            </div>
          </nav>

          {/* MOBILE RESPONSIVE FLOATING MENU BAR (< md screens) */}
          <div className="flex md:hidden flex-col items-center w-full max-w-sm relative">
            {/* Top Compact Floating Pill Bar */}
            <div className="w-full glass-pill flex items-center justify-between p-1.5 px-3 border border-slate-200/80 dark:border-white/15 backdrop-blur-2xl">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F8CFF]/15 border border-[#4F8CFF]/40 text-xs font-semibold text-blue-700 dark:text-[#4F8CFF] shadow-xs cursor-pointer"
              >
                <ActiveIcon className="w-3.5 h-3.5 text-[#4F8CFF]" />
                <span>{activeItem.label}</span>
                <ChevronDown className={`w-3 h-3 text-[#4F8CFF] transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className="flex items-center gap-1">
                {/* Live Resume Trigger */}
                <button
                  onClick={() => openLiveResume()}
                  className="p-2 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                  title="View Live Resume"
                >
                  <FileText className="w-4 h-4" />
                </button>

                {/* Theme Toggle Button */}
                <ThemeToggle />

                {/* Menu Toggle Trigger */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full bg-slate-200/60 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 hover:bg-slate-300/60 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4 text-red-500" /> : <Menu className="w-4 h-4 text-[#4F8CFF]" />}
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
                  className="w-full p-3 rounded-2xl glass-card border border-slate-200 dark:border-white/15 backdrop-blur-2xl space-y-1 overflow-hidden"
                >
                  <div className="text-[10px] font-mono uppercase opacity-70 px-3 py-1 flex items-center justify-between border-b border-slate-200 dark:border-white/10 mb-1 text-slate-600 dark:text-slate-400">
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
                              ? 'bg-[#4F8CFF]/15 border border-[#4F8CFF]/50 text-blue-700 dark:text-white font-bold shadow-[0_0_12px_rgba(79,140,255,0.2)]'
                              : 'bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/10'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4F8CFF]' : 'opacity-70'}`} />
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
