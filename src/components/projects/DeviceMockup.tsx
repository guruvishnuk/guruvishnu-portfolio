import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Fingerprint, ShoppingBag, Flame, Sparkles, Code2, CheckCircle2 } from 'lucide-react';

interface DeviceMockupProps {
  type: 'freshbites' | 'voting' | 'codelab';
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ type }) => {
  if (type === 'codelab') {
    return (
      <div className="relative w-full max-w-xl mx-auto perspective-1000 py-6">
        <motion.div
          whileHover={{ rotateY: -3, rotateX: 2, scale: 1.02 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          className="relative glass-card border-blue-500/30 p-3 rounded-2xl bg-white/95 dark:bg-[#080d1a]/95 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-blue-50 dark:bg-blue-950/40 rounded-t-xl border-b border-blue-500/20 mb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8CFF]" />
              <span className="text-[10px] font-mono font-medium text-blue-700 dark:text-[#4F8CFF]">codelab.dev/architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Vite Active</span>
            </div>
          </div>

          {/* Editor Body */}
          <div className="p-4 bg-slate-950 dark:bg-[#040814] rounded-b-xl border border-blue-500/20 space-y-3 font-mono text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] text-slate-400">
              <span className="text-blue-400 font-semibold">PlatformPhilosophy.tsx</span>
              <span>TypeScript 5.8 • React 19</span>
            </div>
            <div className="space-y-1 text-[11px] leading-relaxed">
              <p className="text-purple-400"><span className="text-blue-400">export</span> <span className="text-purple-400">const</span> CodeLabCore = () =&gt; &#123;</p>
              <p className="text-slate-400 pl-3">// Interactive code learning engine</p>
              <p className="text-blue-300 pl-3">architecture: <span className="text-emerald-300">'Modular Micro-Frontends'</span>,</p>
              <p className="text-blue-300 pl-3">execution: <span className="text-emerald-300">'Client-Side WebAssembly'</span></p>
              <p className="text-purple-400">&#125;;</p>
              <p className="text-emerald-400 flex items-center gap-1.5 pt-1 text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Live Interactive Sandbox ready</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  if (type === 'freshbites') {
    return (
      <div className="relative w-full max-w-xl mx-auto perspective-1000 py-6">
        {/* Laptop Frame */}
        <motion.div
          whileHover={{ rotateY: -4, rotateX: 3, scale: 1.02 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          className="relative glass-card border-slate-200 dark:border-white/20 p-3 rounded-2xl bg-white dark:bg-[#0a0a0c]/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
        >
          {/* Screen top header bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-white/5 rounded-t-xl border-b border-slate-200 dark:border-white/10 mb-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-[#8A8A8E]">https://freshbites.app</span>
            <span className="w-6" />
          </div>

          {/* Screen Content UI */}
          <div className="p-4 bg-slate-50 dark:bg-[#05070E] rounded-b-xl border border-slate-200 dark:border-white/5 space-y-4">
            {/* Hero banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/15 via-[#4F8CFF]/15 to-emerald-500/15 border border-orange-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400 font-bold uppercase">⚡ Ultra-Fast Checkout</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Artisanal Organic Meals Delivered</h4>
              </div>
              <ShoppingBag className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>

            {/* Product Grid Mock */}
            <div className="grid grid-cols-3 gap-2">
              {['Avocado Grain Bowl', 'Truffle Pasta', 'Matcha Latte'].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none text-left space-y-1">
                  <div className="w-full h-12 rounded bg-orange-50 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 dark:text-[#F5F5F7] truncate">{item}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#0066CC] dark:text-[#4F8CFF] font-semibold">$14.99</span>
                    <span className="text-[8px] bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-1 py-0.5 rounded font-mono font-medium">0.7s FCP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Voting Mockup with Iris scanner & Ledger flow
  return (
    <div className="relative w-full max-w-xl mx-auto perspective-1000 py-6">
      <motion.div
        whileHover={{ rotateY: 4, rotateX: -3, scale: 1.02 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className="relative glass-card border-emerald-500/30 p-3 rounded-2xl bg-white/95 dark:bg-[#070b09]/95 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-t-xl border-b border-emerald-500/20 mb-2">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400">SECURE LEDGER AUTH</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500/70">AES-256 GCM</span>
        </div>

        <div className="p-4 bg-emerald-50/40 dark:bg-[#030604] rounded-b-xl border border-emerald-500/20 space-y-4">
          {/* Animated Iris Scan Area */}
          <div className="p-4 rounded-xl bg-white dark:bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center gap-2 text-center shadow-sm dark:shadow-none">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-emerald-500/50">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500 dark:border-emerald-400"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <Fingerprint className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
              BIOMETRIC IDENTITY VERIFIED
            </span>
          </div>

          {/* Ciphertext scramble line */}
          <div className="p-2.5 rounded-lg bg-emerald-100/50 dark:bg-black/60 border border-emerald-500/20 font-mono text-[10px] text-emerald-800 dark:text-emerald-400/80 flex items-center justify-between">
            <span className="truncate">PAYLOAD: 8f9a2b7...cc901f4e</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">✓ SIGNED</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
