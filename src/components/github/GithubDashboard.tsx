import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ContributionHeatmap } from './ContributionHeatmap';
import { githubData } from '../../data/github';
import { Github, GitCommit, FolderGit2, Code, ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';

export const GithubDashboard: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="pulse">Developer Activity</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
            GitHub Dev Dashboard
          </h2>
          <p className="text-[#8A8A8E] text-base md:text-lg">
            Live open-source statistics, repository metrics, language breakdowns, and commit log activity.
          </p>
        </div>

        <a
          href={`https://github.com/${githubData.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#F5F5F7] hover:text-[#4F8CFF] transition-colors self-start md:self-auto"
          data-cursor="hover"
        >
          <Github className="w-4 h-4 text-[#4F8CFF]" />
          <span>@{githubData.username}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Metric Cards Top Row */}
        <motion.div variants={fadeInUp} className="lg:col-span-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8A8E] uppercase">Total Repositories</span>
              <FolderGit2 className="w-5 h-5 text-[#4F8CFF]" />
            </div>
            <div className="text-4xl font-bold text-white gradient-accent-text">
              {githubData.totalRepositories}
            </div>
            <p className="text-xs text-[#8A8A8E] font-mono">Public repositories & packages</p>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeInUp} className="lg:col-span-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8A8E] uppercase">Annual Commits</span>
              <GitCommit className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-4xl font-bold text-white gradient-accent-text">
              {githubData.totalCommitsThisYear}
            </div>
            <p className="text-xs text-[#8A8A8E] font-mono">Production PRs & commits</p>
          </GlassCard>
        </motion.div>

        {/* Top Languages Card */}
        <motion.div variants={fadeInUp} className="lg:col-span-4">
          <GlassCard className="p-6 h-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8A8E] uppercase">Language Distribution</span>
              <Code className="w-5 h-5 text-purple-400" />
            </div>

            <div className="space-y-2">
              {githubData.topLanguages.map((lang, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#F5F5F7]">{lang.name}</span>
                    <span className="text-[#8A8A8E]">{lang.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Contribution Heatmap Full Width */}
        <motion.div variants={fadeInUp} className="lg:col-span-12">
          <GlassCard className="p-6 md:p-8">
            <ContributionHeatmap />
          </GlassCard>
        </motion.div>

        {/* Latest Commits Feed */}
        <motion.div variants={fadeInUp} className="lg:col-span-12">
          <GlassCard className="p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-[#8A8A8E] uppercase flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-[#4F8CFF]" />
                Recent Commit Activity Feed
              </span>
              <span className="text-xs font-mono text-emerald-400">Synced via GitHub API</span>
            </div>

            <div className="space-y-3">
              {githubData.latestCommits.map((commit, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2 font-mono text-xs hover:border-[#4F8CFF]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 text-[#4F8CFF] text-[10px]">
                      {commit.sha}
                    </span>
                    <span className="text-[#F5F5F7] font-semibold">{commit.repo}</span>
                  </div>
                  <p className="text-[#8A8A8E] truncate max-w-md font-sans text-xs">{commit.message}</p>
                  <span className="text-[#8A8A8E] text-[10px] whitespace-nowrap">{commit.date}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
};
