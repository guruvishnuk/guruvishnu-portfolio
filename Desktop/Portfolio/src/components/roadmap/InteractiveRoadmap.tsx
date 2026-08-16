import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { timelineData } from '../../data/timeline';
import { Briefcase, Calendar, ChevronRight, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

export const InteractiveRoadmap: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(0);

  return (
    <section id="roadmap" className="py-24 px-6 max-w-6xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Interactive Roadmap</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Career & Impact Journey
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          From shipping enterprise assessment tools at CandorWorks to optimizing core bundle sizes.
        </p>
      </div>

      <div className="relative">
        {/* Central Vertical SVG line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-white/10 rounded-full">
          <motion.div
            className="w-full bg-gradient-to-b from-[#4F8CFF] via-[#38BDF8] to-[#4F8CFF] shadow-[0_0_15px_#4F8CFF]"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Milestone Cards Stack */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-12"
        >
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isSelected = activeNodeIndex === index;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 pl-10 md:pl-0`}
              >
                {/* Center Node Indicator */}
                <div
                  onClick={() => setActiveNodeIndex(index)}
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-6 h-6 rounded-full border-2 cursor-pointer z-20 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#4F8CFF] border-white shadow-[0_0_20px_#4F8CFF] scale-125'
                      : 'bg-[#0a0a0c] border-[#4F8CFF]/50 hover:border-[#4F8CFF]'
                  }`}
                  data-cursor="hover"
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-[#4F8CFF]'
                    }`}
                  />
                </div>

                {/* Content Glass Card */}
                <div className="w-full md:w-[46%]">
                  <GlassCard
                    onClick={() => setActiveNodeIndex(index)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected ? 'border-[#4F8CFF]/60 bg-white/[0.06] shadow-[0_0_30px_rgba(79,140,255,0.15)]' : ''
                    }`}
                    data-cursor="hover"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge variant={item.active ? 'pulse' : 'glass'}>{item.year}</Badge>
                      <span className="text-xs font-mono text-[#8A8A8E] flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-[#4F8CFF]" />
                        {item.company}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#F5F5F7] mb-1">{item.title}</h3>
                    <p className="text-xs font-mono text-[#4F8CFF] mb-3">{item.role}</p>

                    <p className="text-[#8A8A8E] text-sm leading-relaxed mb-4">{item.description}</p>

                    {/* Impact Box */}
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-[#F5F5F7] space-y-2">
                      <div className="flex items-center gap-1.5 text-[#4F8CFF] font-semibold">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Key Impact</span>
                      </div>
                      <p className="text-[#8A8A8E]">{item.impact}</p>
                      
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.metrics.map((m, mIdx) => (
                          <span
                            key={mIdx}
                            className="px-2 py-0.5 rounded bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF] font-mono text-[11px]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
