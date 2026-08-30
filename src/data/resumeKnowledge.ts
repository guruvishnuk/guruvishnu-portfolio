export interface KnowledgeItem {
  id: string;
  category: 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'certifications' | 'contact';
  keywords: string[];
  title: string;
  summary: string;
  details: string[];
  actionLinks?: { label: string; url?: string; sectionId?: string }[];
}

export const RESUME_DATA = {
  name: "Guruvishnu B Kajagar",
  title: "Frontend Developer / React.js Specialist",
  location: "Pune, India (Available immediately for Pune, Bangalore, or Remote roles)",
  email: "guruvishnu1927@gmail.com",
  phone: "+91-9686715615",
  github: "https://github.com/guruvishnuk",
  linkedin: "https://linkedin.com/in/guruvishnu-kajagar",
  portfolio: "https://guruvishnuk.dev",
  summary: "React.js developer with production experience at CandorWorks, building UIs for an India-to-global trade logistics platform and a talent evaluation product. Skilled in reducing redundant API calls, optimizing bundle size, and delivering reusable component libraries that accelerate feature development. Strong in React Hooks, REST API integration, performance optimization, and responsive design. Available immediately for frontend or full-stack roles in Pune, Bangalore, or Remote.",
  education: {
    degree: "B.E. Computer Science & Engineering",
    institution: "VTU Belagavi (Visvesvaraya Technological University)",
    period: "2021 – 2025",
    location: "Belagavi, Karnataka"
  },
  experience: [
    {
      company: "CandorWorks",
      period: "Oct 2025 – Present",
      roles: [
        {
          role: "Frontend Developer — Alacrity, India-to-Global Import/Export Platform",
          period: "May 2025 – Present",
          highlights: [
            "Reduced redundant API calls by implementing debounced search using useCallback + useRef on shipment and product listing pages, improving perceived performance for end users.",
            "Optimized initial bundle size by eliminating prop-drilling via Context API, memoizing renders with useMemo & React.memo, and lazy-loading route-level components.",
            "Led UI redesign of the Alacrity trade platform, modernizing component layouts and ensuring WCAG-compliant, accessible interfaces for complex import/export workflows.",
            "Integrated REST APIs for real-time shipment tracking, customs data, and trade document workflows using Axios with centralized error handling and loading state management via React Hooks."
          ]
        },
        {
          role: "Frontend Developer — Assessment & Talent Evaluation Platform",
          period: "Feb 2025 – May 2025",
          highlights: [
            "Reduced feature development time by building a modular React component library of reusable functional components using Hooks (useState, useEffect), minimizing redundant code.",
            "Resolved API integration issues with minimal downtime while integrating REST APIs via Axios for real-time data handling against Python & PostgreSQL backend services.",
            "Improved page load speed through WordPress theme customization, custom CSS, and plugin optimization for content-driven pages.",
            "Reduced average bug resolution time using Chrome DevTools for systematic root-cause analysis in collaboration with the backend team.",
            "Ensured cross-browser compatibility across major browsers with mobile-first responsive design using Flexbox, CSS Grid, and media queries.",
            "Managed code via Git & GitHub with feature branching across a cross-functional team in an Agile sprint workflow."
          ]
        }
      ]
    }
  ],
  projects: [
    {
      name: "Interactive Developer Portfolio",
      subtitle: "3D-Enhanced Personal Web Application",
      tech: ["React", "TypeScript", "Vite", "Three.js", "React Three Fiber", "Recharts", "GSAP", "Motion", "Lenis", "Tailwind CSS v4", "React Hook Form", "Zod"],
      demoUrl: "https://guruvishnuk.dev",
      githubUrl: "https://github.com/guruvishnuk/guruvishnu-portfolio",
      details: [
        "Engineered an interactive, 3D-enhanced personal portfolio using React, TypeScript, and Vite, featuring a CLI-style terminal interface, a WebGL-based skills visualization built with Three.js and React Three Fiber, and live GitHub integration.",
        "Developed an AI-powered conversational resume assistant that interprets recruiter queries and responds with relevant experience, skills, and project information using natural language intent recognition.",
        "Designed an interactive experience roadmap and a performance metrics dashboard using Recharts to visually communicate engineering impact and career progression.",
        "Implemented smooth scrolling and motion design using GSAP, Motion, and Lenis, and integrated the GitHub REST API for live repository and activity data.",
        "Styled the application with Tailwind CSS v4 and built a component playground demonstrating reusable UI patterns; contact workflow includes schema-based form validation via React Hook Form and Zod, with Formspree backend integration."
      ]
    },
    {
      name: "Fresh-Bites",
      subtitle: "Recipe & E-Commerce Web Application",
      tech: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS", "PHP", "MySQL", "Vercel"],
      demoUrl: "https://freshbites.demo.dev",
      githubUrl: "https://github.com/guruvishnuk/fresh-bites",
      details: [
        "Built a responsive, multi-page web application using HTML5, CSS3, and JavaScript with mobile-first design and consistent cross-browser rendering.",
        "Implemented a shopping cart with localStorage, category-based product filtering, and an admin dashboard for order management; PHP + MySQL backend via XAMPP following MVC architecture.",
        "Deployed on Vercel; improved page load performance through asset compression and lazy loading."
      ]
    },
    {
      name: "Secure E-Voting System",
      subtitle: "Iris Recognition Based Authentication",
      tech: ["React", "TypeScript", "AES Encryption", "Biometrics", "Node.js", "Express", "Python"],
      githubUrl: "https://github.com/guruvishnuk/secure-evoting",
      details: [
        "Built a biometric-secured e-voting platform using iris recognition, preventing duplicate voting across the test voter base.",
        "Implemented AES encryption and a privacy-first security model protecting voter records throughout the voting lifecycle."
      ]
    }
  ],
  skills: {
    frontend: ["React.js (Hooks, Functional Components, Context API, useMemo, useCallback, useRef)", "Next.js (Fundamentals, File-based Routing, SSR, SSG)", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Responsive Design (Flexbox, Grid, Media Queries)", "Mobile-First Design", "Performance Optimization", "Lazy Loading", "Code Splitting"],
    animation: ["Three.js", "React Three Fiber", "React Three Drei", "GSAP", "Motion", "Lenis (Smooth Scroll)"],
    buildAndForms: ["Vite", "React Hook Form", "Zod (Schema Validation)", "Recharts (Data Visualization)"],
    cms: ["WordPress Core", "Theme Development", "Theme Customization", "Plugin Integration", "Custom CSS", "ACF (Advanced Custom Fields)"],
    api: ["RESTful API Integration", "GitHub REST API", "Axios", "Fetch API", "Postman", "Debounced Search", "Async/Await", "Error Handling", "Loading State Management"],
    backend: ["Java (Core Java, Java 8, Stream API)", "Spring Boot (MVC)", "Python", "MySQL", "PostgreSQL", "PHP"],
    tools: ["Git & GitHub", "VS Code", "Chrome DevTools", "Postman", "Agile/Scrum", "Component-Driven Development", "Clean Code", "DRY Principles", "Cross-Browser Compatibility", "WCAG Accessibility", "Debugging & Troubleshooting"]
  },
  certifications: [
    {
      title: "Full-Stack Development Training",
      issuer: "J Spiders",
      period: "Feb 2025 – Jul 2025",
      description: "Completed structured training covering Core Java, Java 8 (Stream API, Lambda, Multithreading), SQL, and front-end technologies (React.js, HTML, CSS, JavaScript). Built and deployed multiple front-end projects reinforcing DOM manipulation, ES6+ features, and responsive UI design.",
      awards: ["Best Coder of the Week (Java)", "Certificate of Excellence"]
    },
    {
      title: "Naukri Quiz Competition",
      issuer: "Naukri",
      description: "Certified for demonstrated problem-solving and logical reasoning skills."
    }
  ],
  achievements: [
    "Naukri Quiz Competition – Certified for demonstrated problem-solving and logical reasoning skills.",
    "Awarded Best Coder of the Week (Java) and received Certificate of Excellence at J Spiders training."
  ]
};

export interface TerminalCommand {
  cmd: string;
  label: string;
  query: string;
  description: string;
}

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { cmd: 'help', label: 'help', query: 'help', description: 'Show terminal command guide' },
  { cmd: '--summary', label: './whoami.sh', query: 'Tell me about Guruvishnu in 60 seconds', description: 'Display developer profile overview' },
  { cmd: '--candorworks', label: 'cat experience.log', query: 'What is his experience at CandorWorks?', description: 'View production record at CandorWorks' },
  { cmd: '--skills', label: 'cat skills.json', query: 'What React & Frontend skills does he have?', description: 'List technical stack & React skills' },
  { cmd: '--projects', label: 'cat projects.md', query: 'Tell me about his portfolio, Fresh-Bites & E-Voting projects', description: 'Inspect deployed web applications' },
  { cmd: '--education', label: 'cat education.txt', query: 'What is his education?', description: 'VTU Belagavi degree & J Spiders awards' },
  { cmd: '--contact', label: 'ping contact', query: 'How can I contact or hire him?', description: 'Get email, phone & availability' },
];

export const QUICK_QUESTIONS = [
  "Tell me about Guruvishnu in 60 seconds",
  "What is his experience at CandorWorks?",
  "What React & Frontend skills does he have?",
  "Tell me about his portfolio & Fresh-Bites projects",
  "What is his education?",
  "How can I contact or hire him?"
];
