import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ContextualHintProps {
  id: string;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const ContextualHint: React.FC<ContextualHintProps> = ({ 
  id, 
  text, 
  position = 'top',
  delay = 2000 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if they haven't dismissed this specific hint
    const hasSeenHint = localStorage.getItem(`hint-seen-${id}`);
    if (!hasSeenHint) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [id, delay]);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    localStorage.setItem(`hint-seen-${id}`, 'true');
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top': return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
      case 'bottom': return 'top-full left-1/2 -translate-x-1/2 mt-3';
      case 'left': return 'right-full top-1/2 -translate-y-1/2 mr-3';
      case 'right': return 'left-full top-1/2 -translate-y-1/2 ml-3';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={`absolute z-50 ${getPositionClasses()}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-[#4F8CFF] text-white text-xs font-medium px-3 py-2 rounded-lg shadow-[0_0_20px_rgba(79,140,255,0.4)] whitespace-nowrap flex items-center gap-2 cursor-pointer"
            onClick={dismiss}
          >
            {text}
            <button className="w-4 h-4 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors">
              <span className="text-[10px] leading-none mb-[1px]">✕</span>
            </button>
            
            {/* Arrow/Triangle */}
            <div className={`absolute w-2 h-2 bg-[#4F8CFF] rotate-45 ${
              position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
              position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
              position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
              'left-[-4px] top-1/2 -translate-y-1/2'
            }`} />
          </motion.div>
          {/* Subtle pulse ring connecting to the target */}
          <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 w-2 h-2 rounded-full bg-[#4F8CFF] animate-ping" />
        </div>
      )}
    </AnimatePresence>
  );
};
