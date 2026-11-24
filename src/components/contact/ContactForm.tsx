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
  RotateCcw,
  Mail,
  ExternalLink,
  Clock,
} from 'lucide-react';

const DESTINATION_EMAIL = 'guruvishnuk.work@gmail.com';

const PROJECT_TYPES = [
  { id: 'website', label: 'Website', icon: '🌐' },
  { id: 'store', label: 'Online Store', icon: '🛍️' },
  { id: 'app', label: 'Web or Mobile App', icon: '📱' },
  { id: 'redesign', label: 'Improve Existing Site', icon: '✨' },
  { id: 'unsure', label: 'Not Sure Yet', icon: '💡' },
];

const BUDGET_OPTIONS = [
  'Not sure yet / Flexible',
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $5,000',
  '$5,000+',
];

const TIMELINE_OPTIONS = [
  'Flexible / No rush',
  'As soon as possible',
  'Within 1 month',
  '2 – 3 months',
];

const inquirySchema = z.object({
  clientName: z.string().min(1, { message: 'Please enter your name' }),
  clientEmail: z.string().email({ message: 'Please enter a valid email address' }),
  projectTitle: z.string().min(1, { message: 'Please give a short title or topic' }),
  projectDescription: z.string().min(3, { message: 'Please share a few words about what you need' }),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export const ContactForm: React.FC = () => {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].label);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[0]);

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

  const onInvalid = (formErrors: any) => {
    setSubmitError('Please fill in the highlighted fields below.');

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
      projectType: selectedType,
      budgetRange: selectedBudget,
      timeline: selectedTimeline,
      features: [],
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
      } catch {
        throw new Error(
          'Could not send automatically right now. You can use the button below to send it via your email app instead.'
        );
      }

      const text = await response.text();
      let result: any = {};
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(`Unable to send right now (HTTP ${response.status}).`);
      }

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Unable to send your message right now.');
      }

      setSubmittedData({
        inquiryId: result.inquiryId || `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        title: formData.projectTitle,
        category: selectedType,
        email: formData.clientEmail,
      });

      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setSubmitError(err.message || 'Something went wrong while sending your message.');
    }
  };

  const handleMailtoFallback = () => {
    if (!lastPayload) return;
    const subject = encodeURIComponent(
      `Project Inquiry: ${lastPayload.projectTitle} from ${lastPayload.clientName}`
    );
    const body = encodeURIComponent(
      `Hi Guruvishnu,\n\nI'd like to talk about a project:\n\n` +
      `• Looking for: ${lastPayload.projectType}\n` +
      `• Topic: ${lastPayload.projectTitle}\n` +
      `• Budget: ${lastPayload.budgetRange}\n` +
      `• Timeline: ${lastPayload.timeline}\n\n` +
      `• Details:\n${lastPayload.projectDescription}\n\n` +
      `From: ${lastPayload.clientName} (${lastPayload.clientEmail})`
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
            Message Received
          </span>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white pt-1">Thanks for Reaching Out!</h4>
          <p className="text-sm text-slate-600 dark:text-[#8A8A8E] max-w-lg mx-auto">
            I've received your message about <strong className="text-slate-900 dark:text-white">"{submittedData.title}"</strong> and sent a copy to{' '}
            <span className="text-blue-600 dark:text-[#4F8CFF] font-medium">{submittedData.email}</span>. I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left text-xs space-y-2 max-w-md mx-auto shadow-sm dark:shadow-none">
          <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Reference ID</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{submittedData.inquiryId}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Looking For</span>
            <span className="text-slate-900 dark:text-white">{submittedData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-[#8A8A8E]">Expected Reply</span>
            <span className="text-blue-600 dark:text-[#4F8CFF]">Within 24 Hours</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={resetInquiry}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/15 text-xs text-slate-800 dark:text-white flex items-center gap-2 transition-all cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
            <span>Send Another Message</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-5 font-sans text-left" noValidate>
      {/* 1. Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="clientName" className="block text-sm text-slate-800 dark:text-[#F5F5F7] font-medium">
            Your Name <span className="text-blue-600 dark:text-[#4F8CFF]">*</span>
          </label>
          <input
            id="clientName"
            {...register('clientName')}
            type="text"
            placeholder="e.g. Alex Morgan"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
          />
          {errors.clientName && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.clientName.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="clientEmail" className="block text-sm text-slate-800 dark:text-[#F5F5F7] font-medium">
            Your Email <span className="text-blue-600 dark:text-[#4F8CFF]">*</span>
          </label>
          <input
            id="clientEmail"
            {...register('clientEmail')}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
          />
          {errors.clientEmail && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.clientEmail.message}
            </p>
          )}
        </div>
      </div>

      {/* 2. Simple Type Picker */}
      <div className="space-y-2">
        <label className="block text-sm text-slate-800 dark:text-[#F5F5F7] font-medium">
          What do you need help with?
        </label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((item) => {
            const isSelected = selectedType === item.label;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedType(item.label)}
                className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-[#4F8CFF]/15 border-blue-500 dark:border-[#4F8CFF] text-blue-900 dark:text-white shadow-sm dark:shadow-[0_0_15px_rgba(79,140,255,0.2)] font-medium'
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#8A8A8E] hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Short Project Topic */}
      <div className="space-y-1.5">
        <label htmlFor="projectTitle" className="block text-sm text-slate-800 dark:text-[#F5F5F7] font-medium">
          What's your project about? <span className="text-blue-600 dark:text-[#4F8CFF]">*</span>
        </label>
        <input
          id="projectTitle"
          {...register('projectTitle')}
          type="text"
          placeholder="e.g. Website for my business, or an online booking page"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors"
        />
        {errors.projectTitle && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.projectTitle.message}
          </p>
        )}
      </div>

      {/* 4. Plain-English Description */}
      <div className="space-y-1.5">
        <label htmlFor="projectDescription" className="block text-sm text-slate-800 dark:text-[#F5F5F7] font-medium">
          Tell me a little more <span className="text-blue-600 dark:text-[#4F8CFF]">*</span>
        </label>
        <textarea
          id="projectDescription"
          {...register('projectDescription')}
          rows={4}
          placeholder="Share your idea in your own words — what you want it to do, or any websites you like. No technical details needed!"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors resize-none"
        />
        {errors.projectDescription && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.projectDescription.message}
          </p>
        )}
      </div>

      {/* 5. Optional Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="budgetRange" className="block text-xs text-slate-600 dark:text-[#8A8A8E] font-medium">
            Estimated Budget (Optional)
          </label>
          <select
            id="budgetRange"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors cursor-pointer"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-white dark:bg-[#0a0a0c] text-slate-900 dark:text-[#F5F5F7]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="timeline" className="block text-xs text-slate-600 dark:text-[#8A8A8E] font-medium">
            When do you need it? (Optional)
          </label>
          <select
            id="timeline"
            value={selectedTimeline}
            onChange={(e) => setSelectedTimeline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#4F8CFF] transition-colors cursor-pointer"
          >
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-white dark:bg-[#0a0a0c] text-slate-900 dark:text-[#F5F5F7]">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error banner */}
      {submitError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-300 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
            <span>{submitError}</span>
          </div>
          {lastPayload && (
            <button
              type="button"
              onClick={handleMailtoFallback}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-200 border border-red-500/40 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send via Email App Instead</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Friendly reassurance */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-[#8A8A8E] px-1">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
          Usually replies within 24 hours
        </span>
        <span>Or email {DESTINATION_EMAIL}</span>
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
            <span>Sending your message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
