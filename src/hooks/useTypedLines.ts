import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useTypedLines(
  lines: string[],
  charSpeed: number = 18,
  lineDelay: number = 250,
  startTrigger: boolean = true
) {
  const prefersReduced = useReducedMotion();
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState<string>('');
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!startTrigger) return;

    if (prefersReduced) {
      setCompletedLines(lines);
      setCurrentLineText('');
      setIsFinished(true);
      return;
    }

    if (isFinished || activeLineIndex >= lines.length) return;

    const targetLine = lines[activeLineIndex];
    let currentChar = 0;
    let delayTimeout: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      if (currentChar <= targetLine.length) {
        setCurrentLineText(targetLine.slice(0, currentChar));
        currentChar++;
      } else {
        clearInterval(interval);
        delayTimeout = setTimeout(() => {
          setCompletedLines((prev) => [...prev, targetLine]);
          setCurrentLineText('');
          if (activeLineIndex + 1 < lines.length) {
            setActiveLineIndex((prev) => prev + 1);
          } else {
            setIsFinished(true);
          }
        }, lineDelay);
      }
    }, charSpeed);

    return () => {
      clearInterval(interval);
      if (delayTimeout) clearTimeout(delayTimeout);
    };
  }, [activeLineIndex, startTrigger, lines, charSpeed, lineDelay, isFinished, prefersReduced]);

  return {
    completedLines,
    currentLineText,
    activeLineIndex,
    isFinished,
  };
}
