import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { ContactForm } from './ContactForm';
import { Mail, Linkedin, Github, FileText, Radio, MapPin, Clock } from 'lucide-react';

const CONTACT_EMAIL = 'guruvishnu1927@gmail.com';

export const ContactControlPanel: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="pulse">Direct Control Panel</Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F5F5F7]">
          Initiate Contact
        </h2>
        <p className="text-[#8A8A8E] text-base md:text-lg">
          Available for senior frontend roles, technical consultation, and architectural engagements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column — Hardware Deck Toggle Rows */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-6 bg-[#0a0a0c]/90">
            {/* Live Status Readout Header */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#8A8A8E] uppercase flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  Live System Status
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  ONLINE
                </span>
              </div>

              <div className="space-y-1 pt-1 font-mono text-xs text-[#F5F5F7]">
                <div className="flex items-center gap-2 text-[#8A8A8E]">
                  <MapPin className="w-3.5 h-3.5 text-[#4F8CFF]" />
                  <span>Pune, India (IST / UTC +5:30)</span>
                </div>
                <div className="flex items-center gap-2 text-[#8A8A8E]">
                  <Clock className="w-3.5 h-3.5 text-[#4F8CFF]" />
                  <span>Response Time: &lt; 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Hardware Control Deck Rows */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#4F8CFF]" />
                  <span className="text-[#F5F5F7] font-semibold">Email Channel</span>
                </div>
                <span className="text-[#8A8A8E] group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                  {CONTACT_EMAIL}
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/guruvishnu-kajagar-/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                  <span className="text-[#F5F5F7] font-semibold">LinkedIn Profile</span>
                </div>
                <span className="text-[#8A8A8E] group-hover:text-white transition-colors">
                  /in/guruvishnu-kajagar-/
                </span>
              </a>

              <a
                href="https://github.com/guruvishnuk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-purple-400" />
                  <span className="text-[#F5F5F7] font-semibold">GitHub Deck</span>
                </div>
                <span className="text-[#8A8A8E] group-hover:text-[#4F8CFF] transition-colors">
                  @guruvishnuk
                </span>
              </a>

              <a
                href="/Guruvishnu_Kajagar_Resume.pdf"
                target="_blank"
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#4F8CFF]/50 flex items-center justify-between group transition-colors"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="text-[#F5F5F7] font-semibold">PDF Resume</span>
                </div>
                <span className="text-[#8A8A8E] group-hover:text-white transition-colors">
                  Download .pdf
                </span>
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Right Column — Message Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 md:p-8 bg-[#0a0a0c]/90 border-white/15">
            <h3 className="text-xl font-bold text-[#F5F5F7] mb-2 text-left">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#8A8A8E] font-mono mb-6 text-left">
              Delivered directly to {CONTACT_EMAIL}
            </p>
            <ContactForm />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
