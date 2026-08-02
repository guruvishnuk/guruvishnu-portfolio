import React from 'react';

export const ContributionHeatmap: React.FC = () => {
  // Generate 52 weeks x 7 days heat grid
  const weeks = 28;
  const days = 7;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8E]">
        <span>Contribution Activity (2025 - 2026)</span>
        <span className="text-[#4F8CFF] font-semibold">482 Commits</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[500px]">
          {Array.from({ length: weeks * days }).map((_, idx) => {
            // Pseudo commit density calculation
            const seed = (idx * 17 + 5) % 100;
            let intensityClass = 'bg-white/5 border border-white/5';
            if (seed > 75) intensityClass = 'bg-[#4F8CFF] shadow-[0_0_8px_#4F8CFF]';
            else if (seed > 50) intensityClass = 'bg-[#4F8CFF]/70';
            else if (seed > 30) intensityClass = 'bg-[#4F8CFF]/40';
            else if (seed > 15) intensityClass = 'bg-[#4F8CFF]/20';

            return (
              <div
                key={idx}
                className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 ${intensityClass}`}
                title={`Activity day ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-[#8A8A8E]">
        <span>Less</span>
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-white/5" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/20" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]/50" />
          <span className="w-2.5 h-2.5 rounded-sm bg-[#4F8CFF]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
