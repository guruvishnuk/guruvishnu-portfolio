import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { GlassCard } from '../ui/GlassCard';
import { useTypedLines } from '../../hooks/useTypedLines';
import { CheckCircle2, Terminal as TerminalIcon } from 'lucide-react';

const terminalScript = [
  '> initializing developer.env',
  '✓ loading react_typescript... done',
  '✓ loading tailwind_ui_library... done',
  '✓ loading performance_optimizations... done',
  '✓ building responsive_interfaces... done',
  '> status: READY',
  '> hire_status: OPEN_TO_OPPORTUNITIES',
];

export const TerminalBoot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { completedLines, currentLineText, activeLineIndex, isFinished } = useTypedLines(
    terminalScript,
    18,
    220,
    isInView
  );

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto" ref={containerRef}>
      <GlassCard className="p-0 border-white/15 bg-[#0a0a0c]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* macOS Traffic light header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A8E]">
            <TerminalIcon className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span>guruvishnu@candorworks ~ zsh</span>
          </div>
          <div className="w-12" /> {/* spacer */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed space-y-3 text-[#F5F5F7]">
          {completedLines.map((line, idx) => {
            const isSuccess = line.startsWith('✓');
            const isHeader = line.startsWith('>');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                {isSuccess && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </motion.span>
                )}
                <span
                  className={
                    isHeader
                      ? 'text-[#4F8CFF] font-semibold'
                      : isSuccess
                      ? 'text-[#F5F5F7]'
                      : 'text-[#8A8A8E]'
                  }
                >
                  {line}
                </span>
              </motion.div>
            );
          })}

          {/* Currently typing line */}
          {!isFinished && (
            <div className="flex items-center gap-2">
              <span
                className={
                  currentLineText.startsWith('>')
                    ? 'text-[#4F8CFF] font-semibold'
                    : currentLineText.startsWith('✓')
                    ? 'text-[#F5F5F7]'
                    : 'text-[#8A8A8E]'
                }
              >
                {currentLineText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-[#4F8CFF] inline-block"
              />
            </div>
          )}

          {/* Execution completed status pill */}
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8A8A8E]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Process exited with code 0</span>
              </div>
              <span className="text-[#4F8CFF]">Environment initialized in 1.1s</span>
            </motion.div>
          )}
        </div>
      </GlassCard>
    </section>
  );
};
