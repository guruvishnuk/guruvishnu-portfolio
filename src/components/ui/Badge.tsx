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
        'inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-wider uppercase rounded-full select-none transition-colors',
        variant === 'pulse' &&
          'glass-pill text-blue-600 dark:text-[#4F8CFF] border border-blue-500/25 dark:border-[#4F8CFF]/30 bg-blue-500/10 dark:bg-[#4F8CFF]/10 font-semibold',
        variant === 'glass' &&
          'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E]',
        variant === 'accent' &&
          'bg-blue-500/10 dark:bg-[#4F8CFF]/20 border border-blue-500/30 dark:border-[#4F8CFF]/40 text-blue-600 dark:text-[#4F8CFF] font-semibold',
        variant === 'outline' &&
          'border border-slate-300 dark:border-white/20 text-slate-800 dark:text-[#F5F5F7]',
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
