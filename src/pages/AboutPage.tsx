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
import { AboutBackground } from '../components/AboutBackground';
import { SimpleHeader } from '@/components/ui/simple-header';

// Lazy load the Spline component for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const AboutPage = () => {
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-[#3A0F63]/40 overflow-hidden">
      <CustomCursor />
      <AboutBackground />
      
      <SimpleHeader dark />

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
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-[18vw] md:text-[17.5vw] font-[900] text-white leading-none tracking-tighter select-none whitespace-nowrap opacity-90"
              style={{
                textShadow: '0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2)'
              }}
            >
              ABOUT US
            </motion.h1>
          </motion.div>

          {/* 3D ROBOT (Layer 3) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-[105%] md:h-[115%] max-w-[1300px] flex items-center justify-center pointer-events-none md:pointer-events-auto transform translate-y-5 md:translate-y-20 scale-75 md:scale-100">
              <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
                <Spline scene="https://prod.spline.design/oC7n6seueKPBIcUA/scene.splinecode" />
              </Suspense>
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
      <footer className="py-8 text-center text-sm font-medium text-slate-500 border-t border-white/5 bg-black/50 backdrop-blur-xl relative z-20">
        <p>© {new Date().getFullYear()} Adify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
