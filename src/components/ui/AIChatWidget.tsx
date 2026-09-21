import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';
import { generateResumeResponse, ChatMessage } from '../../services/aiService';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: "Hi! I'm Guruvishnu's AI Assistant. Ask me anything about his experience, projects, or skills!",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await generateResumeResponse(userMsg.text);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[#4F8CFF] text-white shadow-lg flex items-center justify-center relative group"
            >
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0a0c]"></span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-[350px] h-[500px] max-h-[80vh] bg-[var(--theme-bg)] border border-[var(--glass-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-[var(--glass-border)] bg-[var(--theme-bg-elevated)] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[#4F8CFF]/20 text-[#4F8CFF]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">AI Assistant</h3>
                    <p className="text-[10px] text-[#4F8CFF] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Powered by Gemini
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 \${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 \${
                      msg.sender === 'user' ? 'bg-[#4F8CFF]' : 'bg-white/10 dark:bg-white/10'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-[var(--theme-text-primary)]" />}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed \${
                      msg.sender === 'user' 
                        ? 'bg-[#4F8CFF] text-white rounded-tr-sm' 
                        : 'bg-black/5 dark:bg-white/5 text-[var(--theme-text-primary)] rounded-tl-sm border border-[var(--glass-border)]'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 flex-row">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Bot className="w-3 h-3 text-[var(--theme-text-primary)]" />
                    </div>
                    <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-[var(--theme-text-primary)] rounded-tl-sm border border-[var(--glass-border)] flex gap-1 items-center">
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4 }} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-secondary)]"></motion.span>
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-secondary)]"></motion.span>
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[var(--theme-text-secondary)]"></motion.span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-[var(--glass-border)] bg-[var(--theme-bg)]">
                <form onSubmit={handleSend} className="flex gap-2 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my experience..."
                    className="flex-1 bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-xl px-4 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[#4F8CFF] transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-lg bg-[#4F8CFF] text-white flex items-center justify-center hover:bg-[#3b6ecc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed absolute right-1 top-1"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
