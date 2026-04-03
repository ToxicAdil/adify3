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

// Lazy load the Spline component for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/#services' },
    { label: 'Clients', path: '/#clients' },
    { label: 'About', path: '/about' },
    { label: 'Reviews', path: '/#reviews' },
    { label: 'FAQs', path: '/#faqs' }
  ];

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-[#3A0F63]/40 overflow-hidden">
      <CustomCursor />
      <AboutBackground />
      
      {/* Dark Theme Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'} header`}>
        <div className="container-custom">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-12 py-3 shadow-2xl shadow-purple-900/20' : 'py-2'}`}>
            <Link to="/" className="flex items-center group cursor-pointer">
              <AdifyLogo height={34} className="transition-transform duration-300 group-hover:scale-[1.02] brightness-0 invert" />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className={`text-[13px] font-semibold transition-colors tracking-wide ${item.label === 'About' ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <MagneticButton>
                <button className="hidden sm:block text-[13px] font-bold text-slate-300 hover:text-white transition-colors">
                  Chat Now
                </button>
              </MagneticButton>
              <MagneticButton>
                <button className="hidden md:flex px-6 py-2.5 bg-[#3A0F63] text-white hover:bg-purple-900 border border-purple-500/30 rounded-full text-[13px] font-bold transition-all items-center gap-2 transform hover:scale-105 shadow-[0_0_20px_rgba(58,15,99,0.5)]">
                  Get Started <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </MagneticButton>
              
              <button 
                className="md:hidden p-2 text-slate-300" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* 1. HERO SECTION (CINEMATIC) */}
        <motion.section 
          style={{ scale: heroScale }}
          className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center transform-gpu origin-center"
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
              className="text-[22vw] md:text-[17.5vw] font-[900] text-white leading-none tracking-tighter select-none whitespace-nowrap opacity-90"
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
            <div className="w-full h-[105%] md:h-[115%] max-w-[1300px] flex items-center justify-center pointer-events-auto transform translate-y-10 md:translate-y-20 scale-100">
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
