import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 ml-1 rounded-full bg-slate-200/70 hover:bg-slate-300/80 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-300/80 dark:border-white/15 transition-all cursor-pointer overflow-hidden flex items-center justify-center w-8 h-8 shadow-xs"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      data-cursor="hover"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 90
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon className="w-4 h-4 text-[#4F8CFF]" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -90
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun className="w-4 h-4 text-amber-500" />
      </motion.div>
    </button>
  );
};
