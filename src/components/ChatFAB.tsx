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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[9999] flex flex-col items-end gap-2 sm:gap-3 pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="hidden sm:flex bg-white text-slate-800 px-4 py-2 rounded-2xl shadow-xl items-center gap-2 border border-slate-200 font-bold text-sm"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          Let's Talk
        </motion.div>
      </AnimatePresence>

      <div className="relative group/btn">
        <motion.button
          onClick={() => navigate('/assistant')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#3A0F63] to-[#2D0B4D] border border-white/20 shadow-[0_20px_40px_rgba(58,15,99,0.3)] flex items-center justify-center relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
          
          <Bot className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white relative z-10 drop-shadow-lg" />
          
          {/* Animated Glow Halo */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-purple-400/20 rounded-full blur-md"
          />
        </motion.button>
      </div>
    </div>
  );
}
