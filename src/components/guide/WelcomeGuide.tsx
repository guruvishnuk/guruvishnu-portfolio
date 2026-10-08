import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, FileText, Code, Bot, X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const GUIDE_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to my Portfolio!',
    description: "It's not just a static page—it's a living playground built with React, Tailwind, and Framer Motion. Let me give you a quick tour.",
    icon: Sparkles,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    id: 'resume',
    title: 'Live Interactive Resume',
    description: 'Tired of PDFs? Click the "Live Resume" button in the hero section to see my professional experience, skills, and education dynamically loaded.',
    icon: FileText,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  },
  {
    id: 'projects',
    title: 'Project Deep Dives',
    description: 'Explore my featured projects, from Trade Logistics platforms to Biometric E-Voting systems, complete with impact metrics and tech stacks.',
    icon: Code,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    id: 'ai-chat',
    title: 'Ask the AI Assistant',
    description: 'Have specific questions about my experience? Use the AI Chatbot in the bottom right corner to ask anything about my background or skills.',
    icon: Bot,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10'
  }
];

export const WelcomeGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Listen for manual trigger
    const handleOpen = () => {
      setCurrentStep(0);
      setIsOpen(true);
    };
    window.addEventListener('open-tour-guide', handleOpen);

    // Check if the user has seen the guide before
    const hasSeenGuide = localStorage.getItem('guruvishnu-portfolio-guide-seen');
    if (!hasSeenGuide) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('open-tour-guide', handleOpen);
      };
    }

    return () => window.removeEventListener('open-tour-guide', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('guruvishnu-portfolio-guide-seen', 'true');
  };

  const handleNext = () => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header / Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / GUIDE_STEPS.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-between items-center p-4 border-b border-white/5">
              <div className="text-sm font-mono text-[#8A8A8E]">
                Guide ({currentStep + 1}/{GUIDE_STEPS.length})
              </div>
              <button 
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-[#8A8A8E] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 min-h-[280px] flex flex-col relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col items-center text-center gap-4"
                >
                  <div className={`p-4 rounded-2xl ${GUIDE_STEPS[currentStep].bg}`}>
                    {React.createElement(GUIDE_STEPS[currentStep].icon, {
                      className: `w-8 h-8 ${GUIDE_STEPS[currentStep].color}`
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-[#F5F5F7] mt-2">
                    {GUIDE_STEPS[currentStep].title}
                  </h3>
                  <p className="text-[#8A8A8E] text-sm leading-relaxed">
                    {GUIDE_STEPS[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer / Controls */}
            <div className="p-4 sm:px-8 sm:pb-8 flex items-center justify-between gap-4">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8A8A8E] hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
              >
                {currentStep === GUIDE_STEPS.length - 1 ? (
                  <>
                    Let's Explore <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
