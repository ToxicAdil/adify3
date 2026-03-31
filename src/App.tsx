import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Target, 
  Zap, 
  Users, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  X,
  Minus,
  Check,
  Sparkles,
  TrendingUp,
  Globe,
  Star,
  Play
} from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import MagneticButton from './components/MagneticButton';
import AdifyLogo from './components/AdifyLogo';
import { InteractiveServices } from './components/InteractiveServices';
import AboutAdify from './components/AboutAdify';
import { GeometricBackground } from '@/components/ui/shape-landing-hero';
import Spline from '@splinetool/react-spline';

import { CircularTestimonials } from './components/ui/circular-testimonials';
import { InteractiveGlobe } from './components/ui/interactive-globe';
import { ParticleHero } from './components/ui/particle-hero';
import { LogoCloud } from './components/ui/logo-cloud-4';

const services = [
  "Web Development",
  "AI Automation",
  "Social Media Marketing",
  "Performance Ads",
  "Lead Generation",
  "Strategic Marketing",
  "SEO Optimization",
  "Data Analytics",
];

const globeMarkers = [
  { lat: 28.61, lng: 77.21, label: "India" },
  { lat: 37.77, lng: -122.41, label: "USA" },
  { lat: 43.65, lng: -79.38, label: "Canada" },
  { lat: -33.86, lng: 151.20, label: "Australia" },
  { lat: -26.20, lng: 28.04, label: "South Africa" },
  { lat: 25.20, lng: 55.27, label: "Dubai" },
];

const globeConnections = [
  { from: [28.61, 77.21] as [number, number], to: [37.77, -122.41] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [43.65, -79.38] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [-33.86, 151.20] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [-26.20, 28.04] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [25.20, 55.27] as [number, number] },
];

