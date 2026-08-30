import { SkillCategory } from '../types/portfolio';

export const skillsData: SkillCategory[] = [
  // Core Ring
  {
    ring: 'Core',
    name: 'React.js',
    iconName: 'Atom',
    description: 'Hooks, Functional Components, Context API, useMemo, useCallback, useRef',
    level: 'Primary Specialty',
    context: 'Daily driver for building interactive dashboards and platform UIs at CandorWorks.',
  },
  {
    ring: 'Core',
    name: 'TypeScript',
    iconName: 'FileCode2',
    description: 'Strict Typing, Interfaces, Generics & Type Safety',
    level: 'Proficient',
    context: 'Used across production frontend codebases to prevent runtime bugs and improve DX.',
  },
  {
    ring: 'Core',
    name: 'JavaScript (ES6+)',
    iconName: 'Code',
    description: 'Async/Await, Promises, DOM Manipulation & Event Loop',
    level: 'Strong Core',
    context: 'Deep understanding of modern JavaScript features and asynchronous data flow.',
  },
  {
    ring: 'Core',
    name: 'Next.js',
    iconName: 'Globe',
    description: 'Fundamentals, File-based Routing, SSR, SSG',
    level: 'Intermediate',
    context: 'Building modern server-rendered and static React applications.',
  },

  // Backend & Database Ring
  {
    ring: 'Backend',
    name: 'Java (Core & 8)',
    iconName: 'Server',
    description: 'Stream API, Lambda, Multithreading, Spring Boot MVC',
    level: 'Working Knowledge',
    context: 'Awarded Best Coder of the Week (Java) at J Spiders full-stack training.',
  },
  {
    ring: 'Backend',
    name: 'RESTful APIs',
    iconName: 'Network',
    description: 'Axios, Fetch API, Debounced Search, Loading & Error States',
    level: 'Proficient',
    context: 'Integrated REST APIs against Python & PostgreSQL backend services with zero downtime.',
  },
  {
    ring: 'Backend',
    name: 'MySQL & PostgreSQL',
    iconName: 'Database',
    description: 'Relational Schema Design, SQL Queries & Database Management',
    level: 'Working Knowledge',
    context: 'Designed database tables and executed queries for full-stack application projects.',
  },

  // Craft Ring (3D, Animation & Design)
  {
    ring: 'Craft',
    name: 'Tailwind CSS v4',
    iconName: 'Palette',
    description: 'Utility-First Styling, Responsive Layouts (Flexbox, Grid), Media Queries',
    level: 'Proficient',
    context: 'Preferred styling solution for building modern, WCAG-compliant UI components.',
  },
  {
    ring: 'Craft',
    name: 'Three.js & R3F',
    iconName: 'Sparkles',
    description: 'React Three Fiber, React Three Drei, WebGL 3D Interactive Elements',
    level: 'Intermediate',
    context: 'Building interactive 3D WebGL scenes and orbital skills visualization.',
  },
  {
    ring: 'Craft',
    name: 'GSAP & Motion',
    iconName: 'Sparkles',
    description: 'GSAP, Motion, Lenis Smooth Scroll, Micro-interactions',
    level: 'Proficient',
    context: 'Adding smooth, high-impact motion design and scroll effects to web apps.',
  },
  {
    ring: 'Craft',
    name: 'Git & GitHub',
    iconName: 'GitBranch',
    description: 'Version Control, Feature Branching, Pull Requests & Agile Workflows',
    level: 'Proficient',
    context: 'Daily use for collaborative development and sprint workflows.',
  },
  {
    ring: 'Craft',
    name: 'WordPress Core',
    iconName: 'Layout',
    description: 'Theme Development & Customization, Plugin Integration, ACF',
    level: 'Practical Experience',
    context: 'Customized themes and optimized page speed by ~25% for content-driven pages.',
  },
];
