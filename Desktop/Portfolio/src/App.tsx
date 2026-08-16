import React from 'react';
import { PageShell } from './components/layout/PageShell';
import { HeroSection } from './components/hero/HeroSection';
import { TerminalBoot } from './components/terminal/TerminalBoot';
import { InteractiveRoadmap } from './components/roadmap/InteractiveRoadmap';
import { PerformanceDashboard } from './components/dashboard/PerformanceDashboard';
import { OrbitSystem } from './components/skills-orbit/OrbitSystem';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { PhilosophyGrid } from './components/philosophy/PhilosophyGrid';
import { ComponentPlayground } from './components/playground/ComponentPlayground';
import { GithubDashboard } from './components/github/GithubDashboard';
import { TestimonialsPlaceholder } from './components/testimonials/TestimonialsPlaceholder';
import { TagCloud } from './components/tags/TagCloud';
import { HireMeFlow } from './components/process/HireMeFlow';
import { ContactControlPanel } from './components/contact/ContactControlPanel';

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
      <TestimonialsPlaceholder />
      <TagCloud />
      <HireMeFlow />
      <ContactControlPanel />
    </PageShell>
  );
}

export default App;
