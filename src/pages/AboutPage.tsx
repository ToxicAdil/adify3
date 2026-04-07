import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Zap, TrendingUp, BarChart3, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdifyLogo from '../components/AdifyLogo';
import MagneticButton from '../components/MagneticButton';
import CustomCursor from '../components/CustomCursor';
import AboutProcess from '../components/AboutProcess';
import AboutTeam from '../components/AboutTeam';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import ImpactStatement from '../components/ImpactStatement';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';

const AboutPage = () => {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white relative">
      <CustomCursor />
      
      <SimpleHeader />

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* 1. HERO SECTION (CINEMATIC) */}
        <motion.section 
          style={{ scale: heroScale }}
          className="relative w-full h-[60vh] md:h-screen bg-transparent overflow-hidden flex items-center justify-center transform-gpu origin-center"
        >
          {/* BIG TEXT (Layer 2) */}
          <motion.div 
            style={{ opacity: textOpacity }}
            className="absolute z-10 w-full flex justify-center items-center pointer-events-none"
          >
            <div className="relative inline-block">
              {/* Blur Glow duplicate layer */}
              <motion.span
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 0.6, filter: "blur(30px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 text-[18vw] md:text-[17.5vw] font-[900] text-gradient leading-none tracking-tighter select-none whitespace-nowrap pointer-events-none"
                aria-hidden="true"
              >
                ABOUT US
              </motion.span>
              
              {/* Main clear gradient layer */}
              <motion.h1 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-[18vw] md:text-[17.5vw] font-[900] text-gradient leading-none tracking-tighter select-none whitespace-nowrap relative z-10 opacity-90"
              >
                ABOUT US
              </motion.h1>
            </div>
          </motion.div>

        </motion.section>

        {/* 1.5 IMPACT STATEMENT */}
        <ImpactStatement />

        {/* 2. OUR TEAM SECTION */}
        <AboutTeam />

        {/* 3. OUR PROCESS */}
        <AboutProcess />

        {/* 4. WHO WE WORK WITH SECTION */}
        <WhoWeWorkWith />
      </main>

      {/* Footer */}
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AboutPage;
