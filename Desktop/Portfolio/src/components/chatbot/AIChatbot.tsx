import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

type QuickPrompt = { label: string; prompt: string };

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const QUICK_PROMPTS: QuickPrompt[] = [
  { label: 'Who is Guruvishnu?', prompt: 'Who is Guruvishnu Kajagar?' },
  { label: 'Tech Stack', prompt: 'What technologies does Guruvishnu use?' },
  { label: 'Work Experience', prompt: 'Tell me about his work experience.' },
  { label: 'Projects', prompt: 'What are his notable projects?' },
];

const KNOWLEDGE_BASE: Record<string, string> = {
  who: `**Guruvishnu Kajagar** is a passionate Frontend Engineer based in Pune, India. He currently works at **CandorWorks**, building clean, fast, and responsive React applications. He specialises in TypeScript, reusable UI component libraries, and frontend performance optimisation.`,

  tech: `Guruvishnu's core technology stack includes:\n\n• **Frontend** — React 19, TypeScript 5.7, Next.js\n• **Styling** — Tailwind CSS v4, CSS Modules, Glassmorphism\n• **Animation** — Motion (Framer Motion), GSAP, Three.js\n• **Build Tools** — Vite 6, Webpack\n• **Backend** — Node.js, Express, Python\n• **Database** — MongoDB, PostgreSQL\n• **DevOps** — Git, GitHub Actions, Vercel, Docker`,

  experience: `Guruvishnu is currently a **Frontend Engineer at CandorWorks** where he builds production-grade React applications, designs reusable component systems, and optimises frontend performance. He is passionate about clean code, strong typing with TypeScript, and delivering pixel-perfect user interfaces.`,

  projects: `Some of Guruvishnu's notable projects:\n\n🍽️ **FreshBites Foodrecipe** — Full-stack responsive food discovery app built with React & Tailwind CSS. Live at fresh-bites-foodrecipe.vercel.app\n\n🗳️ **Secure E-Voting** — A blockchain-inspired secure electronic voting platform.\n\n📊 **GDP Dashboard** — Interactive data visualisation dashboard.\n\n📝 **Blog Project** — Full-stack blog application with CRUD features.\n\n💼 **Portfolio** — This very site! Built with React 19, TypeScript, Motion & Vite featuring 3D project showcases and real-time GitHub telemetry.`,

  contact: `You can reach Guruvishnu at:\n\n📧 **Email** — guruvishnu1927@gmail.com\n🔗 **LinkedIn** — linkedin.com/in/guruvishnu-kajagar-\n🐙 **GitHub** — github.com/guruvishnuk`,

  hire: `Guruvishnu is **currently available for hire**! He's open to senior frontend roles, technical consultation, and architectural engagements. Feel free to reach out via the contact form on this site or email guruvishnu1927@gmail.com.`,
};

/* ------------------------------------------------------------------ */
/*  Simple local response logic                                        */
/* ------------------------------------------------------------------ */

const generateResponse = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes('who') || q.includes('about') || q.includes('guruvishnu') || q.includes('yourself'))
    return KNOWLEDGE_BASE.who;
  if (q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework') || q.includes('tool'))
    return KNOWLEDGE_BASE.tech;
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('candor') || q.includes('company'))
    return KNOWLEDGE_BASE.experience;
  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('freshbite') || q.includes('app'))
    return KNOWLEDGE_BASE.projects;
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('github'))
    return KNOWLEDGE_BASE.contact;
  if (q.includes('hire') || q.includes('available') || q.includes('open') || q.includes('role') || q.includes('job'))
    return KNOWLEDGE_BASE.hire;
  if (q.includes('hello') || q.includes('hi') || q.includes('hey'))
    return `Hey there! 👋 I'm Guruvishnu's AI assistant. I can tell you about his skills, projects, work experience, or how to get in touch. What would you like to know?`;

  return `Great question! I'm an AI assistant trained on Guruvishnu's portfolio data. I can help with:\n\n• **Background & Bio** — Who is Guruvishnu?\n• **Tech Stack** — Technologies he uses\n• **Work Experience** — Current role & history\n• **Projects** — Notable open-source work\n• **Contact** — How to reach him\n\nTry asking one of these!`;
};

