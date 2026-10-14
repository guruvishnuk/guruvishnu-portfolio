import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ContactForm } from './ContactForm';
import { Mail, Linkedin, Github, FileText, Radio, MapPin, Clock } from 'lucide-react';

export const ContactControlPanel: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Direct Control Panel</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F5F5F7]">
          Initiate Contact
        </h2>
        <p className="text-slate-600 dark:text-[#8A8A8E] text-base md:text-lg">
          Available for junior frontend roles, technical consultation, and architectural engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column — Hardware Deck Toggle Rows */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-6 bg-white/90 dark:bg-[#0a0a0c]/90 border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
            {/* Live Status Readout Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase flex items-center gap-1.5 font-medium">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
                  Live System Status
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                  ONLINE
                </span>
              </div>

              <div className="space-y-1 pt-1 font-mono text-xs text-slate-800 dark:text-[#F5F5F7]">
                <div className="flex items-center gap-2 text-slate-600 dark:text-[#8A8A8E]">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
                  <span>Pune, India (IST / UTC +5:30)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-[#8A8A8E]">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
                  <span>Response Time: &lt; 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Hardware Control Deck Rows */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href="mailto:guruvishnukajagar@gmail.com"
                className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors shadow-sm dark:shadow-none"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-[#4F8CFF]" />
                  <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold">Email Channel</span>
                </div>
                <span className="text-slate-600 dark:text-[#8A8A8E] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  guruvishnukajagar@gmail.com
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/guruvishnu-kajagar-/"
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

              <a
                href="/Guruvishnu_Kajagar_Resume.pdf"
                target="_blank"
                className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors shadow-sm dark:shadow-none"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-slate-900 dark:text-[#F5F5F7] font-semibold">PDF Resume</span>
                </div>
                <span className="text-slate-600 dark:text-[#8A8A8E] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Download .pdf
                </span>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right Column — Message Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 md:p-8 bg-white/90 dark:bg-[#0a0a0c]/90 border-slate-200 dark:border-white/15 shadow-lg dark:shadow-none">
            <h3 className="text-xl font-bold text-slate-900 dark:text-[#F5F5F7] mb-2 text-left">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8A8A8E] font-mono mb-6 text-left">
              Validated using Zod & React Hook Form
            </p>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
