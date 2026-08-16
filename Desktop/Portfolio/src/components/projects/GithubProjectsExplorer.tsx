import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Search,
  ExternalLink,
  Star,
  GitFork,
  Eye,
  RefreshCw,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Play,
  Box,
  Orbit,
  LayoutGrid,
} from 'lucide-react';
import { GithubRepoItem, ProjectCategoryFilter } from '../../types/portfolio';
import { fetchUserRepositories } from '../../services/githubService';
import { LivePreviewModal } from './LivePreviewModal';
import { Project3DDeck } from './3d/Project3DDeck';
import { ProjectGalaxyCanvas } from './3d/ProjectGalaxyCanvas';
import { Badge } from '../ui/Badge';
import { SIGNATURE_EASE } from '../../lib/utils';

type View3DMode = '3d-deck' | '3d-galaxy' | 'grid';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Shell: '#89E051',
  React: '#61DAFB',
};

export const GithubProjectsExplorer: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>('all');
  const [viewMode, setViewMode] = useState<View3DMode>('3d-deck');
  const [selectedPreviewRepo, setSelectedPreviewRepo] = useState<GithubRepoItem | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    const result = await fetchUserRepositories();
    setRepos(result.repos);
    setIsLiveApi(result.isLive);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      // Category filter
      if (activeCategory === 'web') {
        const lang = (repo.language || '').toLowerCase();
        if (!['typescript', 'javascript', 'html', 'css'].includes(lang) && repo.category !== 'web') {
          return false;
        }
      } else if (activeCategory === 'javascript') {
        const lang = (repo.language || '').toLowerCase();
        if (!['typescript', 'javascript'].includes(lang)) {
          return false;
        }
      } else if (activeCategory === 'python') {
        const lang = (repo.language || '').toLowerCase();
        if (lang !== 'python' && repo.category !== 'python') {
          return false;
        }
      } else if (activeCategory === 'starred') {
        if (!repo.featured && repo.stargazers_count === 0 && !repo.hasLiveDemo) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = repo.name.toLowerCase().includes(q);
        const matchesDesc = (repo.description || '').toLowerCase().includes(q);
        const matchesLang = (repo.language || '').toLowerCase().includes(q);
        const matchesTopics = repo.topics.some((t) => t.toLowerCase().includes(q));

        return matchesName || matchesDesc || matchesLang || matchesTopics;
      }

      return true;
    });
  }, [repos, activeCategory, searchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Header & Description */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <Badge variant="pulse">Interactive 3D GitHub Experience</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Out-of-the-Box 3D Projects Showcase
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Experience <span className="text-[#4F8CFF] font-semibold">@guruvishnuk</span> GitHub repositories in animated 3D space.
          Select <span className="text-emerald-400 font-medium">"Live Demo"</span> to launch live applications directly.
        </p>

        {/* Live API Status Indicator */}
        <div className="pt-2 flex items-center justify-center gap-3 text-xs font-mono text-[#8A8A8E]">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {isLiveApi ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-medium">GitHub REST API Active</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-amber-300">Cached Dataset Active</span>
              </>
            )}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">{repos.length} Repositories</span>

          <button
            onClick={loadData}
            disabled={isLoading}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Refresh Repositories"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Control Bar: 3D View Switcher, Category Pills & Search */}
      <div className="space-y-4 mb-8">
        {/* Top Control Layer: 3D Style Mode Selector */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 bg-[#0a0b0f] border border-white/15 rounded-2xl shadow-2xl backdrop-blur-xl">
            {[
              { id: '3d-deck', label: '3D Cyber Deck', icon: <Box className="w-4 h-4" /> },
              { id: '3d-galaxy', label: '3D Galaxy System', icon: <Orbit className="w-4 h-4" /> },
              { id: 'grid', label: 'Cyber Grid View', icon: <LayoutGrid className="w-4 h-4" /> },
            ].map((mode) => {
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as View3DMode)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-[#8A8A8E] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeView3DMode"
                      className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-blue-600 rounded-xl shadow-[0_0_20px_rgba(79,140,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{mode.icon}</span>
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Second Control Layer: Category Pills & Realtime Search (For Grid View) */}
        {viewMode === 'grid' && (
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0e0f14]/80 backdrop-blur-xl p-3 border border-white/10 rounded-2xl shadow-xl">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Projects', count: repos.length },
                { id: 'web', label: 'Web Apps', count: repos.filter((r) => r.category === 'web').length },
                {
                  id: 'javascript',
                  label: 'React / JS / TS',
                  count: repos.filter((r) => ['typescript', 'javascript'].includes((r.language || '').toLowerCase()))
                    .length,
                },
                {
                  id: 'python',
                  label: 'Python & Data',
                  count: repos.filter((r) => (r.language || '').toLowerCase() === 'python').length,
                },
                {
                  id: 'starred',
                  label: 'Featured / Live',
                  count: repos.filter((r) => r.hasLiveDemo || r.featured).length,
                },
              ].map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ProjectCategoryFilter)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                      isActive ? 'text-white' : 'text-[#8A8A8E] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeRepoCategory"
                        className="absolute inset-0 bg-[#4F8CFF]/20 border border-[#4F8CFF]/40 rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 font-semibold">{cat.label}</span>
                    <span
                      className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-[#4F8CFF] text-white' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Real-time Search Box */}
            <div className="relative min-w-[240px] md:min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#4F8CFF]/60 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main View Area: Render 3D Deck, 3D Galaxy, or Cyber Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-white/50 animate-pulse font-mono text-sm">
          Loading 3D Repositories Environment...
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === '3d-deck' && (
            <motion.div
              key="3d-deck"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Project3DDeck
                repos={repos}
                onSelectLiveDemo={(repo) => setSelectedPreviewRepo(repo)}
              />
            </motion.div>
          )}

          {viewMode === '3d-galaxy' && (
            <motion.div
              key="3d-galaxy"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectGalaxyCanvas
                repos={repos}
                onSelectLiveDemo={(repo) => setSelectedPreviewRepo(repo)}
              />
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRepos.map((repo) => {
                const langColor = LANGUAGE_COLORS[repo.language || ''] || '#8A8A8E';
                const updatedDateFormatted = new Date(repo.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative bg-[#0e1017] hover:bg-[#12151f] border border-white/10 hover:border-[#4F8CFF]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(79,140,255,0.15)]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: langColor }}
                          />
                          <span className="text-xs font-mono text-white/70">{repo.language || 'Code'}</span>
                        </div>

                        {repo.hasLiveDemo && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live App
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-[#4F8CFF] transition-colors truncate">
                        {repo.name}
                      </h3>

                      <p className="text-xs md:text-sm text-[#8A8A8E] line-clamp-3 leading-relaxed">
                        {repo.description || 'No description provided.'}
                      </p>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {repo.topics.slice(0, 4).map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/60"
                            >
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        {repo.hasLiveDemo ? (
                          <button
                            onClick={() => setSelectedPreviewRepo(repo)}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#4F8CFF] hover:bg-[#3b76e6] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(79,140,255,0.4)]"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Live Demo</span>
                          </button>
                        ) : (
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>View Code</span>
                          </a>
                        )}

                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                          title="Open GitHub Repository"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-white/40 font-mono pt-1">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3 text-white/40" />
                            {repo.forks_count}
                          </span>
                        </div>
                        <span>Updated {updatedDateFormatted}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Live Preview Modal */}
      <LivePreviewModal repo={selectedPreviewRepo} onClose={() => setSelectedPreviewRepo(null)} />
    </div>
  );
};
