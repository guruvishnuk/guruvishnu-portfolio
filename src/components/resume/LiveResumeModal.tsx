import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLiveResume } from '../../context/LiveResumeContext';
import { LiveResumePaper } from './LiveResumePaper';
import { X, FileText, Sparkles } from 'lucide-react';

export const LiveResumeModal: React.FC = () => {
  const { isOpen, closeLiveResume } = useLiveResume();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeLiveResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLiveResume]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLiveResume}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[var(--theme-bg)] border border-[var(--glass-border)] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--glass-border)] bg-[var(--theme-bg-elevated)] backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 text-[#4F8CFF]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--theme-text-primary)] flex items-center gap-2">
                    <span>Live Interactive Resume</span>
                    <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4F8CFF]/20 border border-[#4F8CFF]/50 text-[#38BDF8]">
                      <Sparkles className="w-3 h-3 animate-pulse" /> Official PDF Model
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--theme-text-secondary)]">
                    Guruvishnu B Kajagar — Frontend Developer / React Specialist
                  </p>
                </div>
              </div>

              <button
                onClick={closeLiveResume}
                className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors cursor-pointer"
                aria-label="Close Live Resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Document Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
              <LiveResumePaper onClose={closeLiveResume} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
