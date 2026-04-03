"use client";

import { motion } from "framer-motion";

export const AboutBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Base Gradient - Lighter than pitch black, matching brand purple/slate */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/80 to-slate-900" />

      {/* 2. Abstract Glowing Shapes & Corner Glows */}
      <div className="absolute inset-0">
        {/* Top Left Glow */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        
        {/* Bottom Right Glow */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />

        {/* Floating Shapes */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[20%] left-[15%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-purple-500/15 via-pink-500/15 to-transparent blur-3xl opacity-30"
        />

        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/15 to-transparent blur-3xl opacity-30"
        />
      </div>

      {/* 3. Large SVG Flow Shape (Bottom Center) */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] flex justify-center items-end overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto opacity-35 blur-[4px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#flow-gradient)"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* 4. Grid Overlay (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* 5. Soft Purple Overlay (Ambient Softness) */}
      <div className="absolute inset-0 bg-purple-500/5 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-[#8b5cf6]/[0.08]" />
    </div>
  );
};
