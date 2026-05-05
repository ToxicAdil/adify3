import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * ChatFAB — Pure CSS version (no framer-motion).
 * This component is eagerly loaded in main.tsx, so removing framer-motion
 * from it prevents the vendor-motion chunk from being pulled into the
 * critical rendering path.
 */
export default function ChatFAB() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (location.pathname === '/assistant') return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[9999] flex flex-col items-center gap-0 pointer-events-auto group/btn">
      {/* "Let's Talk" label — CSS only */}
      <div
        className="hidden sm:flex flex-col items-center mb-1 group-hover/btn:translate-y-[-4px] transition-transform duration-300"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.9)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE] text-[#1E1B4B] px-2.5 py-1 rounded-full shadow-xl border border-[#C4B5FD]/50 flex items-center justify-center">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Let's Talk</span>
        </div>
        {/* V-Shape Connector */}
        <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className="-mt-0.5 opacity-60">
          <path 
            d="M1 1L6 6L11 1" 
            stroke="#6D28D9" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      <div className="relative">
        <button
          onClick={() => navigate('/assistant')}
          className="w-[40px] h-[32px] sm:w-[50px] sm:h-[40px] bg-[#3A0F63] border-2 border-white/30 shadow-[0_10px_30px_rgba(58,15,99,0.4)] flex flex-col items-center justify-center relative overflow-hidden group-hover/btn:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ borderRadius: '38%' }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center gap-1 relative z-10 pt-0.5">
            {/* Eyes — CSS blink animation */}
            <div className="flex gap-1.5 sm:gap-2">
              <div 
                className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] origin-center"
                style={{ animation: 'fabBlink 4.2s ease-in-out infinite' }}
              />
              <div 
                className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] origin-center"
                style={{ animation: 'fabBlink 4.2s ease-in-out infinite' }}
              />
            </div>
            {/* Smile */}
            <svg 
              width="18" 
              height="5" 
              viewBox="0 0 20 6" 
              fill="none" 
              className="sm:w-[22px] sm:h-[6px]"
            >
              <path 
                d="M4 1.5C4 1.5 7.5 4.5 10 4.5C12.5 4.5 16 1.5 16 1.5" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                className="drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
              />
            </svg>
          </div>

          {/* Background Pulse — CSS animation */}
          <div
            className="absolute inset-0 bg-white"
            style={{ animation: 'fabPulse 3s ease-in-out infinite' }}
          />
        </button>
      </div>
    </div>
  );
}
