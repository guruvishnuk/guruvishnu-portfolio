import React, { useRef, useEffect } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Hero3DScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { normalizedX, normalizedY } = useMousePosition();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle dust particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let reactAngle = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Target mouse tilt lerp
      const targetTiltX = prefersReduced ? 0 : normalizedY * 0.1;
      const targetTiltY = prefersReduced ? 0 : normalizedX * 0.12;
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltY += (targetTiltY - currentTiltY) * 0.05;

      const centerX = width / 2 + currentTiltY * 60;
      const centerY = height / 2 + currentTiltX * 60;

      // Draw background glow bloom
      const bgGlow = ctx.createRadialGradient(
        centerX,
        centerY - 20,
        20,
        centerX,
        centerY - 20,
        220
      );
      bgGlow.addColorStop(0, 'rgba(79, 140, 255, 0.25)');
      bgGlow.addColorStop(0.5, 'rgba(79, 140, 255, 0.08)');
      bgGlow.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 20, 220, 0, Math.PI * 2);
      ctx.fill();

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(79, 140, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x + currentTiltY * 20, p.y + currentTiltX * 20, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render 3D Laptop Perspective Desk
      const laptopW = Math.min(width * 0.65, 340);
      const laptopH = laptopW * 0.62;
      const laptopX = centerX - laptopW / 2;
      const laptopY = centerY - laptopH / 2 + 30;

      // Laptop Base
      ctx.fillStyle = '#1A1A1E';
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(laptopX - 30, laptopY + laptopH - 10, laptopW + 60, 16, 8);
      ctx.fill();
      ctx.stroke();

      // Laptop Notch
      ctx.fillStyle = '#2A2A30';
      ctx.beginPath();
      ctx.roundRect(centerX - 25, laptopY + laptopH - 10, 50, 6, 3);
      ctx.fill();

      // Laptop Screen Shell
      ctx.fillStyle = '#0A0A0C';
      ctx.strokeStyle = 'rgba(79, 140, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(laptopX, laptopY, laptopW, laptopH - 10, 12);
      ctx.fill();
      ctx.stroke();

      // Laptop Inner Display Screen
      const screenMargin = 12;
      const screenX = laptopX + screenMargin;
      const screenY = laptopY + screenMargin;
      const screenW = laptopW - screenMargin * 2;
      const screenH = laptopH - 10 - screenMargin * 2;

      ctx.fillStyle = '#05070E';
      ctx.beginPath();
      ctx.roundRect(screenX, screenY, screenW, screenH, 8);
      ctx.fill();

      // Screen glowing border gradient
      ctx.strokeStyle = 'rgba(79, 140, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Spinning Wireframe React Logo inside Laptop Screen
      const reactCenterX = screenX + screenW / 2;
      const reactCenterY = screenY + screenH / 2;
      const reactRadius = Math.min(screenW, screenH) * 0.28;

      reactAngle += prefersReduced ? 0.002 : 0.015;

      ctx.save();
      ctx.translate(reactCenterX, reactCenterY);

      // Central nucleus dot
      ctx.fillStyle = '#4F8CFF';
      ctx.shadowColor = '#4F8CFF';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();

      // 3 Elliptical Orbit Rings rotated
      ctx.strokeStyle = '#4F8CFF';
      ctx.lineWidth = 2;

      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3 + reactAngle);
        ctx.beginPath();
        ctx.ellipse(0, 0, reactRadius * 1.5, reactRadius * 0.55, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // Floating VS Code / Tech Card Left
      const card1X = laptopX - 50 + currentTiltY * 15;
      const card1Y = laptopY - 20 + Math.sin(reactAngle * 2) * 8;
      ctx.fillStyle = 'rgba(10, 10, 12, 0.85)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(card1X, card1Y, 110, 50, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#8A8A8E';
      ctx.font = '10px "Geist Mono", monospace';
      ctx.fillText('<Code />', card1X + 14, card1Y + 22);
      ctx.fillStyle = '#4F8CFF';
      ctx.fillText('React 19', card1X + 14, card1Y + 38);

      // Floating Performance Card Right
      const card2X = laptopX + laptopW - 40 + currentTiltY * 15;
      const card2Y = laptopY + 40 + Math.cos(reactAngle * 2) * 8;
      ctx.fillStyle = 'rgba(10, 10, 12, 0.85)';
      ctx.strokeStyle = 'rgba(79, 140, 255, 0.3)';
      ctx.beginPath();
      ctx.roundRect(card2X, card2Y, 120, 54, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 11px "Geist", sans-serif';
      ctx.fillText('⚡ 98/100', card2X + 14, card2Y + 24);
      ctx.fillStyle = '#8A8A8E';
      ctx.font = '10px "Geist Mono", monospace';
      ctx.fillText('Lighthouse Score', card2X + 14, card2Y + 40);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [normalizedX, normalizedY, prefersReduced]);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
};
