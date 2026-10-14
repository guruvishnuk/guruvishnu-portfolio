import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { Sparkles, Move } from 'lucide-react';

const tags = [
  { name: 'Analytics Dashboards', color: '#4F8CFF' },
  { name: '60FPS Micro-Animations', color: '#EC4899' },
  { name: 'Performance Tooling', color: '#10B981' },
  { name: 'Design System Primitives', color: '#F59E0B' },
  { name: 'Developer Tooling', color: '#8B5CF6' },
  { name: 'React 19 Concurrent Apps', color: '#38BDF8' },
  { name: 'Web Workers Ingestion', color: '#F97316' },
  { name: 'Zero-Trust Auth Flows', color: '#14B8A6' },
];

export const TagCloud: React.FC = () => {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center relative overflow-hidden">
      <div className="space-y-4 mb-12">
        <Badge variant="pulse">Playful Crafts</Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F7]">
          Things I Love Building
        </h2>
        <p className="text-slate-600 dark:text-[#8A8A8E] text-sm sm:text-base flex items-center justify-center gap-1.5 font-sans">
          <Move className="w-4 h-4 text-blue-600 dark:text-[#4F8CFF]" />
          <span>Interactive drag-enabled tech chips—try tossing them around!</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-6 max-w-4xl mx-auto">
        {tags.map((tag, idx) => (
          <motion.div
            key={idx}
            drag
            dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.08, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, (idx % 2 === 0 ? -6 : 6), 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 4 + (idx % 3), ease: 'easeInOut' },
            }}
            className="glass-pill px-5 py-2.5 flex items-center gap-2.5 cursor-grab active:cursor-grabbing border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-[#0a0a0c]/80 shadow-md dark:shadow-xl select-none"
            data-cursor="hover"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: tag.color, boxShadow: `0 0 10px ${tag.color}` }}
            />
            <span className="text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-[#F5F5F7]">
              {tag.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
