import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-slate-200/50 dark:bg-white/5 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#4F8CFF] via-[#38BDF8] to-[#4F8CFF] shadow-[0_0_12px_#4F8CFF] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
