import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { philosophyData } from '../../data/philosophy';
import { Zap, Brain, Code, Eye, Layers, BookOpen } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

const iconMap: Record<string, React.ReactNode> = {
  perf: <Zap className="w-6 h-6 text-[#4F8CFF]" />,
  think: <Brain className="w-6 h-6 text-purple-400" />,
  clean: <Code className="w-6 h-6 text-emerald-400" />,
  ux: <Eye className="w-6 h-6 text-rose-400" />,
  reusable: <Layers className="w-6 h-6 text-[#38BDF8]" />,
  learn: <BookOpen className="w-6 h-6 text-amber-400" />,
};

export const PhilosophyGrid: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Code Philosophy & Craft</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          How I Build Software
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Engineering principles focused on technical rigor, performance profiling, and maintainable systems.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {philosophyData.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeInUp}
            className={item.highlight ? 'lg:col-span-2' : 'lg:col-span-1'}
          >
            <GlassCard
              glow
              className={`h-full flex flex-col justify-between p-6 sm:p-8 ${
                item.highlight ? 'border-[#4F8CFF]/30 bg-[#4F8CFF]/5' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    {iconMap[item.id] || <Zap className="w-6 h-6 text-[#4F8CFF]" />}
                  </div>
                  {item.highlight && (
                    <Badge variant="accent">Core Differentiator</Badge>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F7]">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#4F8CFF]">"{item.quote}"</p>
                <p className="text-[#8A8A8E] text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
