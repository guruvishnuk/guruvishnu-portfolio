import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCw, QrCode, ExternalLink, Mail, Github, Check, Sparkles, UserCheck } from 'lucide-react';

interface FlippableProfileCardProps {
  className?: string;
}

export const FlippableProfileCard: React.FC<FlippableProfileCardProps> = ({ className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const portfolioUrl = 'https://github.com/guruvishnuk';
  const qrCodeDataUri = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    portfolioUrl
  )}&color=050505&bgcolor=ffffff&margin=10`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('https://github.com/guruvishnuk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Top Controls: Flip Switch Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleFlip}
          className="glass-pill px-4 py-1.5 flex items-center gap-2 text-xs font-mono text-[#F5F5F7] hover:text-[#4F8CFF] border border-white/10 hover:border-[#4F8CFF]/50 transition-all shadow-lg cursor-pointer group"
          data-cursor="hover"
          title="Click to flip card"
        >
          <RotateCw className={`w-3.5 h-3.5 text-[#4F8CFF] transition-transform duration-500 ${isFlipped ? 'rotate-180' : 'group-hover:rotate-180'}`} />
          <span>{isFlipped ? 'Show Profile Photo' : 'Flip for QR Code'}</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </button>
      </div>

      {/* 3D Perspective Card Wrapper */}
      <div
        className="group relative w-72 h-96 [perspective:1000px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] shadow-2xl ${
            isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
          }`}
        >
          {/* ==================== FRONT SIDE: PROFILE PHOTO ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden] bg-[#0a0a0c]/90 border border-white/15 p-5 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(79,140,255,0.15)]">
            {/* Background Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#4F8CFF]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Badge */}
            <div className="flex items-center justify-between z-10 font-mono text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR HIRE
              </span>
              <span className="text-[#8A8A8E] flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-[#4F8CFF]" />
                FLIP
              </span>
            </div>

            {/* Profile Photo Circle Container */}
            <div className="relative my-auto flex justify-center z-10">
              <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#4F8CFF] via-purple-500 to-emerald-400 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[#0a0a0c] bg-black">
                  <img
                    src="/profile-photo.jpg"
                    alt="Guruvishnu Kajagar"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>

            {/* Footer Information */}
            <div className="text-center z-10 space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
                <span>Guruvishnu Kajagar</span>
                <UserCheck className="w-4 h-4 text-[#4F8CFF]" />
              </h3>
              <p className="text-xs font-mono text-[#8A8A8E]">Frontend Engineer · React / TS</p>
              <p className="text-[10px] font-mono text-[#4F8CFF]/80 pt-1">
                Hover or tap switch to scan QR
              </p>
            </div>
          </div>

          {/* ==================== BACK SIDE: QR CODE & QUICK CONNECT ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0c0c10]/95 border border-[#4F8CFF]/40 p-5 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(79,140,255,0.2)] text-center">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#4F8CFF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Back Header */}
            <div className="flex items-center justify-between z-10 font-mono text-[11px]">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#4F8CFF]" />
                SCAN TO CONNECT
              </span>
              <span className="text-xs text-[#8A8A8E]">@guruvishnuk</span>
            </div>

            {/* QR Code Container */}
            <div className="my-auto flex flex-col items-center justify-center z-10 space-y-3">
              <div className="p-3 bg-white rounded-2xl shadow-2xl border-2 border-[#4F8CFF]/30 transition-transform duration-300 hover:scale-105">
                <img
                  src={qrCodeDataUri}
                  alt="QR Code to Guruvishnu Portfolio & GitHub"
                  className="w-36 h-36 rounded-lg object-contain"
                />
              </div>

              <p className="text-[11px] text-[#8A8A8E] font-mono max-w-[200px]">
                Scan with mobile camera to view GitHub profile & live apps
              </p>
            </div>

            {/* Action Buttons */}
            <div className="z-10 space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5 text-[#4F8CFF]" />
                    <span>Copy GitHub Link</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href="https://github.com/guruvishnuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#4F8CFF] text-[#8A8A8E] hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:guruvishnu1927@gmail.com"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#4F8CFF] text-[#8A8A8E] hover:text-white transition-colors"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
