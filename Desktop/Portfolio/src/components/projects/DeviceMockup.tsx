import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Fingerprint, ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface DeviceMockupProps {
  type: 'freshbites' | 'voting';
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({ type }) => {
  if (type === 'freshbites') {
    return (
      <div className="relative w-full max-w-xl mx-auto perspective-1000 py-6">
        {/* Laptop Frame */}
        <motion.div
          whileHover={{ rotateY: -4, rotateX: 3, scale: 1.02 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          className="relative glass-card border-white/20 p-3 rounded-2xl bg-[#0a0a0c]/90 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
        >
          {/* Screen top header bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-t-xl border-b border-white/10 mb-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[10px] font-mono text-[#8A8A8E]">https://freshbites.app</span>
            <span className="w-6" />
          </div>

          {/* Screen Content UI */}
          <div className="p-4 bg-[#05070E] rounded-b-xl border border-white/5 space-y-4">
            {/* Hero banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/20 via-[#4F8CFF]/20 to-emerald-500/20 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">⚡ Ultra-Fast Checkout</span>
                <h4 className="text-sm font-bold text-white">Artisanal Organic Meals Delivered</h4>
              </div>
              <ShoppingBag className="w-6 h-6 text-orange-400" />
            </div>

            {/* Product Grid Mock */}
            <div className="grid grid-cols-3 gap-2">
              {['Avocado Grain Bowl', 'Truffle Pasta', 'Matcha Latte'].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-left space-y-1">
                  <div className="w-full h-12 rounded bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                  <p className="text-[10px] font-bold text-[#F5F5F7] truncate">{item}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#4F8CFF]">$14.99</span>
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">0.7s FCP</span>
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
        className="relative glass-card border-emerald-500/30 p-3 rounded-2xl bg-[#070b09]/95 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center justify-between px-3 py-2 bg-emerald-950/40 rounded-t-xl border-b border-emerald-500/20 mb-2">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono text-emerald-400">SECURE LEDGER AUTH</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-500/70">AES-256 GCM</span>
        </div>

        <div className="p-4 bg-[#030604] rounded-b-xl border border-emerald-500/20 space-y-4">
          {/* Animated Iris Scan Area */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center justify-center gap-2 text-center">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-emerald-400/50">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              />
              <Fingerprint className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              BIOMETRIC IDENTITY VERIFIED
            </span>
          </div>

          {/* Ciphertext scramble line */}
          <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/20 font-mono text-[10px] text-emerald-400/80 flex items-center justify-between">
            <span className="truncate">PAYLOAD: 8f9a2b7...cc901f4e</span>
            <span className="text-xs text-emerald-400 font-bold">✓ SIGNED</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
