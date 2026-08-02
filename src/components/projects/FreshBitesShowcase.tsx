import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { MagneticButton } from '../ui/MagneticButton';
import { DeviceMockup } from './DeviceMockup';
import { projectsData } from '../../data/projects';
import { ExternalLink, Github, Gauge, Target, Cpu, CheckCircle2 } from 'lucide-react';
import { fadeInUp } from '../../lib/motion-variants';

export const FreshBitesShowcase: React.FC = () => {
  const project = projectsData.find((p) => p.id === 'fresh-bites') || projectsData[0];

  return (
    <div className="relative border-b border-white/10 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — Project Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="lg:col-span-6 space-y-6"
        >
          <div className="flex items-center gap-3">
            <Badge variant="pulse">Featured Product</Badge>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Gauge className="w-3.5 h-3.5" />
              <span>Lighthouse {project.lighthouseScore}/100</span>
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-[#F5F5F7]">
            {project.title}
          </h3>
          <p className="text-lg text-[#4F8CFF] font-mono">{project.subtitle}</p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#8A8A8E]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Challenge -> Approach -> Result 3-Column Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold uppercase">
                <Target className="w-3.5 h-3.5" />
                <span>Challenge</span>
              </div>
              <p className="text-xs text-[#8A8A8E] leading-relaxed">{project.challenge}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-[#4F8CFF] font-mono text-xs font-bold uppercase">
                <Cpu className="w-3.5 h-3.5" />
                <span>Approach</span>
              </div>
              <p className="text-xs text-[#8A8A8E] leading-relaxed">{project.approach}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Result</span>
              </div>
              <p className="text-xs text-[#8A8A8E] leading-relaxed">{project.result}</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 pt-4">
            {project.liveUrl && (
              <MagneticButton variant="accent" asAnchor href={project.liveUrl} target="_blank">
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </MagneticButton>
            )}
            {project.githubUrl && (
              <MagneticButton variant="glass" asAnchor href={project.githubUrl} target="_blank">
                <Github className="w-4 h-4 text-[#4F8CFF]" />
                <span>GitHub Code</span>
              </MagneticButton>
            )}
          </div>
        </motion.div>

        {/* Right Column — 3D Perspective Mockup */}
        <div className="lg:col-span-6">
          <DeviceMockup type="freshbites" />
        </div>
      </div>
    </div>
  );
};
