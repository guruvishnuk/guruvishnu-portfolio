import React from 'react';
import { ContributionDay } from '../../services/githubService';

interface ContributionHeatmapProps {
  days?: ContributionDay[];
  totalCommits?: number;
}

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  days = [],
  totalCommits = 125,
}) => {
  // If live days array is empty, generate 28 weeks x 7 days heat grid fallback
  const totalSlots = 28 * 7; // 196 days grid
  const displayDays =
    days.length > 0
      ? days
      : Array.from({ length: totalSlots }).map((_, idx) => {
          const seed = (idx * 17 + 5) % 100;
          let intensity = 0;
          if (seed > 85) intensity = 3;
          else if (seed > 65) intensity = 2;
          else if (seed > 40) intensity = 1;

          return {
            date: `Day ${idx + 1}`,
            count: intensity * 2,
            intensity: intensity,
          };
        });

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8E]">
        <div className="flex items-center gap-2">
          <span>Contribution Activity (2025 - 2026)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-[#4F8CFF] font-semibold">{totalCommits} Commits</span>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[580px]">
          {displayDays.map((item, idx) => {
            let intensityClass = 'bg-white/5 border border-white/5';
            if (item.intensity >= 3) {
              intensityClass = 'bg-[#4F8CFF] shadow-[0_0_10px_#4F8CFF] border border-[#4F8CFF]';
            } else if (item.intensity === 2) {
              intensityClass = 'bg-[#4F8CFF]/70 border border-[#4F8CFF]/80';
            } else if (item.intensity === 1) {
              intensityClass = 'bg-[#4F8CFF]/35 border border-[#4F8CFF]/40';
            }

            const tooltipText =
              item.count > 0
                ? `${item.count} contribution${item.count > 1 ? 's' : ''} on ${item.date}`
                : item.date.startsWith('Day')
                ? `Activity on ${item.date}`
                : `No contributions on ${item.date}`;

            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-150 hover:z-20 cursor-pointer ${intensityClass}`}
                title={tooltipText}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-[#8A8A8E]">
        <span>Less</span>
        <div className="flex gap-1 items-center">
          <span className="w-2.5 h-2.5 rounded-sm bg-white/5 border border-white/5" title="No activity" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/35" title="1-2 contributions" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/70" title="3-5 contributions" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF] shadow-[0_0_6px_#4F8CFF]" title="6+ contributions" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
