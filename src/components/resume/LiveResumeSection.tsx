import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { LiveResumePaper } from './LiveResumePaper';
import { FileText, Sparkles } from 'lucide-react';

export const LiveResumeSection: React.FC = () => {
  return (
    <section id="live-resume" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <Badge variant="pulse" className="px-4 py-1.5 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] inline mr-1" />
          Interactive Resume Engine
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--theme-text-primary)]">
          Live Production Resume
        </h2>
        <p className="text-[var(--theme-text-secondary)] text-base sm:text-lg">
          Inspect, copy, or print the exact production resume document for Guruvishnu B Kajagar.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <LiveResumePaper showControls={true} />
      </motion.div>
    </section>
  );
};
