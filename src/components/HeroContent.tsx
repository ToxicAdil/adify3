import React, { Suspense } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

interface HeroContentProps {
  heroScale: ReturnType<typeof import('motion/react').useTransform>;
  heroY: ReturnType<typeof import('motion/react').useTransform>;
}

export function HeroContent({ heroScale, heroY }: HeroContentProps) {
  return (
    <motion.div
      style={{ scale: heroScale, y: heroY }}
      className="flex flex-col items-center justify-center w-full h-full relative z-10"
    >
      {/* Hero Content Centered */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-[900px] mx-auto">
        {/* Main Headline Wrapper */}
        <div className="text-center w-full flex flex-col items-center">
          <motion.span
            className="block text-slate-600 opacity-65 font-normal tracking-tight mb-[12px] text-[clamp(1.6rem,3.5vw,2.6rem)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            Scale Smarter.
          </motion.span>

          <div className="relative w-full flex flex-col items-center">
            <motion.h1
              className="font-[800] tracking-tighter text-gradient relative z-10 md:whitespace-nowrap text-[clamp(3rem,7vw,6rem)] leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            >
              Grow Your Brand Faster
            </motion.h1>

            {/* Animated Underline */}
            <motion.div
              className="h-[1.5px] w-full max-w-[80%] md:max-w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent -mt-[8px] mb-[32px]"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.4, scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
              style={{ transformOrigin: 'center' }}
            />
          </div>
        </div>

        {/* Subtext */}
        <motion.p
          className="text-slate-500 font-normal mx-auto mb-[48px] w-full px-5 md:px-0 max-w-[580px] text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.75]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          We build high-performing marketing systems that drive{' '}
          <span className="text-primary font-bold">real revenue</span>, not just clicks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-[14px] md:gap-[20px] flex-wrap mt-0 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          <MagneticButton>
            <motion.button
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              data-cursor-text="Book"
              className="w-full md:w-auto bg-[#3A0F63] text-white px-[36px] py-[16px] rounded-[50px] font-semibold text-[clamp(0.85rem,1.2vw,1rem)] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              Book a Strategy Call <ArrowRight className="w-5 h-5" />
            </motion.button>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="/insights"
              whileHover={{ x: 4 }}
              data-cursor-text="Read"
              className="w-full md:w-auto px-[32px] py-[16px] rounded-[50px] font-semibold text-[clamp(0.85rem,1.2vw,1rem)] text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-primary" /> View Insights
            </motion.a>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
