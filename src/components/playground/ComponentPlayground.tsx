import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ComponentTreeViz } from './ComponentTreeViz';
import { Sliders, RefreshCw, Zap, Play } from 'lucide-react';
import { fadeInUp } from '../../lib/motion-variants';

const colorSwatches = [
  { name: 'Vercel Blue', value: '#4F8CFF' },
  { name: 'Linear Emerald', value: '#10B981' },
  { name: 'Amber Glow', value: '#F59E0B' },
  { name: 'Framer Pink', value: '#EC4899' },
  { name: 'Tesla Purple', value: '#8B5CF6' },
];

export const ComponentPlayground: React.FC = () => {
  const [accentColor, setAccentColor] = useState('#4F8CFF');
  const [animSpeed, setAnimSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1200 / animSpeed);
  };

  return (
    <section id="playground" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Interactive Playground</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Live Component Sandbox
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Prove it, don't tell it—customize design tokens, animation speed multipliers, and inspect component node trees live.
        </p>
      </div>

      <GlassCard className="p-6 md:p-8 bg-[#0a0a0c]/90 border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-[#8A8A8E] flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#4F8CFF]" />
                Accent Theme Token
              </label>
              <div className="flex flex-wrap gap-3">
                {colorSwatches.map((swatch) => (
                  <button
                    key={swatch.value}
                    onClick={() => setAccentColor(swatch.value)}
                    className={`w-9 h-9 rounded-full transition-all border-2 flex items-center justify-center cursor-pointer ${
                      accentColor === swatch.value
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: swatch.value }}
                    title={swatch.name}
                    data-cursor="hover"
                  />
                ))}
              </div>
            </div>

            {/* Animation Speed Multiplier */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-[#8A8A8E] flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Motion Speed Multiplier ({animSpeed}x)
              </label>
              <div className="flex gap-2">
                {[0.5, 1, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setAnimSpeed(speed)}
                    className={`flex-1 py-2 rounded-lg font-mono text-xs border transition-all cursor-pointer ${
                      animSpeed === speed
                        ? 'bg-white/15 border-white text-white font-bold'
                        : 'bg-white/5 border-white/10 text-[#8A8A8E] hover:text-white'
                    }`}
                    data-cursor="hover"
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Component Tree Inspection */}
            <ComponentTreeViz accentColor={accentColor} />
          </div>

          {/* Right Live Preview Box */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 md:p-8 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
              {/* Dynamic Glow Layer */}
              <div
                className="absolute inset-0 opacity-15 blur-[60px] pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: accentColor }}
              />

              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-mono text-[#8A8A8E]">Live Output Component</span>
                <button
                  onClick={triggerAnimation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-white bg-white/10 border border-white/15 hover:bg-white/20 transition-all cursor-pointer"
                  data-cursor="hover"
                >
                  <Play className="w-3 h-3" />
                  <span>Re-Trigger Animation</span>
                </button>
              </div>

              {/* Animated Live Card Output */}
              <div className="my-auto z-10 py-6">
                <motion.div
                  key={`${accentColor}-${animSpeed}-${isAnimating}`}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6 / animSpeed, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-xl bg-white/5 border border-white/15 shadow-2xl space-y-4 max-w-md mx-auto"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase"
                      style={{
                        backgroundColor: `${accentColor}25`,
                        color: accentColor,
                        border: `1px solid ${accentColor}50`,
                      }}
                    >
                      Dynamic Theme Token
                    </span>
                    <span className="text-xs font-mono text-[#8A8A8E]">60 FPS</span>
                  </div>

                  <h4 className="text-xl font-bold text-white">System Primitive Card</h4>
                  <p className="text-xs text-[#8A8A8E] leading-relaxed">
                    React 19 compound component receiving token updates in real-time.
                  </p>

                  <div className="pt-2">
                    <button
                      className="w-full py-2.5 rounded-lg text-xs font-bold text-white transition-all shadow-lg cursor-pointer"
                      style={{ backgroundColor: accentColor }}
                    >
                      Active State CTA
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="text-center font-mono text-[10px] text-[#8A8A8E] z-10">
                Tokens: <span style={{ color: accentColor }}>{accentColor}</span> | Speed: {animSpeed}x
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};
