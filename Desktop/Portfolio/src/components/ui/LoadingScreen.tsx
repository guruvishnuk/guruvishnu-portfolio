import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_EASE } from '../../lib/utils';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hard cap at 1100ms max so LCP is fast
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#F5F5F7]"
          exit={{
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.6, ease: SIGNATURE_EASE },
          }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <svg
              className="w-20 h-20"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.rect
                width="96"
                height="96"
                x="2"
                y="2"
                rx="20"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: SIGNATURE_EASE }}
              />
              <motion.path
                d="M30 68V32H44C52 32 58 37 58 45C58 53 52 58 44 58H30"
                stroke="#4F8CFF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: SIGNATURE_EASE, delay: 0.1 }}
              />
              <motion.path
                d="M50 50L68 68"
                stroke="#4F8CFF"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: SIGNATURE_EASE, delay: 0.25 }}
              />
            </svg>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#8A8A8E] tracking-widest uppercase">
                GURUVISHNU.DEV
              </span>
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
