import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Zap, TrendingUp, BarChart3, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdifyLogo from '../components/AdifyLogo';
import MagneticButton from '../components/MagneticButton';
import CustomCursor from '../components/CustomCursor';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', path: '/#services' },
    { label: 'Clients', path: '/#clients' },
    { label: 'About', path: '/about' },
    { label: 'Why Adify', path: '/#why-adify' },
    { label: 'Reviews', path: '/#reviews' },
    { label: 'FAQs', path: '/#faqs' }
  ];

  return (
    <div className="bg-[#faf5ff] min-h-screen text-slate-900 selection:bg-[#3A0F63]/20 relative">
      <CustomCursor />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'} header`}>
        <div className="container-custom">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'glass rounded-full px-12 py-3 shadow-sm' : 'py-2'}`}>
            <Link to="/" className="flex items-center group cursor-pointer">
              <AdifyLogo height={34} className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className={`text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide ${item.label === 'About' ? 'text-[#3A0F63]' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <MagneticButton>
                <button className="hidden sm:block text-[13px] font-bold text-slate-900 hover:opacity-70 transition-opacity">
                  Chat Now
                </button>
              </MagneticButton>
              <MagneticButton>
                <button className="hidden md:flex px-6 py-2.5 bg-[#3A0F63] text-white hover:bg-purple-900 rounded-full text-[13px] font-bold transition-all items-center gap-2 transform hover:scale-105 shadow-md shadow-[#3A0F63]/20">
                  Get Started <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </MagneticButton>
              
              <button 
                className="md:hidden p-2 text-slate-900" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 lg:pt-48 pb-20 overflow-hidden">
        
        {/* 1. HERO SECTION (FOUNDER INTRO) */}
        <section className="relative container-custom mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          >
            {/* Left side: Large circular image */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-10%] rounded-full border border-dashed border-[#3A0F63]/30"
              />
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }} 
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3A0F63] to-purple-800 blur-3xl"
              />
              <div className="relative w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(58,15,99,0.3)] border border-white/40">
                <img 
                  src="https://res.cloudinary.com/dtzo88csm/image/upload/v1774977463/IMG_6729_q6mmay.jpg" 
                  alt="Adil Ali - Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side: Founder text */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3A0F63] animate-pulse" />
                <span className="text-[12px] font-bold text-[#3A0F63] uppercase tracking-[0.2em] bg-[#3A0F63]/10 px-4 py-1.5 rounded-full">
                  FOUNDER
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight">
                Adil Ali
              </h1>
              <h2 className="text-2xl lg:text-3xl text-slate-500 font-semibold tracking-tight">
                Building systems, not just campaigns.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg mt-4 font-medium">
                Founder of Adify, focused on creating scalable, data-driven marketing systems that help brands grow beyond borders.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 2. STORY SECTION (WHY ADIFY EXISTS) */}
        <section className="relative w-full py-24 bg-white/50 border-y border-purple-100 backdrop-blur-sm mb-24">
          <div className="container-custom mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-10"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#3A0F63] tracking-tight">
                Why Adify?
              </h2>
              <div className="space-y-8 text-xl lg:text-2xl text-slate-600 leading-relaxed font-medium">
                <p>
                  Most agencies focus on clicks, impressions, and vanity metrics. We saw a bigger problem — businesses were growing traffic, but not revenue.
                </p>
                <p className="text-slate-900 font-bold">
                  Adify was built to change that.
                </p>
                <p>
                  We don't chase numbers. We build systems that generate consistent, scalable profit.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. MISSION & VISION */}
        <section className="container-custom mb-32 relative">
          <div className="flex flex-col md:flex-row items-stretch justify-center relative gap-16 md:gap-0">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 md:pr-16 lg:pr-24 text-center md:text-right"
            >
              <h3 className="text-[#3A0F63] text-lg font-bold uppercase tracking-[0.2em] mb-4">Mission</h3>
              <p className="text-2xl lg:text-4xl text-slate-900 font-bold leading-tight tracking-tight">
                To help brands scale profitably using data, AI, and performance marketing.
              </p>
            </motion.div>

            {/* Subtle dividing line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden md:block w-px bg-gradient-to-b from-transparent via-purple-300 to-transparent absolute left-1/2 top-0 bottom-0"
            />

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 md:pl-16 lg:pl-24 text-center md:text-left"
            >
              <h3 className="text-slate-400 text-lg font-bold uppercase tracking-[0.2em] mb-4">Vision</h3>
              <p className="text-xl lg:text-3xl text-slate-500 font-bold leading-tight tracking-tight">
                To become a global performance marketing partner for brands aiming to dominate their niche.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 4. WHAT MAKES US DIFFERENT */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-white/60 mb-24">
          <div className="container-custom">
             <div className="max-w-6xl mx-auto">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-center mb-16"
               >
                 <span className="text-[#3A0F63] text-sm font-bold uppercase tracking-[0.2em] mb-2 block">Differentiators</span>
                 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">What Makes Us Different</h2>
               </motion.div>

               <div className="space-y-12 divide-y divide-purple-100">
                 {[
                   { title: "Data-first decisions", icon: BarChart3, desc: "We eliminate guesswork. Every action is backed by rigorous empirical data and deep market analysis." },
                   { title: "AI-powered execution", icon: Zap, desc: "Leveraging cutting-edge automation to scale workflows, optimize bidding, and accelerate creative testing." },
                   { title: "Revenue-focused strategy", icon: Target, desc: "ROAS over reach. We align our KPIs directly with your bottom line to ensure compounding profitability." },
                   { title: "Transparent reporting", icon: TrendingUp, desc: "Real-time dashboards. Honest conversations. You always know exactly where your capital is going and returning." }
                 ].map((point, index) => (
                   <motion.div 
                     key={index}
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.6, delay: 0.1 * index }}
                     className="pt-12 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:pl-4 transition-all duration-300"
                   >
                     <div className="w-16 h-16 rounded-full bg-[#3A0F63]/10 flex items-center justify-center text-[#3A0F63] group-hover:bg-[#3A0F63] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(58,15,99,0.3)] transition-all duration-300 shrink-0">
                       <point.icon size={28} />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{point.title}</h3>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">{point.desc}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
          </div>
        </section>

        {/* 5. FOUNDER PHILOSOPHY */}
        <section className="container-custom mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#3A0F63] tracking-tight mb-12">Built Differently</h2>
            <blockquote className="text-2xl md:text-4xl text-slate-800 font-bold leading-tight tracking-tight italic">
              "We believe marketing should be measurable, scalable, and predictable. Every strategy we create is designed to generate real business outcomes — not just engagement."
            </blockquote>
            <p className="mt-8 text-xl text-slate-500 font-serif">— Adil Ali</p>
          </motion.div>
        </section>

        {/* 6. GLOBAL IMPACT SECTION */}
        <section className="py-24 bg-[#3A0F63] text-white relative overflow-hidden mb-24">
           {/* Simple gradient glow background inside dark section */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
           
           <div className="container-custom relative z-10">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center max-w-3xl mx-auto space-y-6"
             >
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                 Scaling Brands Across Borders
               </h2>
               <p className="text-xl md:text-2xl text-purple-200 font-medium leading-relaxed">
                 We work with ambitious businesses across India, US, Canada, Australia, UAE, and beyond.
               </p>
             </motion.div>
           </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="container-custom mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center space-y-10 py-12"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
              Let's Build Something That <span className="text-[#3A0F63]">Scales</span>
            </h2>
            <button className="relative overflow-hidden group px-10 py-5 bg-gradient-to-r from-[#3A0F63] to-purple-800 text-white rounded-full text-lg font-bold shadow-2xl shadow-[#3A0F63]/30 hover:shadow-[#3A0F63]/50 transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-2">
                Book a Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </motion.div>
        </section>

      </main>

      {/* Simple Footer just to complete the page structure */}
      <footer className="py-8 text-center text-sm font-medium text-slate-400 border-t border-purple-100">
        <p>© {new Date().getFullYear()} Adify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
