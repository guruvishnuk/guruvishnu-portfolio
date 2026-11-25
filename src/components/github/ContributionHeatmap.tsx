import React from 'react';
import { ContributionDay } from '../../hooks/useGithubStats';
import { ExternalLink } from 'lucide-react';

interface ContributionHeatmapProps {
  days?: ContributionDay[];
  totalCommits?: number | null;
  loading?: boolean;
}

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  days = [],
  totalCommits = null,
  loading = false,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-[#8A8A8E] font-medium">
        <span>Contribution Activity (Recent 28 Weeks)</span>
        {totalCommits !== null ? (
          <span className="text-blue-600 dark:text-[#4F8CFF] font-semibold">
            {totalCommits} Contributions
          </span>
        ) : (
          <span className="text-slate-500 dark:text-[#8A8A8E]">GitHub Activity</span>
        )}
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-slate-500 dark:text-[#8A8A8E] animate-pulse">
          Loading live contribution activity...
        </div>
      ) : days.length === 0 ? (
        <div className="py-6 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center space-y-2">
          <p className="text-xs font-mono text-slate-600 dark:text-[#8A8A8E]">
            Live contribution graph is currently unavailable from the API.
          </p>
          <a
            href="https://github.com/guruvishnuk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-[#4F8CFF] hover:underline"
          >
            <span>View full contribution graph on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[500px]">
              {days.map((item, idx) => {
                let intensityClass =
                  'bg-slate-200/80 dark:bg-white/5 border border-slate-300/40 dark:border-white/5';
                if (item.intensity >= 3) {
                  intensityClass =
                    'bg-blue-600 dark:bg-[#4F8CFF] shadow-[0_0_8px_rgba(79,140,255,0.4)]';
                } else if (item.intensity === 2) {
                  intensityClass = 'bg-blue-500/80 dark:bg-[#4F8CFF]/70';
                } else if (item.intensity === 1) {
                  intensityClass = 'bg-blue-400/60 dark:bg-[#4F8CFF]/40';
                }

                const tooltipText =
                  item.count > 0
                    ? `${item.count} contribution${item.count > 1 ? 's' : ''} on ${item.date}`
                    : `No contributions on ${item.date}`;

                return (
                  <div
                    key={item.date || idx}
                    className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 ${intensityClass}`}
                    title={tooltipText}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-slate-500 dark:text-[#8A8A8E]">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 dark:bg-white/5" />
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-400/60 dark:bg-[#4F8CFF]/40" />
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/80 dark:bg-[#4F8CFF]/70" />
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 dark:bg-[#4F8CFF]" />
            </div>
            <span>More</span>
          </div>
        </>
      )}
    </div>
  );
};
