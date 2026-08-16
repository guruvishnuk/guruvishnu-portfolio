import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { FreshBitesShowcase } from './FreshBitesShowcase';
import { VotingShowcase } from './VotingShowcase';
import { GithubProjectsExplorer } from './GithubProjectsExplorer';
import { Sparkles, Github, Layers } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all-github' | 'case-studies'>('all-github');

  return (
    <section id="projects" className="py-16 relative">
      {/* Section Sub-Navigation Tabs */}
      <div className="flex items-center justify-center mb-12 px-4">
        <div className="inline-flex items-center p-1.5 bg-[#0e0f14]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
          <button
            onClick={() => setActiveTab('all-github')}
            className={`relative px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'all-github' ? 'text-white' : 'text-[#8A8A8E] hover:text-white'
            }`}
          >
            {activeTab === 'all-github' && (
              <motion.div
                layoutId="projectMainTab"
                className="absolute inset-0 bg-[#4F8CFF] rounded-xl shadow-[0_4px_20px_rgba(79,140,255,0.4)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Github className="w-4 h-4 relative z-10" />
            <span className="relative z-10">GitHub Projects & Live Demos</span>
          </button>

          <button
            onClick={() => setActiveTab('case-studies')}
            className={`relative px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'case-studies' ? 'text-white' : 'text-[#8A8A8E] hover:text-white'
            }`}
          >
            {activeTab === 'case-studies' && (
              <motion.div
                layoutId="projectMainTab"
                className="absolute inset-0 bg-[#4F8CFF] rounded-xl shadow-[0_4px_20px_rgba(79,140,255,0.4)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Sparkles className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Featured Case Studies</span>
          </button>
        </div>
      </div>

      {/* Tab Content Views */}
      {activeTab === 'all-github' ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GithubProjectsExplorer />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-4">
            <Badge variant="pulse">Full-Bleed Product Showcases</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
              Featured Production Ships
            </h2>
            <p className="text-[#8A8A8E] text-base md:text-lg">
              Detailed case studies focusing on challenge, technical approach, and measurable outcome.
            </p>
          </div>

          <FreshBitesShowcase />
          <VotingShowcase />
        </motion.div>
      )}
    </section>
  );
};
