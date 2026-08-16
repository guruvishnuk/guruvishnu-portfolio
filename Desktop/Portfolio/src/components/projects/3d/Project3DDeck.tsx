import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Star,
  GitFork,
  Sparkles,
  RotateCw,
  Eye,
  Github,
  Code2,
} from 'lucide-react';
import { GithubRepoItem } from '../../../types/portfolio';
import { SIGNATURE_EASE } from '../../../lib/utils';

interface Project3DDeckProps {
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

export const Project3DDeck: React.FC<Project3DDeckProps> = ({ repos, onSelectLiveDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt values for active card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 20 });

  const total = repos.length;

  useEffect(() => {
    if (!isAutoSpin || total === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoSpin, total]);

  const handleNext = () => {
    setIsAutoSpin(false);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setIsAutoSpin(false);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto min-h-[580px] sm:min-h-[640px] py-8 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Holographic Glow & Radial Grids */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-radial from-[#4F8CFF]/15 via-purple-600/5 to-transparent blur-3xl" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-dashed border-[#4F8CFF]/10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[420px] h-[420px] rounded-full border border-white/5" />
      </div>

      {/* 3D Perspective Card Deck Stage */}
      <div className="relative w-full h-[400px] sm:h-[440px] flex items-center justify-center perspective-[1200px]">
        {repos.map((repo, idx) => {
          // Calculate relative position index from activeIndex
          let offset = idx - activeIndex;
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          const isActive = offset === 0;

          // Compute 3D Cylindrical positioning transforms
          const rotateY = offset * 28; // Rotate around Y axis
          const translateZ = isActive ? 120 : -Math.abs(offset) * 140 - 60; // Push inactive cards back
          const translateX = offset * 210; // Spread along horizontal line
          const scale = isActive ? 1.05 : Math.max(0.7, 1 - Math.abs(offset) * 0.15);
          const opacity = Math.max(0.15, 1 - Math.abs(offset) * 0.35);
          const zIndex = 20 - Math.abs(offset);

          const langColor = LANGUAGE_COLORS[repo.language || ''] || '#8A8A8E';

          return (
            <motion.div
              key={repo.id}
              onClick={() => {
                if (!isActive) {
                  setIsAutoSpin(false);
                  setActiveIndex(idx);
                }
              }}
              animate={{
                rotateY: rotateY,
                translateX: `${translateX}px`,
                translateZ: `${translateZ}px`,
                scale: scale,
                opacity: opacity,
              }}
              style={{
                zIndex: zIndex,
                transformStyle: 'preserve-3d',
                rotateX: isActive ? tiltX : 0,
                rotateY: isActive ? tiltY : rotateY,
              }}
              transition={{ duration: 0.6, ease: SIGNATURE_EASE }}
              className={`absolute top-0 w-[300px] sm:w-[360px] h-[380px] sm:h-[420px] rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#0f121d]/90 border-2 border-[#4F8CFF] shadow-[0_20px_50px_rgba(79,140,255,0.35)] backdrop-blur-2xl ring-1 ring-white/20'
                  : 'bg-[#0a0b0f]/80 border border-white/10 hover:border-white/20 backdrop-blur-md shadow-xl'
              }`}
            >
              {/* Card Top: 3D Hologram Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: langColor, color: langColor }}
                    />
                    <span className="text-xs font-mono font-semibold text-white/80">
                      {repo.language || 'Code'}
                    </span>
                  </span>

                  {repo.hasLiveDemo ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Demo Available
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-mono text-[10px]">
                      GitHub Source
                    </span>
                  )}
                </div>

                {/* Repo Title */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#4F8CFF] transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  <p className="text-xs font-mono text-white/40 truncate">{repo.full_name}</p>
                </div>

                {/* Repo Description */}
                <p className="text-xs sm:text-sm text-[#8A8A8E] line-clamp-3 leading-relaxed">
                  {repo.description || 'GitHub open-source repository.'}
                </p>

                {/* Topics / Tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {repo.topics.slice(0, 3).map((topic) => (
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

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {isActive ? (
                  <div className="flex items-center gap-2">
                    {repo.hasLiveDemo ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLiveDemo(repo);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,140,255,0.5)] active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Launch Live Demo</span>
                      </button>
                    ) : (
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-white/10"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Inspect Code</span>
                      </a>
                    )}

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
                      title="Open GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs font-mono text-white/40">
                    Click card to focus 3D perspective
                  </div>
                )}

                {/* Stars & Forks metrics */}
                <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
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
                  <span>Card {idx + 1} / {total}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3D Carousel Controls */}
      <div className="mt-8 flex items-center gap-4 z-30">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
          title="Previous 3D Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Index Dots */}
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0a0a0c]/80 border border-white/10 backdrop-blur-md">
          {repos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoSpin(false);
                setActiveIndex(i);
              }}
              className={`transition-all rounded-full ${
                i === activeIndex
                  ? 'w-6 h-2 bg-[#4F8CFF] shadow-[0_0_10px_#4F8CFF]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
          title="Next 3D Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Auto Orbit Spin Toggle */}
        <button
          onClick={() => setIsAutoSpin(!isAutoSpin)}
          className={`p-3 rounded-full border transition-all hover:scale-105 ${
            isAutoSpin
              ? 'bg-[#4F8CFF]/20 border-[#4F8CFF]/50 text-[#4F8CFF]'
              : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
          }`}
          title={isAutoSpin ? 'Pause 3D Orbit' : 'Play 3D Orbit'}
        >
          <RotateCw className={`w-4 h-4 ${isAutoSpin ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
