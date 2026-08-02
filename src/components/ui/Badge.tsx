import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pulse' | 'glass' | 'accent' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'glass',
  className,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-full select-none',
        variant === 'pulse' &&
          'glass-pill text-[#4F8CFF] border border-[#4F8CFF]/30 bg-[#4F8CFF]/10',
        variant === 'glass' &&
          'bg-white/5 border border-white/10 text-[#8A8A8E]',
        variant === 'accent' &&
          'bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 text-[#4F8CFF]',
        variant === 'outline' &&
          'border border-white/20 text-[#F5F5F7]',
        className
      )}
    >
      {variant === 'pulse' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
      {children}
    </div>
  );
};
