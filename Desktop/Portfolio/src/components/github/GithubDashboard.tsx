import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ContributionHeatmap } from './ContributionHeatmap';
import { Github, GitCommit, FolderGit2, Code, ArrowUpRight, RefreshCw, ExternalLink } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion-variants';
import { CommitActivity } from '../../types/portfolio';
import {
  fetchGithubEvents,
  fetchGithubProfileStats,
  fetchContributionCalendar,
  FALLBACK_COMMITS,
  ContributionDay,
} from '../../services/githubService';

const DEFAULT_USERNAME = 'guruvishnuk';

export const GithubDashboard: React.FC = () => {
  const [commits, setCommits] = useState<CommitActivity[]>(FALLBACK_COMMITS);
  const [totalRepos, setTotalRepos] = useState<number>(24);
  const [totalCommits, setTotalCommits] = useState<number>(125);
  const [contributionDays, setContributionDays] = useState<ContributionDay[]>([]);
  const [languages, setLanguages] = useState<
    { name: string; percentage: number; color: string }[]
  >([
    { name: 'JavaScript', percentage: 48, color: '#F7DF1E' },
    { name: 'TypeScript', percentage: 28, color: '#3178C6' },
    { name: 'Python', percentage: 14, color: '#3572A5' },
    { name: 'HTML & CSS', percentage: 10, color: '#E34F26' },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    const [eventsRes, statsRes, contribRes] = await Promise.all([
      fetchGithubEvents(),
      fetchGithubProfileStats(),
      fetchContributionCalendar(),
    ]);

    setCommits(eventsRes.commits);
    setTotalRepos(statsRes.totalRepos);
    setTotalCommits(statsRes.totalCommits || contribRes.totalContributions);
    setContributionDays(contribRes.days);
    setLanguages(statsRes.languages);
    setIsLive(eventsRes.isLive || statsRes.isLive || contribRes.isLive);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative select-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="pulse">Developer Activity</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
            GitHub Dev Dashboard
          </h2>
          <p className="text-[#8A8A8E] text-base md:text-lg">
            Live open-source statistics, repository metrics, language breakdowns, and contribution heatmap for{' '}
            <span className="text-[#4F8CFF] font-semibold">@{DEFAULT_USERNAME}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="glass-pill px-3 py-2 flex items-center gap-2 text-xs font-mono text-white/70 hover:text-white transition-colors"
            title="Refresh Live GitHub Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <a
            href={`https://github.com/${DEFAULT_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-4 py-2 flex items-center gap-2 text-xs font-mono text-[#F5F5F7] hover:text-[#4F8CFF] transition-colors"
            data-cursor="hover"
          >
            <Github className="w-4 h-4 text-[#4F8CFF]" />
            <span>@{DEFAULT_USERNAME}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
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
              {isLoading ? '...' : totalRepos}
            </div>
            <p className="text-xs text-[#8A8A8E] font-mono">Public repositories & packages</p>
          </GlassCard>
        </motion.div>

        <motion.div variants={fadeInUp} className="lg:col-span-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8A8E] uppercase">Annual Contributions</span>
              <GitCommit className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-4xl font-bold text-white gradient-accent-text">
              {isLoading ? '...' : totalCommits}
            </div>
            <p className="text-xs text-[#8A8A8E] font-mono">Production PRs, commits & activity</p>
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
              {languages.map((lang, idx) => (
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
            <ContributionHeatmap days={contributionDays} totalCommits={totalCommits} />
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
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isLive ? 'Synced via GitHub API' : 'Cached Feed Active'}
              </span>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="py-8 text-center text-xs font-mono text-white/40 animate-pulse">
                  Fetching recent commit activity...
                </div>
              ) : (
                commits.map((commit, idx) => {
                  const targetUrl =
                    commit.url || `https://github.com/${commit.repo}/commit/${commit.sha}`;

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#4F8CFF]/40 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs transition-all hover:bg-white/[0.07]"
                    >
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-[#4F8CFF]/15 border border-[#4F8CFF]/40 text-[#4F8CFF] text-[11px] font-bold hover:bg-[#4F8CFF] hover:text-white transition-all flex items-center gap-1 shrink-0"
                          title="Open commit on GitHub"
                        >
                          <span>{commit.sha}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <a
                          href={`https://github.com/${commit.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F5F5F7] font-semibold hover:text-[#4F8CFF] transition-colors truncate"
                        >
                          {commit.repo}
                        </a>
                      </div>

                      <p className="text-[#8A8A8E] font-sans text-xs flex-1 truncate">{commit.message}</p>

                      <span className="text-[#8A8A8E] text-[10px] whitespace-nowrap shrink-0">
                        {commit.date}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
};
