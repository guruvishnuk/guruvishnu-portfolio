import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SIGNATURE_EASE } from '../../lib/utils';

const roles = ['React Developer', 'Performance Enthusiast', 'Problem Solver'];

export const RotatingRoleText: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 md:h-12 overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.55, ease: SIGNATURE_EASE }}
          className="gradient-accent-text font-mono font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
