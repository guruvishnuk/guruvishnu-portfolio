import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  DollarSign,
  Clock,
  ShieldCheck,
  Check,
  RotateCcw,
  Mail,
  ExternalLink,
} from 'lucide-react';

const DESTINATION_EMAIL = 'guruvishnuk.work@gmail.com';

const PROJECT_CATEGORIES = [
  { id: 'fullstack', label: 'Full-Stack Web App', icon: '🌐' },
  { id: 'ecommerce', label: 'E-Commerce Platform', icon: '🛍️' },
  { id: '3d-webgl', label: '3D WebGL / Interactive', icon: '🪐' },
  { id: 'frontend-perf', label: 'Frontend UI & Performance', icon: '⚡' },
  { id: 'mobile-web', label: 'Mobile-First Web App', icon: '📱' },
  { id: 'custom-system', label: 'Custom System / API', icon: '🛠️' },
];

const BUDGET_OPTIONS = ['< $1,000', '$1,000 – $3,000', '$3,000 – $5,000', '$5,000+', 'Negotiable'];
const TIMELINE_OPTIONS = ['Urgent (< 2 weeks)', '1 Month', '2 – 3 Months', 'Flexible'];

const FEATURE_TAGS = [
  'User Authentication & Roles',
  'Payment Gateway Integration',
  'Interactive 3D / WebGL Graphics',
  'Real-Time WebSocket / APIs',
  'Database Schema & CMS',
  '100% Mobile Responsive',
  '95+ Lighthouse Target',
  'Admin Control Panel',
];

