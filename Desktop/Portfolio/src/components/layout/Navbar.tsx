import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_EASE } from '../../lib/utils';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'dashboard', label: 'Metrics' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'philosophy', label: 'Craft' },
  { id: 'playground', label: 'Sandbox' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Appear after 80px scroll
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Track active section based on scroll position
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: SIGNATURE_EASE }}
          className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-auto"
        >
          <nav className="glass-pill flex items-center gap-1 p-1.5 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-2xl">
            {/* Morphing GK Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center justify-center p-2 mr-1 rounded-full hover:bg-white/10 transition-colors"
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

            {/* Nav Items */}
            <div className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3 py-1.5 text-xs md:text-sm font-medium transition-colors text-[#8A8A8E] hover:text-[#F5F5F7]"
                    data-cursor="hover"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-white font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
