import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ContactForm } from './ContactForm';
import { Mail, Linkedin, Github, FileText, MapPin, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLiveResume } from '../../context/LiveResumeContext';

const CONTACT_EMAIL = 'guruvishnuk.work@gmail.com';

export const ContactControlPanel: React.FC = () => {
  const { openLiveResume } = useLiveResume();

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative select-none">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Get In Touch</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F7]">
          Let's Build Your Project
        </h2>
        <p className="text-slate-600 dark:text-[#8A8A8E] text-base md:text-lg">
          Have an idea for a website or app? Share a few simple details below — no technical knowledge needed.
          I'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column — Direct Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-6 bg-white/90 dark:bg-[#0a0a0c]/90 border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
            {/* Availability Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  Project Availability
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  AVAILABLE
                </span>
              </div>

              <div className="space-y-1.5 pt-1 font-mono text-xs text-slate-800 dark:text-[#F5F5F7]">
                <div className="flex items-center gap-2 text-slate-600 dark:text-[#8A8A8E]">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
                  <span>Pune, India (IST / UTC +5:30)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-[#8A8A8E]">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
                  <span>Response Time: Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Quick Channel Rows */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label={`Send direct email to ${CONTACT_EMAIL}`}
                className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors shadow-sm dark:shadow-none"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-[#4F8CFF]" />
                  <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold">Direct Email</span>
                </div>
                <span className="text-slate-600 dark:text-[#8A8A8E] group-hover:text-slate-900 dark:group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                  {CONTACT_EMAIL}
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/guruvishnu-kajagar-/"
                aria-label="Visit Guruvishnu LinkedIn Profile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors shadow-sm dark:shadow-none"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-sky-600 dark:text-[#38BDF8]" />
                  <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold">LinkedIn Profile</span>
                </div>
                <span className="text-slate-600 dark:text-[#8A8A8E] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  /in/guruvishnu-kajagar-/
                </span>
              </a>

              <a
                href="https://github.com/guruvishnuk"
                aria-label="Visit Guruvishnu GitHub Profile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors shadow-sm dark:shadow-none"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold">GitHub Deck</span>
                </div>
                <span className="text-slate-600 dark:text-[#8A8A8E] group-hover:text-blue-600 dark:group-hover:text-[#4F8CFF] transition-colors">
                  @guruvishnuk
                </span>
              </a>

              <button
                type="button"
                onClick={() => openLiveResume()}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors shadow-sm dark:shadow-none text-left cursor-pointer"
                data-cursor="hover"
                title="Open Live Resume and Export PDF"
                aria-label="Open Live Resume and Export PDF"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold">Live Resume</span>
                </div>
                <span className="text-slate-600 dark:text-[#8A8A8E] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  View &amp; Export PDF
                </span>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column — Simple Contact Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 md:p-8 bg-white/90 dark:bg-[#0a0a0c]/90 border-slate-200 dark:border-white/15 shadow-lg dark:shadow-none">
            <div className="mb-6 text-left">
              <h3 className="text-xl font-bold text-slate-900 dark:text-[#F5F5F7]">
                Tell Me About Your Idea
              </h3>
              <p className="text-sm text-slate-500 dark:text-[#8A8A8E] mt-1">
                Just explain what you're looking for in plain words — we'll figure out the rest together.
              </p>
            </div>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
