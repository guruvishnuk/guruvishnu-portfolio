import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../ui/Badge';
import { MagneticButton } from '../ui/MagneticButton';
import { RotatingRoleText } from './RotatingRoleText';
import { FlippableProfileCard } from '../profile/FlippableProfileCard';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import { fadeInUp, staggerContainer, lineReveal } from '../../lib/motion-variants';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden select-none"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4F8CFF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column — Copy & Intro */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 z-10"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp}>
            <Badge variant="pulse" className="px-4 py-1.5 text-xs font-mono">
              Available for Hire · Pune, India
            </Badge>
          </motion.div>

          {/* H1 Heading */}
          <motion.div variants={lineReveal} className="overflow-hidden">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F7]">
              Hello, I'm{' '}
              <span className="gradient-accent-text block sm:inline">
                Guruvishnu.
              </span>
            </h1>
          </motion.div>

          {/* Rotating Role Line */}
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <span className="text-[#8A8A8E] text-lg sm:text-xl font-mono">I am a</span>
            <RotatingRoleText />
          </motion.div>

          {/* Positioning Statement */}
          <motion.p
            variants={fadeInUp}
            className="text-[#8A8A8E] text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-sans"
          >
            I'm a Frontend Engineer at{' '}
            <strong className="text-[#F5F5F7] font-semibold">CandorWorks</strong> passionate about
            building clean, fast, and responsive React applications. I focus on writing clean
            TypeScript, building reusable UI component libraries, and optimizing frontend user experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              variant="accent"
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              variant="glass"
              asAnchor
              href="/Guruvishnu_Kajagar_Resume.pdf"
              target="_blank"
            >
              <Download className="w-4 h-4 text-[#4F8CFF]" />
              <span>Download Resume</span>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right Column — Interactive 3D Flippable Profile Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          <FlippableProfileCard />
        </motion.div>
      </div>

      {/* Scroll indicator down */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-xs font-mono text-[#8A8A8E]"
      >
        <span className="uppercase tracking-widest text-[10px]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#4F8CFF]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