/* ------------------------------------------------------------------ */
/*  Markdown-lite renderer (bold, bullet, newlines)                    */
/* ------------------------------------------------------------------ */

const renderMarkdown = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // bold
    const parts = line.split(/(\*\*.*?\*\*)/g).map((seg, j) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return (
          <strong key={j} className="text-white font-semibold">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      return <span key={j}>{seg}</span>;
    });

    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={i} className="flex items-start gap-2 py-0.5">
          <span className="text-[#4F8CFF] mt-0.5 shrink-0">•</span>
          <span>{parts}</span>
        </div>
      );
    }

    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i}>{parts}</p>;
  });
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hey! 👋 I'm **Guru AI**, Guruvishnu's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* auto-scroll */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /* detect scroll-away-from-bottom */
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  };

  /* focus input when opened */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  /* send message */
  const handleSend = async (text?: string) => {
    const value = (text ?? input).trim();
    if (!value) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: value,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

    const botMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: generateResponse(value),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  /* copy */
  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content.replace(/\*\*/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  /* reset */
  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hey! 👋 I'm **Guru AI**, Guruvishnu's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch!`,
        timestamp: new Date(),
      },
    ]);
  };

  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ==================== FLOATING TRIGGER BUTTON ==================== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#4F8CFF] text-white shadow-[0_0_30px_rgba(79,140,255,0.4)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_40px_rgba(79,140,255,0.6)] transition-all cursor-pointer group"
            data-cursor="hover"
            aria-label="Open AI Chatbot"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full border-2 border-[#4F8CFF] animate-ping opacity-30 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==================== CHAT WINDOW ==================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 flex flex-col overflow-hidden
              bg-[#0a0a0c]/95 backdrop-blur-2xl
              border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(79,140,255,0.08)]
              ${
                isExpanded
                  ? 'inset-4 rounded-2xl'
                  : 'bottom-6 right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] rounded-2xl'
              }
            `}
          >
            {/* -------- HEADER -------- */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-purple-500 flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0c]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Guru AI
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[10px] font-mono text-emerald-400">Online · Portfolio Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-colors hidden sm:flex"
                  title={isExpanded ? 'Minimize' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsExpanded(false);
                  }}
                  className="p-2 rounded-lg text-[#8A8A8E] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* -------- MESSAGES -------- */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-[#4F8CFF]/20 to-purple-500/20 border border-[#4F8CFF]/30'
                        : 'bg-white/10 border border-white/15'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="w-3.5 h-3.5 text-[#4F8CFF]" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-[#F5F5F7]" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`group relative max-w-[80%]`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed font-sans ${
                        msg.role === 'assistant'
                          ? 'bg-white/[0.04] border border-white/8 text-[#d1d1d6] rounded-tl-md'
                          : 'bg-[#4F8CFF] text-white rounded-tr-md'
                      }`}
                    >
                      {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                    </div>

                    {/* Timestamp + Copy */}
                    <div
                      className={`flex items-center gap-2 mt-1.5 text-[10px] font-mono text-[#8A8A8E] opacity-0 group-hover:opacity-100 transition-opacity ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4F8CFF]/20 to-purple-500/20 border border-[#4F8CFF]/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#4F8CFF]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white/[0.04] border border-white/8">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-[#4F8CFF] animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom FAB */}
            <AnimatePresence>
              {showScrollDown && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[120px] left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-lg"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* -------- QUICK PROMPTS -------- */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                {QUICK_PROMPTS.map((qp) => (
                  <button
                    key={qp.label}
                    onClick={() => handleSend(qp.prompt)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d1d1d6] hover:border-[#4F8CFF]/50 hover:text-white hover:bg-[#4F8CFF]/10 transition-all active:scale-95"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            )}

            {/* -------- INPUT BAR -------- */}
            <div className="px-4 py-3 border-t border-white/8 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me about Guruvishnu..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#8A8A8E]/60 focus:outline-none focus:border-[#4F8CFF]/60 transition-colors font-sans"
                  disabled={isTyping}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-[#4F8CFF] text-white flex items-center justify-center hover:bg-[#3b72e0] disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] font-mono text-[#8A8A8E]/60 text-center mt-2">
                Guru AI · Trained on portfolio data · Not connected to any LLM
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
