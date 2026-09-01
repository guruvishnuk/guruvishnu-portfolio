import React, { useState } from 'react';
import { RESUME_DATA } from '../../data/resumeKnowledge';
import {
  Printer,
  Download,
  Copy,
  Check,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Sparkles,
  Layers,
} from 'lucide-react';

interface LiveResumePaperProps {
  onClose?: () => void;
  showControls?: boolean;
}

export const LiveResumePaper: React.FC<LiveResumePaperProps> = ({ onClose, showControls = true }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
GURUVISHNU B KAJAGAR
Pune, India | guruvishnu1927@gmail.com | +91-9686715615
GitHub: https://github.com/guruvishnuk | LinkedIn: https://linkedin.com/in/guruvishnu-kajagar | Portfolio: https://guruvishnuk.dev

SUMMARY
${RESUME_DATA.summary}

PROFESSIONAL EXPERIENCE
CandorWorks (${RESUME_DATA.experience[0].period})
${RESUME_DATA.experience[0].roles.map(r => `\n${r.role} (${r.period})\n` + r.highlights.map(h => `• ${h}`).join('\n')).join('\n')}

PROJECTS
${RESUME_DATA.projects.map(p => `\n${p.name} - ${p.subtitle}\n` + p.details.map(d => `• ${d}`).join('\n')).join('\n')}

EDUCATION
${RESUME_DATA.education.degree} - ${RESUME_DATA.education.institution} (${RESUME_DATA.education.period})

TECHNICAL SKILLS
Frontend: ${RESUME_DATA.skills.frontend.join(', ')}
3D & Animation: ${RESUME_DATA.skills.animation.join(', ')}
Build Tools & Forms: ${RESUME_DATA.skills.buildAndForms.join(', ')}
CMS: ${RESUME_DATA.skills.cms.join(', ')}
API & Integration: ${RESUME_DATA.skills.api.join(', ')}
Backend & Database: ${RESUME_DATA.skills.backend.join(', ')}
Tools & Practices: ${RESUME_DATA.skills.tools.join(', ')}

TRAINING & CERTIFICATIONS
${RESUME_DATA.certifications.map(c => `• ${c.title} (${c.issuer}): ${c.description}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Floating Control Bar */}
      {showControls && (
        <div className="w-full max-w-4xl mb-4 p-3 rounded-2xl glass-card flex flex-wrap items-center justify-between gap-3 shadow-xl print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4F8CFF]/20 border border-[#4F8CFF]/50 text-xs font-mono font-semibold text-[#4F8CFF]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE RESUME DOCUMENT
            </span>
            <span className="hidden sm:inline text-xs text-[var(--theme-text-secondary)]">
              Updated for 2026 Production Standards
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 border border-black/10 dark:border-white/10 text-xs font-medium text-black dark:text-white transition-all cursor-pointer"
              title="Copy plain text resume to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#38BDF8]" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F8CFF] hover:bg-[#3B72E6] text-xs font-semibold text-white shadow-lg shadow-[#4F8CFF]/25 transition-all cursor-pointer"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-red-500/20 hover:text-red-500 dark:hover:text-red-400 text-xs font-medium text-[var(--theme-text-secondary)] border border-black/10 dark:border-white/10 transition-all cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* A4 Paper Document Container */}
      <div className="w-full max-w-4xl bg-[#FFFFFF] text-[#1A1A1A] dark:bg-[#0F141C] dark:text-[#E6EDF3] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-10 md:p-12 font-serif transition-colors print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* RESUME HEADER */}
        <header className="border-b border-black/15 dark:border-white/15 pb-6 mb-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans text-black dark:text-white print:text-black">
                {RESUME_DATA.name}
              </h1>
              <p className="text-sm font-sans font-medium text-[#2563EB] dark:text-[#60A5FA] mt-1 print:text-[#2563EB]">
                {RESUME_DATA.title}
              </p>
              <p className="text-xs font-sans text-neutral-600 dark:text-neutral-400 mt-0.5 print:text-neutral-600">
                📍 {RESUME_DATA.location}
              </p>
            </div>

            {/* Quick Contact Links */}
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-center gap-1.5 text-xs font-sans">
              <a
                href={RESUME_DATA.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#2563EB] dark:text-[#60A5FA] hover:underline print:text-black"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/guruvishnuk</span>
              </a>
              <a
                href={RESUME_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#2563EB] dark:text-[#60A5FA] hover:underline print:text-black"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/guruvishnu-kajagar</span>
              </a>
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="flex items-center gap-1.5 text-[#2563EB] dark:text-[#60A5FA] hover:underline print:text-black"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.email}</span>
              </a>
              <a
                href={`tel:${RESUME_DATA.phone}`}
                className="flex items-center gap-1.5 text-[#2563EB] dark:text-[#60A5FA] hover:underline print:text-black"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.phone}</span>
              </a>
            </div>
          </div>
        </header>

        {/* SECTION: PROFESSIONAL SUMMARY */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm font-sans leading-relaxed text-neutral-800 dark:text-neutral-200 print:text-black">
            {RESUME_DATA.summary}
          </p>
        </section>

        {/* SECTION: PROFESSIONAL EXPERIENCE */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-3">
            Professional Experience
          </h2>

          {RESUME_DATA.experience.map((exp, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex justify-between items-baseline font-sans">
                <span className="font-bold text-sm sm:text-base text-black dark:text-white print:text-black">
                  {exp.company}
                </span>
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 print:text-neutral-600">
                  {exp.period}
                </span>
              </div>

              {exp.roles.map((r, rIdx) => (
                <div key={rIdx} className="space-y-1.5 pl-2 sm:pl-3 border-l-2 border-[#2563EB]/40 dark:border-[#60A5FA]/40">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-sans">
                    <span className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 print:text-black">
                      {r.role}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 print:text-neutral-600">
                      {r.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed print:text-black">
                    {r.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="pl-1">
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* SECTION: PROJECTS */}
        <section className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-3">
            Projects
          </h2>

          <div className="space-y-4 font-sans">
            {RESUME_DATA.projects.map((proj, pIdx) => (
              <div key={pIdx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-black dark:text-white print:text-black">
                      {proj.name}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      – {proj.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2563EB] dark:text-[#60A5FA] hover:underline flex items-center gap-1 print:text-black"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2563EB] dark:text-[#60A5FA] hover:underline flex items-center gap-1 print:text-black"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed print:text-black">
                  {proj.details.map((d, dIdx) => (
                    <li key={dIdx} className="pl-1">
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: EDUCATION */}
        <section className="mb-6 font-sans">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-2">
            Education
          </h2>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="font-bold text-xs sm:text-sm text-black dark:text-white print:text-black">
                {RESUME_DATA.education.degree}
              </span>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 ml-2">
                , {RESUME_DATA.education.institution}
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 print:text-neutral-600">
              {RESUME_DATA.education.period}
            </span>
          </div>
        </section>

        {/* SECTION: TECHNICAL SKILLS */}
        <section className="mb-6 font-sans">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-3">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">Frontend: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.frontend.join(', ')}</span>
            </div>
            <div>
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">3D & Animation: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.animation.join(', ')}</span>
            </div>
            <div>
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">Build Tools & Forms: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.buildAndForms.join(', ')}</span>
            </div>
            <div>
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">CMS: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.cms.join(', ')}</span>
            </div>
            <div>
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">API & Integration: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.api.join(', ')}</span>
            </div>
            <div>
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">Backend & Database: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.backend.join(', ')}</span>
            </div>
            <div className="sm:col-span-2">
              <strong className="text-neutral-900 dark:text-neutral-100 font-bold print:text-black">Tools & Practices: </strong>
              <span className="text-neutral-700 dark:text-neutral-300 print:text-black">{RESUME_DATA.skills.tools.join(', ')}</span>
            </div>
          </div>
        </section>

        {/* SECTION: TRAINING & CERTIFICATIONS */}
        <section className="mb-6 font-sans">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-3">
            Training & Certifications
          </h2>

          <div className="space-y-3 text-xs">
            {RESUME_DATA.certifications.map((cert, cIdx) => (
              <div key={cIdx} className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-neutral-900 dark:text-neutral-100 print:text-black">
                  <span>{cert.title} | {cert.issuer}</span>
                  {cert.period && <span className="font-mono font-normal text-neutral-500 dark:text-neutral-400">{cert.period}</span>}
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed print:text-black">
                  {cert.description}
                </p>
                {cert.awards && (
                  <div className="flex gap-2 font-mono text-[11px] text-[#2563EB] dark:text-[#60A5FA]">
                    {cert.awards.map((a, aIdx) => (
                      <span key={aIdx}>🏆 {a}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: ACHIEVEMENTS */}
        <section className="font-sans">
          <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400 border-b border-black/10 dark:border-white/10 pb-1 mb-2">
            Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed print:text-black">
            {RESUME_DATA.achievements.map((ach, aIdx) => (
              <li key={aIdx}>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
