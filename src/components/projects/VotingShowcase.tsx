import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { MagneticButton } from '../ui/MagneticButton';
import { DeviceMockup } from './DeviceMockup';
import { projectsData } from '../../data/projects';
import { ExternalLink, Github, ShieldCheck, Lock, Fingerprint, Network } from 'lucide-react';
import { fadeInUp } from '../../lib/motion-variants';

export const VotingShowcase: React.FC = () => {
  const project = projectsData.find((p) => p.id === 'secure-voting') || projectsData[1];

  return (
    <div className="relative py-20 px-6 bg-slate-100/50 dark:bg-[#070b09]/60 border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — 3D Security Mockup */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <DeviceMockup type="voting" />
        </div>

        {/* Right Column — Security Details & Auth Flow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="lg:col-span-6 space-y-6 order-1 lg:order-2"
        >
          <div className="flex items-center gap-3">
            <Badge variant="accent">Zero-Trust Architecture</Badge>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Cryptographically Verified</span>
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-[#F5F5F7]">
            {project.title}
          </h3>
          <p className="text-lg text-emerald-600 dark:text-emerald-400 font-mono">{project.subtitle}</p>

          {/* 3-Step Auth-Flow Diagram */}
          <div className="p-4 rounded-xl bg-white/90 dark:bg-black/40 border border-emerald-500/20 shadow-xs space-y-3 font-mono text-xs text-slate-600 dark:text-[#8A8A8E]">
            <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold text-xs flex items-center gap-2">
              <Network className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              3-Step Authentication Flow Pipeline
            </span>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <span className="block font-bold text-slate-900 dark:text-white text-[11px]">1. Client Auth</span>
                <span className="text-[9px] opacity-80">RSA Keypair</span>
              </div>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <span className="block font-bold text-slate-900 dark:text-white text-[11px]">2. Biometric</span>
                <span className="text-[9px] opacity-80">WebAuthn API</span>
              </div>
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                <span className="block font-bold text-slate-900 dark:text-white text-[11px]">3. Ledger Sync</span>
                <span className="text-[9px] opacity-80">Merkle Tree</span>
              </div>
            </div>
          </div>

          {/* Challenge -> Approach -> Result */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-1 shadow-xs">
              <span className="text-amber-500 dark:text-amber-400 font-mono text-xs font-bold uppercase block">Challenge</span>
              <p className="text-xs text-slate-600 dark:text-[#8A8A8E] leading-relaxed">{project.challenge}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-1 shadow-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold uppercase block">Approach</span>
              <p className="text-xs text-slate-600 dark:text-[#8A8A8E] leading-relaxed">{project.approach}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-1 shadow-xs">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase block">Result</span>
              <p className="text-xs text-slate-600 dark:text-[#8A8A8E] leading-relaxed">{project.result}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 pt-2">
            {project.liveUrl && (
              <MagneticButton variant="accent" asAnchor href={project.liveUrl} target="_blank">
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </MagneticButton>
            )}
            {project.githubUrl && (
              <MagneticButton variant="glass" asAnchor href={project.githubUrl} target="_blank">
                <Github className="w-4 h-4 text-emerald-400" />
                <span>GitHub Repository</span>
              </MagneticButton>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
