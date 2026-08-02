import { MetricCard } from '../types/portfolio';

export const metricsData: MetricCard[] = [
  {
    label: 'Redundant API Calls Reduced',
    value: 30,
    suffix: '%+',
    detail: 'via search input debouncing, request batching & SWR caching for data tables',
    sparkline: [15, 22, 28, 30, 32, 35],
    category: 'performance',
  },
  {
    label: 'Faster Page Load Speed',
    value: 25,
    suffix: '%+',
    detail: 'via route-based code-splitting, lazy-loaded images & asset compression',
    sparkline: [1.8, 1.5, 1.3, 1.1, 0.9, 0.8],
    category: 'performance',
  },
  {
    label: 'Dev Time Saved per Sprint',
    value: 30,
    suffix: '%+',
    detail: 'via standardized component library & reusable form / modal primitives',
    sparkline: [10, 15, 20, 25, 28, 30],
    category: 'velocity',
  },
  {
    label: 'Reusable UI Components Shipped',
    value: 15,
    suffix: '+',
    detail: 'modals, data tables, custom dropdowns & toast notifications built with Tailwind',
    sparkline: [3, 6, 9, 12, 14, 15],
    category: 'quality',
  },
  {
    label: 'UI & Functional Bugs Fixed',
    value: 20,
    suffix: '+',
    detail: 'resolved layout glitches, state sync issues & cross-browser compatibility bugs',
    sparkline: [2, 5, 9, 14, 17, 20],
    category: 'quality',
  },
  {
    label: 'Average Lighthouse Target',
    value: 95,
    suffix: '+',
    detail: 'maintaining high performance, accessibility & SEO scores across landing pages',
    sparkline: [88, 90, 92, 94, 95, 96],
    category: 'performance',
  },
];