const testimonialData = [
  {
    quote: "Adify completely transformed our ROAS. We went from 2x to 5.5x in just three months. Their AI tools are a game changer!",
    name: "Sarah Chen",
    designation: "CEO, LuxeDecor",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "The attention to detail in their creative testing is impressive. We've seen significant improvements in our application's load times and overall user experience.",
    name: "Michael Rodriguez",
    designation: "Founder, TechStart",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "What sets Adify apart is its flexibility. We've been able to maintain consistency across our applications while still customizing components to match our brand identity.",
    name: "Emily Thompson",
    designation: "Marketing Director, GlowUp",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "The performance optimization in these components is outstanding. We've seen significant improvements in our application's load times and overall user experience.",
    name: "James Wilson",
    designation: "Performance Lead, SwiftScale",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "The community support and regular updates make this component library a reliable choice for our projects. It's clear that the team behind it is committed to quality.",
    name: "Sophia Martinez",
    designation: "E-commerce Manager, UrbanStyle",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check if URL has hash on mount and scroll smoothly
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Clients', id: 'clients' },
    { label: 'About', id: 'about', path: '/about' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQs', id: 'faqs' }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'} header`}>
      <div className="container-custom">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'glass rounded-full px-12 py-3 shadow-sm' : 'py-2'}`}>
          <div className="flex items-center group cursor-pointer">
            <AdifyLogo height={34} className="transition-transform duration-300 group-hover:scale-[1.02]" />
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              item.path ? (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
              ) : (
                <a 
                  key={item.label} 
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  className="text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-6">
            <MagneticButton>
              <button 
                data-cursor-text="Chat"
                className="hidden sm:block text-[13px] font-bold text-slate-900 hover:opacity-70 transition-opacity"
              >
                Chat Now
              </button>
            </MagneticButton>
            <MagneticButton>
              <button 
                data-cursor-text="Join"
                className="hidden sm:block bg-slate-900 text-white px-6 py-2.5 rounded-full text-[13px] font-bold btn-premium primary-button"
              >
                Get Started
              </button>
            </MagneticButton>
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 md:hidden"
          >
            <div className="glass rounded-2xl p-6 flex flex-col gap-4 shadow-2xl">
              {navItems.map((item) => (
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-2xl font-bold text-slate-900 border-b border-purple-100 pb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={`#${item.id}`}
                    className="text-2xl font-bold text-slate-900 border-b border-purple-100 pb-4"
                    onClick={(e) => handleScrollTo(e, item.id)}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <hr className="border-slate-200" />
              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">
                Chat Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Main App ---

export default function App() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <CustomCursor />
      <Navbar />

      {/* Hero Section */}
      <header id="home" className="hero relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GeometricBackground />
        </div>
        <div className="container-custom flex flex-col lg:flex-row items-center justify-start gap-12 lg:gap-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-left relative z-10"
          >
          <div className="ai-badge bg-white/40 border border-white/60 font-bold text-slate-500 uppercase tracking-[0.15em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> AI-First Marketing
          </div>
          
          <h1>
            Scale Smarter. <br />
            <span className="shimmer-text">Grow Faster.</span>
          </h1>

          <p>
            We build high-performing marketing systems that drive real revenue, not just clicks.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 justify-start">
            <MagneticButton>
              <button 
                data-cursor-text="Book Now"
                className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-base btn-premium flex items-center justify-center gap-3 primary-button"
              >
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </button>
            </MagneticButton>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider h-[60px]">
              <CheckCircle2 className="text-emerald-500 w-4 h-4" /> Free Audit
            </div>
          </div>

          <div className="pt-12 flex flex-wrap items-start gap-x-12 gap-y-6 justify-start">
            {[
              { label: 'Experience', val: '5+ Years' },
              { label: 'Clients', val: '500+' },
              { label: 'Ad Spend', val: '₹50Cr+' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{stat.val}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

          <div className="hero-right relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full cursor-pointer relative z-10 flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
              data-cursor-text="Explore"
            >
              <Spline 
                scene="https://prod.spline.design/5GILnYNHh7m1Zme9/scene.splinecode" 
                style={{ background: 'transparent', width: '100%', height: '100%' }}
              />
            </motion.div>
            
            {/* AGGRESSIVE BRANDING MASK - Primary Glow */}
            <div className="absolute -bottom-2 -right-4 w-[260px] h-[80px] bg-primary/20 blur-3xl z-[9999] pointer-events-none opacity-95" />

            {/* Background Glow - Seamless blend */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/5 blur-[120px] -z-10 rounded-full opacity-40" />
          </div>
        </div>

        {/* Curved Divider */}
        <motion.div 
          style={{ y }}
          className="absolute bottom-0 left-0 w-full leading-[0] z-20 pointer-events-none"
        >
          <svg 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[60px] md:h-[100px] lg:h-[120px]"
          >
            <path 
              fill="#f5f0ff" 
              d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"
            ></path>
          </svg>
        </motion.div>
      </header>

      {/* Clients Section (Animated Logo Cloud) */}
      <section className="py-8 border-b border-white relative z-10">
        <div className="container-custom">
          <div className="w-full">
            <h2 className="mb-5 text-center">
              <span className="block font-medium text-2xl text-slate-500">
                Our Expertise
              </span>
              <span className="font-black text-2xl text-primary tracking-tight md:text-3xl">
                End-to-End Solutions
              </span>
            </h2>
            <LogoCloud services={services} />
          </div>
        </div>
      </section>

      <section id="services">
        <InteractiveServices />
      </section>

      {/* Strategic Marketing Detail Section */}
      <section id="strategic-marketing" className="py-8 relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Media Container - Video Ready Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5"
              >
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774899653/marketing_video_yes6gn.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                />
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      ADS • ADS • ADS
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">Strategic Marketing</span>
                    </h2>
                    <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      Ready to scale your brand with data-driven advertising? We craft high-performing campaigns across platforms that maximize ROI and drive consistent growth.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Facebook Ads', 'Google Ads'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button 
                        className="px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Marketing Detail Section Shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Social Media Detail Section */}
      <section className="py-8 relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Text Content - Left Side */}
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 order-2 lg:order-1 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      SOCIAL • SOCIAL • SOCIAL
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">Social Media</span>
                    </h2>
                    <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      Build a strong online presence with high-performing social media strategies that engage your audience and drive real business growth.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Instagram', 'LinkedIn', 'Content Strategy'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button 
                        className="px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* Media Container - Right Side (Original Layout with Blurred Fill) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2"
              >
                {/* Blurred Background Video Layer */}
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774898952/management_video_j9vvld.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  style={{ filter: 'blur(20px) brightness(0.7)' }}
                />

                {/* Main Foreground Video Layer */}
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774898952/management_video_j9vvld.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="relative w-full h-full object-contain z-10 block"
                  style={{ borderRadius: 'inherit' }}
                />
              </motion.div>
            </div>

            {/* Subtle floating effect shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Automation Detail Section */}
      <section className="py-8 relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Media Container - Left Side (Alternating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5"
              >
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774897694/automation_video_eevmht.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                />
              </motion.div>

              {/* Text Content - Right Side */}
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      AUTOMATE • AUTOMATE • AUTOMATE
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">Automation</span>
                    </h2>
                    <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      Automate repetitive tasks, streamline workflows, and scale your operations efficiently while focusing on what truly matters.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['CRM', 'Lead Gen', 'Business Flows'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button 
                        className="px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtle floating effect shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Web Development Detail Section */}
      <section id="web-development" className="py-8 relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Text Content - Left Side (Alternating) */}
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      WEB • WEB • WEB
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">Web Development</span>
                    </h2>
                    <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      Build fast, scalable, and high-converting websites that deliver seamless user experiences and drive real business growth.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Website Development', 'Landing Pages'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button 
                        className="px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* Media Container - Right Side (Alternating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2"
              >
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774898094/web_dev_video_hoheur.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                />
              </motion.div>
            </div>

            {/* Subtle floating effect shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* SEO Detail Section */}
      <section id="seo" className="py-8 relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Media Container - Left Side (Alternating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5"
              >
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774897169/seo_video_dgkbor.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                />
              </motion.div>

              {/* Text Content - Right Side (Alternating) */}
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      SEO • SEO • SEO
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">Robust SEO</span>
                    </h2>
                    <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      Elevate your online presence with data-driven SEO strategies, optimized content, and scalable workflows that drive long-term organic growth.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Keyword Research', 'Content Strategy', 'Analytics'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button 
                        className="px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Detail Section Shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Visual Branding Detail Section */}
      <section id="visual-branding" className="py-8 relative">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              {/* Text Content - Left Side (Alternating) */}
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">
                      DESIGN • DESIGN • DESIGN
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900">
                      <span className="text-gradient">Visual Branding</span>
                    </h2>
                    <p className="text-slate-500 text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">
                      We craft visually stunning designs that connect with your audience, elevate your brand identity, and drive meaningful engagement.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Social Media', 'Ads', 'Videos'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button 
                        className="px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {btn}
                      </button>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              {/* Media Container - Right Side (Alternating) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2"
              >
                <video
                  src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774896151/visual_branding_video_vv9gci.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                />
              </motion.div>
            </div>

            {/* Subtle floating effect shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Client Success Stories Section */}
      <section id="clients" className="py-8 relative overflow-hidden">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden"
          >
            <div className="text-left mb-16 space-y-4 relative z-10">
              <h2 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight">
                Client <span className="text-gradient">Success Stories</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium max-w-2xl">
                Real results from brands that scaled with Adify's AI-driven growth engine.
              </p>
            </div>

            <div className="flex justify-start relative z-10">
              <CircularTestimonials
                testimonials={testimonialData}
                autoplay={true}
                colors={{
                  name: "#0a0a0a",
                  designation: "#454545",
                  testimony: "#171717",
                  arrowBackground: "#141414",
                  arrowForeground: "#f1f1f7",
                  arrowHoverBackground: "#3A0F63", // Adify Purple
                }}
                fontSizes={{
                  name: "28px",
                  designation: "18px",
                  quote: "18px",
                }}
              />
            </div>
            
            {/* Decorative Shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section id="global" className="py-8 relative overflow-hidden">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-8 lg:py-[24px] lg:px-[60px] overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
              {/* Left Side: Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                    Scaling Brands <br /> <span className="text-gradient">Beyond Borders.</span>
                  </h2>
                  <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    We help businesses grow across <span className="text-[#3A0F63] font-bold">global markets</span> with data-driven <span className="text-[#3A0F63] font-bold">marketing systems</span>.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#3A0F63]">500+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clients</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#3A0F63]">₹500Cr+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ad Spend</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-[#3A0F63]">6</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Countries Served</div>
                  </div>
                </div>

                <MagneticButton>
                  <button className="bg-[#3A0F63] text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-[#3A0F63]/20 hover:shadow-[#3A0F63]/30 transition-all">
                    Scale Your Brand Globally
                  </button>
                </MagneticButton>
              </motion.div>

              {/* Right Side: Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-[400px] md:h-[600px] flex items-center justify-center relative"
              >
                <InteractiveGlobe 
                  size={500}
                  markers={globeMarkers}
                  connections={globeConnections}
                  dotColor="rgba(124, 58, 237, ALPHA)"
                  arcColor="rgba(124, 58, 237, 0.3)"
                  markerColor="rgba(58, 15, 99, 1)"
                />
              </motion.div>
            </div>
            
            {/* Decorative Shadow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* About Adify Section */}
      <AboutAdify />


      {/* Reviews Section */}
      <section id="reviews" className="py-8">
        <div className="container-custom">
          <div className="text-left mb-20 space-y-6">
            <h2 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight">Client <span className="text-gradient">Success.</span></h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl">
              Don't just take our word for it. See what our clients have to say about their growth journey with Adify.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
            className="premium-card p-6 md:p-10 rounded-3xl md:rounded-[32px] space-y-8"
          >
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />)}
                </div>
                <p className="text-slate-600 font-medium leading-relaxed text-sm">
                  "Adify completely transformed our ROAS. We went from 2x to 5.5x in just three months. Their AI tools are a game changer!"
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-white/60">
                    <img src={`https://picsum.photos/seed/c${i}/100/100`} alt="client" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CEO, LuxeDecor</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">Common <span className="text-gradient">Questions.</span></h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Everything you need to know about working with us and how we help you scale.
              </p>
            </div>
            <div className="space-y-6">
            {[
              { q: 'How long does it take to see results?', a: 'Typically, we see initial data trends within 14 days and significant scaling potential by the 30-day mark.' },
              { q: 'Do you handle creative production?', a: 'Yes! We have a full creative studio that produces high-converting video and static assets.' },
              { q: 'What is your minimum ad spend requirement?', a: 'We typically work with brands spending at least ₹2,0,000 per month to ensure statistical significance.' }
            ].map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                data-cursor-text="Read FAQ"
                className="premium-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-sm font-bold text-slate-800 tracking-tight">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="container-custom flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center">
              <Zap className="text-white w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-slate-900">Adify</span>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">© 2026 Adify Marketing Agency</p>
          <div className="flex gap-10">
            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
