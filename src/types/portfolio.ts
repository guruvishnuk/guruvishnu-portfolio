export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  lighthouseScore: number;
  featured: boolean;
  challenge: string;
  approach: string;
  result: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  mockupType: 'freshbites' | 'voting';
  metrics: { label: string; value: string }[];
}

export interface SkillCategory {
  ring: 'Core' | 'Backend' | 'Craft';
  name: string;
  iconName: string;
  description: string;
  level: string;
  context: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  company: string;
  role: string;
  description: string;
  impact: string;
  metrics: string[];
  active?: boolean;
}

export interface MetricCard {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  detail: string;
  sparkline: number[];
  category: 'performance' | 'velocity' | 'quality';
}

export interface PhilosophyItem {
  id: string;
  title: string;
  quote: string;
  description: string;
  highlight: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  shortDesc: string;
  detail: string;
  iconName: string;
}

export interface CommitActivity {
  repo: string;
  message: string;
  date: string;
  branch: string;
  sha: string;
}
