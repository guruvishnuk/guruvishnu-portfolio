import { PhilosophyItem } from '../types/portfolio';

export const philosophyData: PhilosophyItem[] = [
  {
    id: 'perf',
    title: 'Focus on Web Performance',
    quote: 'Small optimizations make a big difference.',
    description: 'I pay attention to bundle size, image loading, and unnecessary component re-renders. Profiling with Chrome DevTools helps ensure smooth 60fps user experiences.',
    highlight: true,
  },
  {
    id: 'think',
    title: 'Think First, Code Second',
    quote: 'Plan component hierarchy and state flow.',
    description: 'Understanding requirements and mapping state management before writing code saves time and prevents unexpected bugs down the road.',
    highlight: false,
  },
  {
    id: 'clean',
    title: 'Write Clean & Readable Code',
    quote: 'Code is read more often than written.',
    description: 'I use strict TypeScript types, clear function names, and modular structures so team members can easily read, maintain, and contribute.',
    highlight: false,
  },
  {
    id: 'ux',
    title: 'Prioritize User Experience',
    quote: 'Smooth animations reveal intent.',
    description: 'UI motion should serve a purpose—guiding user attention, giving click feedback, and making web applications feel responsive.',
    highlight: false,
  },
  {
    id: 'reusable',
    title: 'Build Reusable Components',
    quote: 'Don\'t reinvent the wheel.',
    description: 'Building configurable UI primitives (buttons, modals, form inputs) standardizes design and speeds up new feature development.',
    highlight: true,
  },
  {
    id: 'learn',
    title: 'Continuous Learning & Growth',
    quote: 'Stay curious and keep improving.',
    description: 'Frontend tech evolves fast. I constantly refine my skills in React, modern CSS, web performance, and clean frontend architecture.',
    highlight: false,
  },
];
