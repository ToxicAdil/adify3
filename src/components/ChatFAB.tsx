import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChatFAB() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  if (location.pathname === '/assistant') return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[9999] flex flex-col items-center gap-0 pointer-events-auto group/btn">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden sm:flex flex-col items-center mb-1 group-hover/btn:translate-y-[-4px] transition-transform duration-300"
        >
          <div className="bg-[#1a1a1a] text-white px-2.5 py-1 rounded-full shadow-2xl border border-white/10 flex items-center justify-center">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Let's Talk</span>
          </div>
          {/* V-Shape Connector */}
          <svg width="10" height="6" viewBox="0 0 12 8" fill="none" className="-mt-0.5 opacity-80">
            <path 
              d="M1 1L6 6L11 1" 
              stroke="#1a1a1a" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </motion.div>
      </AnimatePresence>

      <div className="relative">
        <motion.button
          onClick={() => navigate('/assistant')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-[40px] h-[32px] sm:w-[50px] sm:h-[40px] bg-[#3A0F63] border-2 border-white/30 shadow-[0_10px_30px_rgba(58,15,99,0.4)] flex flex-col items-center justify-center relative overflow-hidden group-hover/btn:border-white/50 transition-all duration-300"
          style={{ borderRadius: '38%' }}
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center gap-1 relative z-10 pt-0.5">
            {/* Eyes */}
            <div className="flex gap-1.5 sm:gap-2">
              <motion.div 
                animate={{ 
                  scaleY: [1, 0.1, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 0.2, 
                  repeat: Infinity, 
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
                className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] origin-center" 
              />
              <motion.div 
                animate={{ 
                  scaleY: [1, 0.1, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ 
                  duration: 0.2, 
                  repeat: Infinity, 
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
                className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] origin-center" 
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

          {/* Background Pulse */}
          <motion.div
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-white"
          />
        </motion.button>
      </div>
    </div>
  );
}
