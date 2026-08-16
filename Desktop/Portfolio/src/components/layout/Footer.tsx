import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050505] py-16 px-6 overflow-hidden select-none">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#4F8CFF]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 text-center relative z-10">
        {/* Quote */}
        <p className="font-display italic text-lg md:text-xl text-[#8A8A8E] max-w-lg">
          "Great software isn't built by accident.{' '}
          <span className="text-[#F5F5F7] not-italic font-semibold">It's engineered.</span>"
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/guruvishnuk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[#8A8A8E] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/40 transition-colors"
            title="GitHub"
            data-cursor="hover"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/guruvishnu-kajagar-/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[#8A8A8E] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/40 transition-colors"
            title="LinkedIn"
            data-cursor="hover"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:guruvishnu1927@gmail.com"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-[#8A8A8E] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/40 transition-colors"
            title="Email guruvishnu1927@gmail.com"
            data-cursor="hover"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Bottom row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-xs text-[#8A8A8E] font-mono">
          <div>
            © {new Date().getFullYear()} Guruvishnu Kajagar. Built with React 19, Motion & Vite.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#8A8A8E] hover:text-white transition-colors cursor-pointer group"
            data-cursor="hover"
          >
            <span>Back to top</span>
            <div className="p-1.5 rounded-full bg-white/5 group-hover:bg-[#4F8CFF] group-hover:text-white transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
