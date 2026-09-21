import React from 'react';
import { PageShell } from './components/layout/PageShell';
import { HeroSection } from './components/hero/HeroSection';
import { LiveResumeSection } from './components/resume/LiveResumeSection';
import { TerminalBoot } from './components/terminal/TerminalBoot';
import { InteractiveRoadmap } from './components/roadmap/InteractiveRoadmap';
import { PerformanceDashboard } from './components/dashboard/PerformanceDashboard';
import { OrbitSystem } from './components/skills-orbit/OrbitSystem';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { PhilosophyGrid } from './components/philosophy/PhilosophyGrid';
import { ComponentPlayground } from './components/playground/ComponentPlayground';
import { GithubDashboard } from './components/github/GithubDashboard';
import { BlogSection } from './components/blog/BlogSection';
import { TestimonialsPlaceholder } from './components/testimonials/TestimonialsPlaceholder';
import { TagCloud } from './components/tags/TagCloud';
import { HireMeFlow } from './components/process/HireMeFlow';
import { ContactControlPanel } from './components/contact/ContactControlPanel';
import { AIChatWidget } from './components/ui/AIChatWidget';

export function App() {
  return (
    <PageShell>
      <HeroSection />
      <TerminalBoot />
      <InteractiveRoadmap />
      <PerformanceDashboard />
      <OrbitSystem />
      <ProjectShowcase />
      <PhilosophyGrid />
      <ComponentPlayground />
      <GithubDashboard />
      <BlogSection />
      <TestimonialsPlaceholder />
      <TagCloud />
      <HireMeFlow />
      <ContactControlPanel />
      <LiveResumeSection />
      
      {/* Global AI Chat Widget */}
      <AIChatWidget />
    </PageShell>
  );
}

export default App;
