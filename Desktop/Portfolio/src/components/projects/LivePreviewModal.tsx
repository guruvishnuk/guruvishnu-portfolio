import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  RefreshCw,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  Lock,
  Globe,
  Loader2,
} from 'lucide-react';
import { GithubRepoItem } from '../../types/portfolio';

interface LivePreviewModalProps {
  repo: GithubRepoItem | null;
  onClose: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({ repo, onClose }) => {
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);

  if (!repo || !repo.homepage) return null;

  const handleRefresh = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const getContainerWidth = () => {
    if (isFullscreen) return 'w-full h-full max-w-none rounded-none';
    switch (device) {
      case 'mobile':
        return 'w-[380px] h-[720px] max-h-[85vh]';
      case 'tablet':
        return 'w-[768px] h-[800px] max-h-[85vh]';
      case 'desktop':
      default:
        return 'w-full max-w-6xl h-[82vh]';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative bg-[#0d0e12] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${getContainerWidth()}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Browser Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#14161d] border-b border-white/10 select-none">
            {/* Window Dots & Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-110 transition-all"
                  title="Close Modal"
                />
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-110 transition-all"
                  title="Toggle Fullscreen"
                />
                <button
                  onClick={handleRefresh}
                  className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-110 transition-all"
                  title="Reload Live View"
                />
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/60 pl-2 border-l border-white/10">
                <span className="font-semibold text-white/90">{repo.name}</span>
                <span className="text-white/30">•</span>
                <span className="text-[#4F8CFF] font-medium">Live Preview</span>
              </div>
            </div>

            {/* URL Address Bar */}
            <div className="flex-1 max-w-lg mx-4 hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0c] border border-white/10 rounded-lg text-xs font-mono text-white/70">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate text-emerald-400/90 font-medium">{repo.homepage}</span>
            </div>

            {/* Controls: Device Selector & Actions */}
            <div className="flex items-center gap-2">
              {/* Device Viewport Buttons */}
              <div className="hidden sm:flex items-center gap-0.5 bg-[#0a0a0c] p-1 border border-white/10 rounded-lg">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                    device === 'desktop'
                      ? 'bg-[#4F8CFF] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevice('tablet')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                    device === 'tablet'
                      ? 'bg-[#4F8CFF] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  title="Tablet View (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                    device === 'mobile'
                      ? 'bg-[#4F8CFF] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  title="Mobile View (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleRefresh}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Reload frame"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F8CFF]/20 hover:bg-[#4F8CFF]/30 text-[#4F8CFF] border border-[#4F8CFF]/40 text-xs font-semibold transition-colors"
                title="Open in new tab"
              >
                <span className="hidden sm:inline">Launch Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors hidden sm:block"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Frame Viewport */}
          <div className="relative flex-1 bg-[#050507] overflow-hidden flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d0e12]/90 backdrop-blur-sm gap-3">
                <Loader2 className="w-8 h-8 text-[#4F8CFF] animate-spin" />
                <div className="text-sm text-white/70 font-medium">Connecting to Live Demo...</div>
                <div className="text-xs text-white/40 font-mono">{repo.homepage}</div>
              </div>
            )}

            <iframe
              key={key}
              src={repo.homepage}
              title={`Live Preview of ${repo.name}`}
              className="w-full h-full border-0 bg-white"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          {/* Bottom Bar Details */}
          <div className="px-4 py-2 bg-[#14161d] border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2 truncate">
              <Globe className="w-3.5 h-3.5 text-[#4F8CFF]" />
              <span className="truncate">{repo.description}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">
                {repo.language || 'Web'}
              </span>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white underline font-mono text-[11px]"
              >
                GitHub Repo &rarr;
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
