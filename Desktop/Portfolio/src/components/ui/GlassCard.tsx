import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        'glass-card relative overflow-hidden p-6 md:p-8',
        glow && 'before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#4F8CFF]/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
