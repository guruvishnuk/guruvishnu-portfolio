import React from 'react';
import { Badge } from '../ui/Badge';
import { FreshBitesShowcase } from './FreshBitesShowcase';
import { VotingShowcase } from './VotingShowcase';

export const ProjectShowcase: React.FC = () => {
  return (
    <section id="projects" className="py-16 relative">
      <div className="text-center max-w-3xl mx-auto px-6 mb-16 space-y-4">
        <Badge variant="pulse">Full-Bleed Product Showcases</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Featured Production Ships
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Detailed case studies focusing on challenge, technical approach, and measurable outcome.
        </p>
      </div>

      <FreshBitesShowcase />
      <VotingShowcase />
    </section>
  );
};
