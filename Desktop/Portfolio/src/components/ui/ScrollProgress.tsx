import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollPercent(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-[#4F8CFF] via-[#38BDF8] to-[#4F8CFF] shadow-[0_0_12px_#4F8CFF]"
        style={{ width: `${scrollPercent}%` }}
        transition={{ ease: 'linear', duration: 0.1 }}
      />
    </div>
  );
};
