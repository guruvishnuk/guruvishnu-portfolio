import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { MessageSquareQuote, Lock, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

export const TestimonialsPlaceholder: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Peer & Management Reviews</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Endorsements & Testimonials
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Direct feedback from engineering leads, product managers, and team collaborators.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Placeholder 1 */}
        <motion.div variants={fadeInUp}>
          <div className="p-8 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4F8CFF]">
                <Lock className="w-3.5 h-3.5" />
                <span>Reserved for CandorWorks Engineering Lead</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-[#8A8A8E]">
                Coming Soon
              </span>
            </div>

            <MessageSquareQuote className="w-8 h-8 text-white/20" />
            <p className="text-sm italic text-[#8A8A8E] leading-relaxed">
              "Verified manager review currently being processed for formal publication..."
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs text-[#8A8A8E]">
                PM
              </div>
              <div>
                <p className="text-xs font-bold text-[#F5F5F7]">Engineering Lead Review</p>
                <p className="text-[10px] font-mono text-[#8A8A8E]">CandorWorks Platform Team</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Placeholder 2 */}
        <motion.div variants={fadeInUp}>
          <div className="p-8 rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Reserved for Senior Product Manager</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-[#8A8A8E]">
                Coming Soon
              </span>
            </div>

            <MessageSquareQuote className="w-8 h-8 text-white/20" />
            <p className="text-sm italic text-[#8A8A8E] leading-relaxed">
              "Verified peer review currently being processed for formal publication..."
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs text-[#8A8A8E]">
                EM
              </div>
              <div>
                <p className="text-xs font-bold text-[#F5F5F7]">Product Manager Endorsement</p>
                <p className="text-[10px] font-mono text-[#8A8A8E]">Enterprise Solutions Group</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
