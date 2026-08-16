import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition();
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'hover'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReduced]);

  if (prefersReduced || !isVisible) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#4F8CFF] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: x - 5,
          y: y - 5,
          scale: isHovered ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
      {/* Trailing glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#4F8CFF]/40 rounded-full pointer-events-none z-40 bg-[#4F8CFF]/5 backdrop-blur-[1px]"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? 'rgba(79, 140, 255, 0.8)' : 'rgba(79, 140, 255, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.3 }}
      />
    </>
  );
};