const inquirySchema = z.object({
  clientName: z.string().min(1, { message: 'Please enter your name' }),
  clientEmail: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  projectTitle: z.string().min(1, { message: 'Please provide a project name or concept' }),
  projectDescription: z.string().min(3, { message: 'Please describe your project (at least 3 characters)' }),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export const ContactForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(PROJECT_CATEGORIES[0].label);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'User Authentication & Roles',
    '100% Mobile Responsive',
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    inquiryId: string;
    title: string;
    category: string;
    email: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    mode: 'onTouched',
  });

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const onInvalid = (formErrors: any) => {
    console.warn('Form validation failed:', formErrors);
    setSubmitError('Please complete all required fields highlighted in red below before submitting.');
    
    // Focus the first error element
    const firstField = Object.keys(formErrors)[0];
    if (firstField) {
      const el = document.querySelector(`[name="${firstField}"]`) as HTMLElement;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
    }
  };

  const onSubmit = async (formData: InquiryFormData) => {
    setSubmitError(null);
    const payload = {
      ...formData,
      projectType: selectedCategory,
      budgetRange: selectedBudget,
      timeline: selectedTimeline,
      features: selectedFeatures,
    };
    setLastPayload(payload);

    try {
      let response: Response;
      try {
        response = await fetch('/api/project-inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } catch (netErr: any) {
        throw new Error(
          `Unable to connect to /api/project-inquiry (${netErr.message || 'Network request failed'}). If testing locally, make sure 'npm run dev' is running.`
        );
      }

      const text = await response.text();
      let result: any = {};
      try {
        result = JSON.parse(text);
      } catch (jsonErr) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText || 'Endpoint unavailable'}`);
      }

      if (!response.ok) {
        throw new Error(result.error || result.message || `SMTP transmission failed (HTTP ${response.status})`);
      }

      setSubmittedData({
        inquiryId: result.inquiryId || `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        title: formData.projectTitle,
        category: selectedCategory,
        email: formData.clientEmail,
      });

      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      console.error('SMTP transmission error:', err);
      setSubmitError(err.message || 'Failed to dispatch via SMTP endpoint.');
    }
  };

  const handleMailtoFallback = () => {
    if (!lastPayload) return;
    const subject = encodeURIComponent(
      `🚀 Project Request: ${lastPayload.projectTitle} from ${lastPayload.clientName}`
    );
    const body = encodeURIComponent(
      `Hi Guruvishnu,\n\nI want to build a project with you:\n\n` +
      `• Project Goal: ${lastPayload.projectTitle}\n` +
      `• Category: ${lastPayload.projectType}\n` +
      `• Estimated Budget: ${lastPayload.budgetRange}\n` +
      `• Target Timeline: ${lastPayload.timeline}\n` +
      `• Features Needed: ${lastPayload.features.join(', ') || 'N/A'}\n\n` +
      `• Scope & Details:\n${lastPayload.projectDescription}\n\n` +
      `From: ${lastPayload.clientName} (${lastPayload.clientEmail})\n` +
      `Company: ${lastPayload.company || 'N/A'}`
    );
    window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;
  };

  const resetInquiry = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setSubmitError(null);
    setLastPayload(null);
  };

  if (isSubmitted && submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 text-center space-y-6 rounded-2xl bg-slate-50 dark:bg-[#0a0a0c]/95 border border-emerald-500/30 shadow-lg dark:shadow-[0_10px_40px_rgba(16,185,129,0.15)]"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
            SMTP Transmission Confirmed
          </span>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white pt-1">Project Request Dispatched!</h4>
          <p className="text-sm text-slate-600 dark:text-[#8A8A8E] max-w-lg mx-auto">
            Your project inquiry for <strong className="text-slate-900 dark:text-white">"{submittedData.title}"</strong> has been securely routed via SMTP directly to{' '}
            <span className="text-blue-600 dark:text-[#4F8CFF] font-mono font-medium">{DESTINATION_EMAIL}</span>.
          </p>
        </div>

        {/* Transmission Metadata Receipt */}
        <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left font-mono text-xs space-y-2 max-w-md mx-auto shadow-sm dark:shadow-none">
          <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Inquiry Reference:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{submittedData.inquiryId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Project Category:</span>
            <span className="text-slate-900 dark:text-white">{submittedData.category}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Receipt Dispatched To:</span>
            <span className="text-slate-900 dark:text-white">{submittedData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Estimated Response:</span>
            <span className="text-blue-600 dark:text-[#4F8CFF]">&lt; 24 Hours</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={resetInquiry}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 text-xs font-mono text-slate-800 dark:text-white flex items-center gap-2 transition-all cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
            <span>Submit Another Project</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6 font-sans text-left" noValidate>
      {/* 1. Project Category Selection */}
      <div className="space-y-2.5">
        <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase flex items-center gap-1.5 font-semibold">
          <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
          1. Select Project Category *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PROJECT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.label)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-[#4F8CFF]/15 border-blue-500 dark:border-[#4F8CFF] text-blue-900 dark:text-white shadow-sm dark:shadow-[0_0_15px_rgba(79,140,255,0.25)]'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E] hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="font-medium leading-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Project Title / Vision */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase font-semibold">
          2. Project Name / What Do You Want Built? *
        </label>
        <input
          {...register('projectTitle')}
          type="text"
          placeholder="e.g. AI-Powered Resume Parser or E-Commerce Grocery Web App"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
        />
        {errors.projectTitle && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1 font-mono">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.projectTitle.message}
          </p>
        )}
      </div>

      {/* 3. Budget & Timeline Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Budget */}
        <div className="space-y-2">
          <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase flex items-center gap-1.5 font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Estimated Budget Range
          </label>
          <div className="flex flex-wrap gap-1.5">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setSelectedBudget(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedBudget === opt
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm'
                    : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase flex items-center gap-1.5 font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            Target Delivery Timeline
          </label>
          <div className="flex flex-wrap gap-1.5">
            {TIMELINE_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setSelectedTimeline(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedTimeline === opt
                    ? 'bg-amber-500/20 border border-amber-500/50 text-amber-700 dark:text-amber-300 font-semibold shadow-sm'
                    : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Requested Deliverables & Feature Modules */}
      <div className="space-y-2">
        <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase flex items-center gap-1.5 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-[#38BDF8]" />
          Key Features Needed (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {FEATURE_TAGS.map((tag) => {
            const isChecked = selectedFeatures.includes(tag);
            return (
              <button
                type="button"
                key={tag}
                onClick={() => toggleFeature(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  isChecked
                    ? 'bg-sky-500/20 border border-sky-500/50 text-sky-900 dark:text-white font-medium'
                    : 'bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isChecked ? <Check className="w-3 h-3 text-sky-600 dark:text-[#38BDF8]" /> : null}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Detailed Project Requirements */}
      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase font-semibold">
          3. Detailed Requirements & Project Scope *
        </label>
        <textarea
          {...register('projectDescription')}
          rows={4}
          placeholder="Describe what you want built: key user flows, target audience, technical requirements, or reference websites..."
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors resize-none"
        />
        {errors.projectDescription && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1 font-mono">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {errors.projectDescription.message}
          </p>
        )}
      </div>

      {/* 6. Client Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase font-semibold">
            Your Name *
          </label>
          <input
            {...register('clientName')}
            type="text"
            placeholder="e.g. Alex Morgan"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
          />
          {errors.clientName && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.clientName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase font-semibold">
            Your Email Address *
          </label>
          <input
            {...register('clientEmail')}
            type="email"
            placeholder="alex@company.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
          />
          {errors.clientEmail && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {errors.clientEmail.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-slate-600 dark:text-[#8A8A8E] uppercase font-semibold">
          Company / Brand Name (Optional)
        </label>
        <input
          {...register('company')}
          type="text"
          placeholder="e.g. TechCorp / Solo Founder"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
        />
      </div>

      {/* Error notification banner */}
      {submitError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-600 dark:text-red-300 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Submission Notice:</strong>
              <span>{submitError}</span>
            </div>
          </div>
          {lastPayload && (
            <button
              type="button"
              onClick={handleMailtoFallback}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-200 border border-red-500/40 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Click to Send via Direct Email Client</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Protocol Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-[#8A8A8E] px-1">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Encrypted via TLS SMTP Protocol
        </span>
        <span className="text-blue-600 dark:text-[#4F8CFF]">Target: {DESTINATION_EMAIL}</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] transition-all shadow-[0_0_25px_rgba(79,140,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 select-none"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Transmitting via SMTP...</span>
          </>
        ) : (
          <>
            <span>Send Project Build Request</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
