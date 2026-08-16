import { ProcessStep } from '../types/portfolio';

export const hireFlowData: ProcessStep[] = [
  {
    step: 1,
    title: 'Understand Requirements',
    shortDesc: 'Scope & Alignment',
    detail: 'Review product specs, clarify user flows, and align with design and product teams on feature goals.',
    iconName: 'FileSearch',
  },
  {
    step: 2,
    title: 'Plan Component Structure',
    shortDesc: 'Architecture & Tokens',
    detail: 'Break down UI into modular React components, choose state management strategy, and define TypeScript interfaces.',
    iconName: 'LayoutTemplate',
  },
  {
    step: 3,
    title: 'Develop Clean Code',
    shortDesc: 'React & TypeScript',
    detail: 'Write clean, type-safe React components styled with Tailwind CSS and responsive design principles.',
    iconName: 'Code2',
  },
  {
    step: 4,
    title: 'Optimize & Polish',
    shortDesc: 'Performance Tuning',
    detail: 'Audit re-renders, optimize asset loading, verify debouncing/caching, and refine micro-animations.',
    iconName: 'Zap',
  },
  {
    step: 5,
    title: 'Test & Cross-Browser Audit',
    shortDesc: 'Quality Assurance',
    detail: 'Test across Chrome, Safari, Firefox, and mobile browsers to ensure responsive layouts and smooth UX.',
    iconName: 'CheckCircle2',
  },
  {
    step: 6,
    title: 'Deploy & Support',
    shortDesc: 'Vercel & Maintenance',
    detail: 'Deploy via CI/CD pipelines, monitor feedback, and promptly fix any post-launch issues or edge cases.',
    iconName: 'Rocket',
  },
];
