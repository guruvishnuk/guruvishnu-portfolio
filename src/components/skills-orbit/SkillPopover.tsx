import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SkillCategory } from '../../types/portfolio';
import { X, CheckCircle, Award } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

interface SkillPopoverProps {
  skill: SkillCategory | null;
  onClose: () => void;
}

export const SkillPopover: React.FC<SkillPopoverProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="w-full max-w-md"
        >
          <GlassCard className="relative p-6 border-[#4F8CFF]/40 bg-[#0a0a0c]/95 shadow-[0_0_50px_rgba(79,140,255,0.2)]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-[#8A8A8E] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <Badge variant="accent">{skill.ring} Ring</Badge>
              <span className="text-xs font-mono text-[#8A8A8E]">{skill.level}</span>
            </div>

            <h3 className="text-2xl font-bold text-[#F5F5F7] mb-2">{skill.name}</h3>
            <p className="text-sm text-[#8A8A8E] leading-relaxed mb-6 font-sans">
              {skill.description}
            </p>

            <div className="p-4 rounded-xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#4F8CFF] font-semibold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Production Context</span>
              </div>
              <p className="text-xs sm:text-sm text-[#F5F5F7] font-medium leading-normal">
                "{skill.context}"
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
