import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { AnimatedCounter } from './AnimatedCounter';
import { Sparkline } from './Sparkline';
import { metricsData } from '../../data/metrics';
import { Activity, Gauge, TrendingUp, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

export const PerformanceDashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-24 px-6 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4F8CFF]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="pulse">Performance Dashboard</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
            Quantifiable Impact & Engineering Metrics
          </h2>
          <p className="text-[#8A8A8E] text-base md:text-lg">
            Engineering isn't about guesswork—it's measured in sub-second latencies, lean bundles, and zero regressions.
          </p>
        </div>

        <div className="glass-pill px-4 py-2 flex items-center gap-3 text-xs font-mono text-[#8A8A8E] self-start md:self-auto border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real Production Metrics</span>
        </div>
      </div>

      {/* Vercel-Style Metric Card Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {metricsData.map((metric, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <GlassCard glow className="relative h-full flex flex-col justify-between p-6 group">
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8A8A8E]">
                    {metric.label}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#4F8CFF] group-hover:bg-[#4F8CFF] group-hover:text-white transition-colors">
                    <Zap className="w-4 h-4" />
                  </div>
                </div>

                {/* Big Animated Counter */}
                <div className="text-4xl sm:text-5xl font-extrabold text-[#F5F5F7] mb-3 gradient-accent-text flex items-baseline">
                  <AnimatedCounter
                    to={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>

                {/* Specific 'How' context string */}
                <p className="text-xs md:text-sm text-[#8A8A8E] leading-relaxed font-sans border-t border-white/5 pt-3 mb-4">
                  {metric.detail}
                </p>
              </div>

              {/* Sparkline chart at bottom */}
              <div className="pt-2">
                <Sparkline data={metric.sparkline} />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
