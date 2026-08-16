import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { GlassCard } from '../ui/GlassCard';
import { skillsData } from '../../data/skills';
import { SkillCategory } from '../../types/portfolio';
import { SkillPopover } from './SkillPopover';
import { Atom, Code, Database, FileCode2, GitBranch, Globe, Layout, Network, Palette, Server, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const iconMap: Record<string, React.ReactNode> = {
  Atom: <Atom className="w-5 h-5 text-[#4F8CFF]" />,
  FileCode2: <FileCode2 className="w-5 h-5 text-[#38BDF8]" />,
  Globe: <Globe className="w-5 h-5 text-[#4F8CFF]" />,
  Code: <Code className="w-5 h-5 text-amber-400" />,
  Server: <Server className="w-5 h-5 text-orange-400" />,
  Network: <Network className="w-5 h-5 text-emerald-400" />,
  Database: <Database className="w-5 h-5 text-blue-400" />,
  Palette: <Palette className="w-5 h-5 text-teal-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#4F8CFF]" />,
  GitBranch: <GitBranch className="w-5 h-5 text-purple-400" />,
  Layout: <Layout className="w-5 h-5 text-rose-400" />,
};

export const OrbitSystem: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillCategory | null>(null);
  const prefersReduced = useReducedMotion();

  const coreSkills = skillsData.filter((s) => s.ring === 'Core');
  const backendSkills = skillsData.filter((s) => s.ring === 'Backend');
  const craftSkills = skillsData.filter((s) => s.ring === 'Craft');

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <SkillPopover skill={selectedSkill} onClose={() => setSelectedSkill(null)} />

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Tech Stack & Ecosystem</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Interactive Orbit System
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Click any skill planet on the concentric orbit rings to view real production context and experience.
        </p>
      </div>

      {/* Orbit Visual Container */}
      <div className="relative w-full max-w-[700px] h-[580px] sm:h-[650px] mx-auto flex items-center justify-center">
        {/* Core Glowing React Logo */}
        <motion.div
          className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0a0a0c] border-2 border-[#4F8CFF] shadow-[0_0_50px_rgba(79,140,255,0.4)] flex flex-col items-center justify-center gap-1 cursor-pointer"
          animate={{ rotate: prefersReduced ? 0 : 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          data-cursor="hover"
        >
          <Atom className="w-10 h-10 text-[#4F8CFF] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[#F5F5F7]">CORE</span>
        </motion.div>

        {/* Ring 1 — Core Skills (Radius 140px) */}
        <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/10 pointer-events-none">
          <motion.div
            className="w-full h-full relative"
            animate={{ rotate: prefersReduced ? 0 : 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          >
            {coreSkills.map((skill, idx) => {
              const angle = (idx / coreSkills.length) * (2 * Math.PI);
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(skill)}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px - 22px)`,
                    top: `calc(50% + ${y}px - 22px)`,
                  }}
                  data-cursor="hover"
                >
                  <motion.div
                    animate={{ rotate: prefersReduced ? 0 : -360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#0a0a0c] border border-white/15 hover:border-[#4F8CFF] hover:bg-[#4F8CFF]/20 backdrop-blur-xl flex items-center justify-center shadow-lg transition-all">
                      {iconMap[skill.iconName] || <Code className="w-5 h-5 text-[#4F8CFF]" />}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#F5F5F7] bg-black/60 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap border border-white/10">
                      {skill.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Ring 2 — Backend Ring (Radius 220px) */}
        <div className="absolute w-[440px] h-[440px] sm:w-[480px] sm:h-[480px] rounded-full border border-white/10 pointer-events-none">
          <motion.div
            className="w-full h-full relative"
            animate={{ rotate: prefersReduced ? 0 : -360 }}
            transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
          >
            {backendSkills.map((skill, idx) => {
              const angle = (idx / backendSkills.length) * (2 * Math.PI);
              const radius = 220;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(skill)}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px - 22px)`,
                    top: `calc(50% + ${y}px - 22px)`,
                  }}
                  data-cursor="hover"
                >
                  <motion.div
                    animate={{ rotate: prefersReduced ? 0 : 360 }}
                    transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#0a0a0c] border border-white/15 hover:border-orange-400 hover:bg-orange-400/20 backdrop-blur-xl flex items-center justify-center shadow-lg transition-all">
                      {iconMap[skill.iconName] || <Server className="w-5 h-5 text-orange-400" />}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#F5F5F7] bg-black/60 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap border border-white/10">
                      {skill.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Ring 3 — Craft Ring (Radius 280px) */}
        <div className="absolute w-[560px] h-[560px] sm:w-[600px] sm:h-[600px] rounded-full border border-dashed border-white/10 pointer-events-none hidden sm:block">
          <motion.div
            className="w-full h-full relative"
            animate={{ rotate: prefersReduced ? 0 : 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          >
            {craftSkills.map((skill, idx) => {
              const angle = (idx / craftSkills.length) * (2 * Math.PI);
              const radius = 280;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(skill)}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: `calc(50% + ${x}px - 22px)`,
                    top: `calc(50% + ${y}px - 22px)`,
                  }}
                  data-cursor="hover"
                >
                  <motion.div
                    animate={{ rotate: prefersReduced ? 0 : -360 }}
                    transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#0a0a0c] border border-white/15 hover:border-[#38BDF8] hover:bg-[#38BDF8]/20 backdrop-blur-xl flex items-center justify-center shadow-lg transition-all">
                      {iconMap[skill.iconName] || <Sparkles className="w-5 h-5 text-[#38BDF8]" />}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#F5F5F7] bg-black/60 px-1.5 py-0.5 rounded mt-1 whitespace-nowrap border border-white/10">
                      {skill.name}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Static Mobile List Fallback */}
      <div className="mt-12 sm:hidden grid grid-cols-2 gap-3">
        {skillsData.map((skill, idx) => (
          <GlassCard
            key={idx}
            onClick={() => setSelectedSkill(skill)}
            className="p-3 flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              {iconMap[skill.iconName] || <Code className="w-4 h-4 text-[#4F8CFF]" />}
            </div>
            <div>
              <p className="text-xs font-bold text-[#F5F5F7]">{skill.name}</p>
              <p className="text-[10px] font-mono text-[#8A8A8E]">{skill.ring}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
