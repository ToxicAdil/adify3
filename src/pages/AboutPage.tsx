import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Zap, TrendingUp, BarChart3, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdifyLogo from '../components/AdifyLogo';
import MagneticButton from '../components/MagneticButton';
import CustomCursor from '../components/CustomCursor';

// Lazy load the Spline component for performance
const Spline = lazy(() => import('@splinetool/react-spline'));

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    <div className="bg-[#0B0B0F] min-h-screen text-slate-100 selection:bg-[#3A0F63]/40 relative">
      <CustomCursor />
      
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
      <main className="overflow-hidden">
        
        {/* 1. HERO SECTION (PURE ANIMATION 100VH) */}
        <section className="relative w-full h-screen bg-[#0a0a0f] overflow-hidden">
          {/* Spline Animation */}
          <div className="absolute inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full bg-[#0a0a0f] animate-pulse" />}>
              <Spline scene="https://prod.spline.design/oC7n6seueKPBIcUA/scene.splinecode" />
            </Suspense>
          </div>
          
          {/* Seamless Dark Gradient Overlay explicitly from Prompt */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.0) 30%, rgba(10,10,15,0.0) 70%, rgba(10,10,15,0.9) 100%)'
            }}
          />
        </section>

        {/* 2. FOUNDER INTRO (SCROLL REVEAL) */}
        <section className="relative container-custom mt-20 mb-32 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 p-8 lg:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(58,15,99,0.15)]"
          >
            {/* Left side: Founder Image */}
            <div className="w-full lg:w-5/12 flex justify-center relative">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-10%] rounded-full border border-dashed border-purple-500/20"
              />
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.3, 0.1] }} 
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3A0F63] to-purple-800 blur-[80px]"
              />
              <div className="relative w-64 h-64 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(58,15,99,0.4)] border border-purple-500/30">
                <img 
                  src="https://res.cloudinary.com/dtzo88csm/image/upload/v1774977463/IMG_6729_q6mmay.jpg" 
                  alt="Adil Ali - Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side: Founder text */}
            <div className="w-full lg:w-7/12 space-y-6">
              <div className="inline-flex items-center gap-3 relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse relative z-10 shadow-[0_0_10px_#c084fc]" />
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-[0.25em] relative z-10 border border-purple-500/30 bg-purple-900/40 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(58,15,99,0.3)]">
                  FOUNDER
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                Adil Ali
              </h1>
              <h2 className="text-2xl lg:text-3xl text-purple-200 font-semibold tracking-tight">
                Building systems, not just campaigns.
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl mt-4 font-medium">
                Founder of Adify, focused on creating scalable, data-driven marketing systems that help brands grow beyond borders.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. STORY SECTION (WHY ADIFY EXISTS) */}
        <section className="relative w-full py-32 bg-white/[0.01] border-y border-white/5 backdrop-blur-2xl mb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-900/10 blur-[150px] pointer-events-none rounded-[100%]" />
          
          <div className="container-custom mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-12"
            >
              <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
                Why Adify?
              </h2>
              <div className="space-y-8 text-xl lg:text-2xl text-slate-300 leading-relaxed font-medium">
                <p>
                  Most agencies focus on clicks, impressions, and vanity metrics. We saw a bigger problem — businesses were growing traffic, but not revenue.
                </p>
                <p className="text-white text-3xl font-bold">
                  Adify was built to change that.
                </p>
                <p>
                  We don't chase numbers. We build systems that generate consistent, scalable profit.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. MISSION & VISION */}
        <section className="container-custom mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3A0F63]/10 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="flex flex-col md:flex-row items-stretch justify-center relative gap-16 md:gap-0 z-10">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 md:pr-16 lg:pr-24 text-center md:text-right"
            >
              <h3 className="text-purple-400 text-sm font-bold uppercase tracking-[0.25em] mb-6">Mission</h3>
              <p className="text-2xl lg:text-4xl text-white font-bold leading-tight tracking-tight drop-shadow-lg">
                To help brands scale profitably using data, AI, and performance marketing.
              </p>
            </motion.div>

            {/* Glowing dividing line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent absolute left-1/2 top-0 bottom-0 shadow-[0_0_15px_#a855f7]"
            />

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 md:pl-16 lg:pl-24 text-center md:text-left"
            >
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-[0.25em] mb-6">Vision</h3>
              <p className="text-xl lg:text-3xl text-slate-300 font-bold leading-tight tracking-tight">
                To become a global performance marketing partner for brands aiming to dominate their niche.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 5. WHAT MAKES US DIFFERENT */}
        <section className="py-24 relative overflow-hidden mb-24">
          <div className="container-custom relative z-10">
             <div className="max-w-6xl mx-auto">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-center mb-20"
               >
                 <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-4 block">Differentiators</span>
                 <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">What Makes Us Different</h2>
               </motion.div>

               <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                 {[
                   { title: "Data-first decisions", icon: BarChart3, desc: "We eliminate guesswork. Every action is backed by rigorous empirical data and deep market analysis." },
                   { title: "AI-powered execution", icon: Zap, desc: "Leveraging cutting-edge automation to scale workflows, optimize bidding, and accelerate creative testing." },
                   { title: "Revenue-focused strategy", icon: Target, desc: "ROAS over reach. We align our KPIs directly with your bottom line to ensure compounding profitability." },
                   { title: "Transparent reporting", icon: TrendingUp, desc: "Real-time dashboards. Honest conversations. You always know exactly where your capital is going and returning." }
                 ].map((point, index) => (
                   <motion.div 
                     key={index}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6, delay: 0.1 * index }}
                     className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-purple-500/30 backdrop-blur-md group hover:bg-[#3A0F63]/10 transition-all duration-500 shadow-2xl shadow-black/50 overflow-hidden relative"
                   >
                     {/* Hover glow */}
                     <div className="absolute top-0 right-0 p-32 bg-purple-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                     
                     <div className="w-14 h-14 rounded-2xl bg-[#3A0F63]/40 border border-[#3A0F63] flex items-center justify-center text-purple-400 group-hover:bg-[#3A0F63] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(58,15,99,0.8)] transition-all duration-300 mb-6 relative z-10">
                       <point.icon size={24} />
                     </div>
                     <h3 className="text-2xl font-bold text-white tracking-tight mb-3 relative z-10">{point.title}</h3>
                     <p className="text-slate-400 font-medium text-lg leading-relaxed relative z-10">{point.desc}</p>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* 6. FOUNDER PHILOSOPHY */}
        <section className="container-custom mb-40 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#3A0F63] tracking-tight mb-16 drop-shadow-xl">
              Built Differently
            </h2>
            <blockquote className="text-2xl md:text-5xl text-white font-bold leading-tight tracking-tight">
              "We believe marketing should be measurable, scalable, and predictable. Every strategy we create is designed to generate real business outcomes — not just engagement."
            </blockquote>
            <p className="mt-12 text-2xl text-purple-400 font-serif opacity-80">— Adil Ali</p>
          </motion.div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="container-custom mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 lg:p-20 rounded-[3rem] bg-gradient-to-b from-[#3A0F63]/40 to-black border border-purple-500/20 backdrop-blur-3xl overflow-hidden flex flex-col items-center justify-center text-center space-y-10 shadow-[0_0_100px_rgba(58,15,99,0.2)]"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-500/20 blur-[120px] rounded-[100%] pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight relative z-10 drop-shadow-2xl">
              Let's Build Something That <span className="text-purple-400">Scales</span>
            </h2>
            <button className="relative z-10 overflow-hidden group px-12 py-6 bg-white text-[#3A0F63] rounded-full text-xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-3">
                Book a Strategy Call <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm font-medium text-slate-500 border-t border-white/5 bg-black/50 backdrop-blur-xl relative z-20">
        <p>© {new Date().getFullYear()} Adify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
