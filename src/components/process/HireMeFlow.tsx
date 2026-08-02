import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { hireFlowData } from '../../data/hireFlow';
import { FileSearch, LayoutTemplate, Code2, Zap, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

const iconMap: Record<string, React.ReactNode> = {
  FileSearch: <FileSearch className="w-5 h-5" />,
  LayoutTemplate: <LayoutTemplate className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
};

export const HireMeFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Structured Workflow</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          What Happens When You Hire Me
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          De-risking every sprint with predictable delivery, transparent communication, and technical rigor.
        </p>
      </div>

      {/* Step Horizontal Pill Nav */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {hireFlowData.map((item) => {
          const isActive = activeStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`px-4 py-2 rounded-full font-mono text-xs flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#4F8CFF] text-white shadow-[0_0_20px_rgba(79,140,255,0.4)]'
                  : 'bg-white/5 border border-white/10 text-[#8A8A8E] hover:text-white'
              }`}
              data-cursor="hover"
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {item.step}
              </span>
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Card */}
      <div className="max-w-4xl mx-auto">
        {hireFlowData.map((item) => {
          if (item.step !== activeStep) return null;

          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard glow className="p-8 border-[#4F8CFF]/40 bg-[#0a0a0c]/90">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 flex flex-col items-start gap-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                    <div className="p-4 rounded-2xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF]">
                      {iconMap[item.iconName]}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#4F8CFF] font-bold">
                        STEP 0{item.step} / 06
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
                      <p className="text-xs font-mono text-[#8A8A8E] mt-1">{item.shortDesc}</p>
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-4">
                    <p className="text-[#8A8A8E] text-base leading-relaxed font-sans">
                      {item.detail}
                    </p>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-[#F5F5F7]">
                      <span>Guaranteed outcome:</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Milestone Delivery
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
