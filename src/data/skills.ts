import { SkillCategory } from '../types/portfolio';

export const skillsData: SkillCategory[] = [
  // Core Ring
  {
    ring: 'Core',
    name: 'React',
    iconName: 'Atom',
    description: 'Functional Components, Hooks, State Management & Context API',
    level: 'Primary Library',
    context: 'Daily driver for building interactive dashboards and platform UI at CandorWorks.',
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
    name: 'HTML5 & CSS3',
    iconName: 'Globe',
    description: 'Semantic Markup, Flexbox, CSS Grid & Responsive Design',
    level: 'Solid Foundation',
    context: 'Building accessible, mobile-first responsive web pages across devices.',
  },

  // Backend Ring
  {
    ring: 'Backend',
    name: 'Java & Spring Boot',
    iconName: 'Server',
    description: 'RESTful API Development, Controllers & Service Layer',
    level: 'Working Knowledge',
    context: 'Built backend services and API endpoints to connect with React frontends.',
  },
  {
    ring: 'Backend',
    name: 'REST APIs',
    iconName: 'Network',
    description: 'JSON Data Fetching, Axios/Fetch, HTTP Methods & Status Codes',
    level: 'Proficient',
    context: 'Integrated third-party and internal APIs with proper error handling and loading states.',
  },
  {
    ring: 'Backend',
    name: 'MySQL & Databases',
    iconName: 'Database',
    description: 'Relational Schema Design, SQL Queries & Indexing Basics',
    level: 'Working Knowledge',
    context: 'Designed database tables and executed queries for full-stack application projects.',
  },

  // Craft Ring
  {
    ring: 'Craft',
    name: 'Tailwind CSS',
    iconName: 'Palette',
    description: 'Utility-First Styling, Responsive Layouts & Theme Configuration',
    level: 'Proficient',
    context: 'Preferred styling solution for rapidly building modern, consistent user interfaces.',
  },
  {
    ring: 'Craft',
    name: 'Framer Motion',
    iconName: 'Sparkles',
    description: 'Component Animations, Transitions & Scroll-Triggered Reveals',
    level: 'Intermediate',
    context: 'Adding smooth, purposeful UI micro-interactions to enhance user engagement.',
  },
  {
    ring: 'Craft',
    name: 'Git & GitHub',
    iconName: 'GitBranch',
    description: 'Version Control, Branch Management, Pull Requests & Code Reviews',
    level: 'Proficient',
    context: 'Daily use for collaborative development, feature branching, and version tracking.',
  },
  {
    ring: 'Craft',
    name: 'WordPress',
    iconName: 'Layout',
    description: 'Custom Theme Customization & Elementor Page Builder',
    level: 'Practical Experience',
    context: 'Customized client web pages and managed content management setups.',
  },
];
