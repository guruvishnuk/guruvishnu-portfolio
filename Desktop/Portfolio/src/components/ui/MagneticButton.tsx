import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn, SIGNATURE_EASE } from '../../lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'accent' | 'glass' | 'outline';
  className?: string;
  onClick?: () => void;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'accent',
  className,
  onClick,
  asAnchor = false,
  href,
  target,
  rel,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({ x: distanceX * 0.2, y: distanceY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden cursor-pointer select-none';

  const variants = {
    accent:
      'bg-[#4F8CFF] text-white shadow-[0_0_30px_rgba(79,140,255,0.35)] hover:shadow-[0_0_40px_rgba(79,140,255,0.6)] hover:bg-[#3B78F6]',
    glass:
      'glass-pill text-[#F5F5F7] hover:bg-white/10 hover:text-white border border-white/15',
    outline:
      'border border-white/20 text-[#F5F5F7] hover:border-[#4F8CFF] hover:bg-[#4F8CFF]/10',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
      data-cursor="hover"
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (asAnchor && href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block border-none bg-transparent p-0 outline-none" {...props}>
      {content}
    </button>
  );
};
