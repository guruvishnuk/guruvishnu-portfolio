import { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'fresh-bites',
    title: 'Fresh Bites',
    subtitle: 'Responsive E-Commerce & Food Ordering Web App',
    period: '2025',
    lighthouseScore: 96,
    featured: true,
    challenge: 'Long menu load times and sluggish mobile navigation were causing high bounce rates on food ordering pages.',
    approach: 'Built a modular React frontend using Vite, lazy-loaded menu images, implemented Zustand for cart state management, and optimized asset delivery.',
    result: 'Delivered a fast, mobile-first food ordering application with sub-second page transitions and a smooth checkout flow.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Zustand', 'Vite'],
    liveUrl: 'https://freshbites.demo.dev',
    githubUrl: 'https://github.com/guruvishnuk/fresh-bites',
    mockupType: 'freshbites',
    metrics: [
      { label: 'Load Time', value: '< 1s' },
      { label: 'Lighthouse Score', value: '96/100' },
      { label: 'Mobile Responsive', value: '100%' },
    ],
  },
  {
    id: 'secure-voting',
    title: 'Secure E-Voting System',
    subtitle: 'Transparent & Encrypted Web Polling Platform',
    period: '2024 - 2025',
    lighthouseScore: 94,
    featured: true,
    challenge: 'Designing an easy-to-use voting interface that guarantees vote security, user privacy, and fraud prevention.',
    approach: 'Developed an intuitive 3-step verification workflow (Voter ID check -> OTP verification -> Vote Submission) with client-side payload encryption.',
    result: 'Successfully built a secure, transparent voting portal with instant vote receipt generation and zero data tampering.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'CryptoJS', 'Node.js', 'Express'],
    liveUrl: 'https://secure-voting.demo.dev',
    githubUrl: 'https://github.com/guruvishnuk/secure-evoting',
    mockupType: 'voting',
    metrics: [
      { label: 'Verification Time', value: '< 2s' },
      { label: 'Encrypted Payload', value: 'AES-256' },
      { label: 'User Flow Steps', value: '3 Easy Steps' },
    ],
  },
];
