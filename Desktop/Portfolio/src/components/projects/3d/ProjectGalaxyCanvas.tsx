import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  ExternalLink,
  Star,
  GitFork,
  Globe,
  Code,
  Terminal,
  Zap,
} from 'lucide-react';
import { GithubRepoItem } from '../../../types/portfolio';

interface ProjectGalaxyCanvasProps {
  repos: GithubRepoItem[];
  onSelectLiveDemo: (repo: GithubRepoItem) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Shell: '#89E051',
};

export const ProjectGalaxyCanvas: React.FC<ProjectGalaxyCanvasProps> = ({ repos, onSelectLiveDemo }) => {
  const [hoveredRepo, setHoveredRepo] = useState<GithubRepoItem | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isOrbiting, setIsOrbiting] = useState(true);

  useEffect(() => {
    if (!isOrbiting) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isOrbiting]);

  // Group repos into 2 concentric rings
  const innerRing = repos.slice(0, Math.ceil(repos.length / 2));
  const outerRing = repos.slice(Math.ceil(repos.length / 2));

  return (
    <div className="relative w-full max-w-6xl mx-auto min-h-[600px] sm:min-h-[660px] py-6 flex flex-col items-center justify-center select-none overflow-hidden rounded-3xl bg-[#07080c]/90 border border-white/10 shadow-2xl">
      {/* Background Cosmic Grid & Particle Dust */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[650px] h-[650px] rounded-full bg-radial from-[#4F8CFF]/10 via-purple-900/5 to-transparent blur-3xl" />

        {/* Ambient Floating Particle Dust */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30 animate-ping"
            style={{
              left: `${15 + ((i * 37) % 70)}%`,
              top: `${10 + ((i * 43) % 80)}%`,
              animationDuration: `${2 + (i % 4)}s`,
              opacity: 0.2 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Galaxy Core Header */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono text-white/80">
        <Sparkles className="w-3.5 h-3.5 text-[#4F8CFF] animate-spin" />
        <span>Interactive Project Galaxy</span>
        <span className="text-white/30">•</span>
        <button
          onClick={() => setIsOrbiting(!isOrbiting)}
          className="text-[#4F8CFF] hover:underline"
        >
          {isOrbiting ? 'Pause Orbit' : 'Resume Orbit'}
        </button>
      </div>

      {/* Orbit Galaxy Visual Container */}
      <div className="relative w-full max-w-[620px] h-[480px] sm:h-[540px] mx-auto flex items-center justify-center">
        {/* Central Core Node (@guruvishnuk) */}
        <div className="absolute z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0a0a0c] border-2 border-[#4F8CFF] shadow-[0_0_60px_rgba(79,140,255,0.5)] flex flex-col items-center justify-center gap-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#4F8CFF]/20 border border-[#4F8CFF] flex items-center justify-center text-[#4F8CFF] font-bold">
            GK
          </div>
          <span className="text-[10px] font-mono font-bold text-[#F5F5F7]">@guruvishnuk</span>
          <span className="text-[9px] font-mono text-emerald-400">HUB CORE</span>
        </div>

        {/* Ring 1 — Inner Orbit (Radius 160px) */}
        <div className="absolute w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#4F8CFF]/20 shadow-[0_0_20px_rgba(79,140,255,0.1)] pointer-events-none">
          <div className="w-full h-full relative">
            {innerRing.map((repo, idx) => {
              const baseAngle = (idx / innerRing.length) * 360;
              const currentAngle = ((baseAngle + rotationAngle) * Math.PI) / 180;
              const radius = 175;
              const x = Math.cos(currentAngle) * radius;
              const y = Math.sin(currentAngle) * radius;
              const langColor = LANGUAGE_COLORS[repo.language || ''] || '#8A8A8E';

              return (
                <div
                  key={repo.id}
                  onMouseEnter={() => setHoveredRepo(repo)}
                  onClick={() => {
                    if (repo.hasLiveDemo) onSelectLiveDemo(repo);
                    else window.open(repo.html_url, '_blank');
                  }}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Glowing Planet Node */}
                    <div
                      className={`w-12 h-12 rounded-full bg-[#0d0e14] border-2 transition-all duration-300 flex items-center justify-center shadow-lg group-hover:scale-125 ${
                        repo.hasLiveDemo
                          ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                          : 'border-white/20 group-hover:border-[#4F8CFF] shadow-[0_0_15px_rgba(79,140,255,0.3)]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                        style={{ backgroundColor: langColor, color: langColor }}
                      />
                    </div>

                    {/* Planet Label */}
                    <span className="text-[10px] font-mono font-semibold text-white bg-black/80 px-2 py-0.5 rounded-full mt-1.5 whitespace-nowrap border border-white/10 group-hover:border-[#4F8CFF] group-hover:text-[#4F8CFF] transition-colors">
                      {repo.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ring 2 — Outer Orbit (Radius 250px) */}
        <div className="absolute w-[500px] h-[500px] sm:w-[540px] sm:h-[540px] rounded-full border border-dashed border-white/10 pointer-events-none">
          <div className="w-full h-full relative">
            {outerRing.map((repo, idx) => {
              const baseAngle = (idx / outerRing.length) * 360;
              // Rotate outer ring counter-clockwise
              const currentAngle = ((baseAngle - rotationAngle * 0.7) * Math.PI) / 180;
              const radius = 260;
              const x = Math.cos(currentAngle) * radius;
              const y = Math.sin(currentAngle) * radius;
              const langColor = LANGUAGE_COLORS[repo.language || ''] || '#8A8A8E';

              return (
                <div
                  key={repo.id}
                  onMouseEnter={() => setHoveredRepo(repo)}
                  onClick={() => {
                    if (repo.hasLiveDemo) onSelectLiveDemo(repo);
                    else window.open(repo.html_url, '_blank');
                  }}
                  className="absolute pointer-events-auto cursor-pointer group"
                  style={{
                    left: `calc(50% + ${x}px - 22px)`,
                    top: `calc(50% + ${y}px - 22px)`,
                  }}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Glowing Star Node */}
                    <div
                      className={`w-11 h-11 rounded-full bg-[#0d0e14] border transition-all duration-300 flex items-center justify-center shadow-lg group-hover:scale-125 ${
                        repo.hasLiveDemo
                          ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                          : 'border-white/15 group-hover:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: langColor, color: langColor }}
                      />
                    </div>

                    <span className="text-[10px] font-mono text-white/80 bg-black/80 px-2 py-0.5 rounded-full mt-1.5 whitespace-nowrap border border-white/10 group-hover:text-purple-300 transition-colors">
                      {repo.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Holographic HUD Telemetry Card (Bottom) */}
      <div className="w-full max-w-2xl px-6 min-h-[90px] flex items-center justify-between bg-[#0e1017]/90 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-xl">
        {hoveredRepo ? (
          <div className="flex-1 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">{hoveredRepo.name}</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono text-[10px]">
                  {hoveredRepo.language || 'Code'}
                </span>
                {hoveredRepo.hasLiveDemo && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    Live Demo Ready
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8A8A8E] line-clamp-1">{hoveredRepo.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {hoveredRepo.hasLiveDemo ? (
                <button
                  onClick={() => onSelectLiveDemo(hoveredRepo)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#4F8CFF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(79,140,255,0.4)] transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live</span>
                </button>
              ) : (
                <a
                  href={hoveredRepo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-xs font-mono text-white/40 py-2">
            Hover over any orbiting project star node to view telemetry & launch live demo
          </div>
        )}
      </div>
    </div>
  );
};
