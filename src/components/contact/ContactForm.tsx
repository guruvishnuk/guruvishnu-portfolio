import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { MagneticButton } from '../ui/MagneticButton';
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      // 1. Try sending via Formspree or custom API if VITE_FORMSPREE_ID or VITE_CONTACT_ENDPOINT is defined
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || (import.meta.env.VITE_FORMSPREE_ID ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}` : null);

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            company: data.company || 'N/A',
            message: data.message,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send via serverless endpoint.');
        }
      } else {
        // 2. Direct Mailto Fallback: Launch pre-filled email client to deliver to guruvishnukajagar@gmail.com
        const subject = encodeURIComponent(`Portfolio Contact: ${data.name}${data.company ? ` from ${data.company}` : ''}`);
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}\n\nMessage:\n${data.message}`
        );
        window.location.href = `mailto:guruvishnukajagar@gmail.com?subject=${subject}&body=${body}`;
      }

      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Contact form submission error:', err);
      // Even if fetch fails, fallback to mailto link so user message is never lost
      const subject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:guruvishnukajagar@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitted(true);
      reset();
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center space-y-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
      >
        <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
        <h4 className="text-xl font-bold text-white">Message Dispatched!</h4>
        <p className="text-sm text-[#8A8A8E]">
          Thank you for reaching out! Your message has been prepared for delivery to{' '}
          <strong className="text-[#F5F5F7]">guruvishnukajagar@gmail.com</strong>.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-xs font-mono text-[#4F8CFF] underline cursor-pointer"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
      <div>
        <label className="block text-xs font-mono text-[#8A8A8E] mb-1.5 uppercase">
          Your Name *
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="e.g. Sarah Connor"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-[#4F8CFF] transition-colors"
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono text-[#8A8A8E] mb-1.5 uppercase">
          Email Address *
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="alex@example.com"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-[#4F8CFF] transition-colors"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-mono text-[#8A8A8E] mb-1.5 uppercase">
          Company / Organization (Optional)
        </label>
        <input
          {...register('company')}
          type="text"
          placeholder="Acme Corp"
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-[#4F8CFF] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-[#8A8A8E] mb-1.5 uppercase">
          Project Details / Message *
        </label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Hi Guruvishnu, we're building a high-performance React application..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8A8A8E]/60 text-sm focus:outline-none focus:border-[#4F8CFF] transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.message.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-xs text-red-400 font-mono">{submitError}</p>
      )}

      <MagneticButton variant="accent" className="w-full py-4 text-base font-bold">
        {isSubmitting ? (
          <span>Transmitting...</span>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </MagneticButton>
    </form>
  );
};
