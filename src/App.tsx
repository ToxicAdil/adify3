import React, { lazy, Suspense, memo, useRef, useEffect, useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  Star,
} from 'lucide-react';
import ScrollIndicator from './components/ScrollIndicator';
import MagneticButton from './components/MagneticButton';

import { FloatingPurpleShapes } from '@/components/ui/floating-purple-shapes';
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow';
import { SimpleHeader } from '@/components/ui/simple-header';

// ====================================================================
// PERFORMANCE: Lazy-load ALL components that use framer-motion
// This keeps the vendor-motion (107KB) chunk OUT of the critical path.
// It only loads when the user scrolls to sections that need it.
// ====================================================================
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const InteractiveServices = lazy(() => import('./components/InteractiveServices').then(m => ({ default: m.InteractiveServices })));
const AboutAdibuz = lazy(() => import('./components/AboutAdibuz'));
const AudioCTA = lazy(() => import('./components/AudioCTA').then(m => ({ default: m.AudioCTA })));
const CircularTestimonials = lazy(() => import('./components/ui/circular-testimonials').then(m => ({ default: m.CircularTestimonials })));
const InteractiveGlobe = lazy(() => import('./components/ui/interactive-globe').then(m => ({ default: m.InteractiveGlobe })));
const LogoCloud = lazy(() => import('./components/ui/logo-cloud-4').then(m => ({ default: m.LogoCloud })));
const Footer = lazy(() => import('./components/ui/footer-section').then(m => ({ default: m.Footer })));

// Lazy-load Three.js globe — deferred via requestIdleCallback inside globe-hero
const DotGlobeHero = lazy(() => import('@/components/ui/globe-hero').then(m => ({ default: m.DotGlobeHero })));

// ====================================================================
// PERFORMANCE: Detect mobile once to skip custom cursor
// ====================================================================
const isMobile = typeof window !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768
);

// ====================================================================
// PERFORMANCE: FadeInView — replaces motion.div whileInView
// Uses IntersectionObserver + CSS transitions (0 JS library overhead)
// Visually identical: same fade-up entrance on scroll
// ====================================================================
const FadeInView = memo(({ children, className, delay = 0, style }: { 
  children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: visible ? undefined : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
});
FadeInView.displayName = 'FadeInView';

// Scale-in variant for video containers
const ScaleInView = memo(({ children, className, delay = 0 }: { 
  children: React.ReactNode; className?: string; delay?: number 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
});
ScaleInView.displayName = 'ScaleInView';

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
  { quote: "Adibuz completely transformed our ROAS. We went from 2x to 5.5x in just three months. Their AI tools are a game changer!", name: "Sarah Chen", designation: "CEO, LuxeDecor", src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" },
  { quote: "The attention to detail in their creative testing is impressive. We've seen significant improvements in our application's load times and overall user experience.", name: "Michael Rodriguez", designation: "Founder, TechStart", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" },
  { quote: "What sets Adibuz apart is its flexibility. We've been able to maintain consistency across our applications while still customizing components to match our brand identity.", name: "Emily Thompson", designation: "Marketing Director, GlowUp", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
  { quote: "The performance optimization in these components is outstanding. We've seen significant improvements in our application's load times and overall user experience.", name: "James Wilson", designation: "Performance Lead, SwiftScale", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
  { quote: "The community support and regular updates make this component library a reliable choice for our projects. It's clear that the team behind it is committed to quality.", name: "Sophia Martinez", designation: "E-commerce Manager, UrbanStyle", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" }
];

// ====================================================================
// PERFORMANCE: LazyVideo — only loads/plays when visible via IO
// ====================================================================
const LazyVideo = memo(({ src, className, style }: { 
  src: string; className?: string; style?: React.CSSProperties 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <video ref={videoRef} muted loop playsInline preload="none" className={className} style={style} />
    </div>
  );
});
LazyVideo.displayName = 'LazyVideo';

const SectionFallback = () => <div style={{ minHeight: '400px' }} />;

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white relative">
      {!isMobile && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <ScrollIndicator />
      <SimpleHeader />

      {/* ============================================================
          HERO SECTION — CSS animations replace framer-motion
          Same visual: fade-up, scale-in with identical timing/easing
          ============================================================ */}
      <header id="home" className="relative">
        <BackgroundGradientGlow className="min-h-screen">
          <FloatingPurpleShapes />
          <Suspense fallback={<div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center pt-20" />}>
          <DotGlobeHero className="pt-16 md:pt-20" globeRadius={isMobile ? 0.8 : 1.3}>
            <div className="flex flex-col items-center max-w-5xl px-4 sm:px-6 md:px-[37px]">
              {/* Top Badge — CSS animation */}
              <div
                className="ai-badge bg-white/40 border border-white/60 font-medium text-slate-500 uppercase tracking-[0.2em] shadow-sm backdrop-blur-md mb-8"
                style={{ animation: 'heroFadeUp 0.8s ease-out both' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" /> AI-FIRST MARKETING
              </div>

              {/* Main Headline */}
              <div className="text-center space-y-2 mb-8">
                <span
                  className="block text-5xl md:text-5xl font-light text-slate-600 tracking-tight"
                  style={{ animation: 'heroFadeUpLarge 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
                >
                  Scale Smarter.
                </span>
                
                <div className="relative inline-block">
                  {/* Blur glow duplicate layer */}
                  <span
                    className="absolute inset-0 blur-2xl select-none pointer-events-none text-5xl sm:text-5xl md:text-8xl font-black text-gradient md:whitespace-nowrap"
                    aria-hidden="true"
                    style={{ animation: 'heroBlurIn 1.2s ease 0.3s both' }}
                  >
                    Grow Your Brand Faster
                  </span>
                  
                  <h1
                    className="text-5xl sm:text-5xl md:text-8xl font-black tracking-tighter text-gradient relative z-10 md:whitespace-nowrap"
                    style={{ animation: 'heroScaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
                  >
                    Grow Your Brand Faster
                  </h1>

                  {/* Animated Underline */}
                  <div
                    className="h-1.5 md:h-2 bg-gradient-to-r from-primary/80 to-transparent rounded-full mt-2"
                    style={{ animation: 'heroUnderline 1.5s ease-in-out 0.8s both' }}
                  />
                </div>
              </div>

              {/* Subtext */}
              <p
                className="text-lg sm:text-lg md:text-2xl text-slate-500 font-medium leading-relaxed mb-8 md:mb-12 max-w-3xl"
                style={{ animation: 'heroFadeUpLarge 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}
              >
                We build high-performing marketing systems that drive{" "}
                <span className="relative inline-block px-2 py-0.5 mx-1">
                  <span className="relative z-10 text-primary">real revenue</span>
                  <span 
                    className="absolute inset-0 bg-primary/10 rounded-lg -rotate-1"
                    style={{ animation: 'heroHighlight 0.8s ease 1.2s both' }}
                  />
                </span>
                , not just clicks.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row items-center gap-6"
                style={{ animation: 'heroFadeUpLarge 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}
              >
                <MagneticButton>
                  <button 
                    data-cursor-text="Book"
                    className="w-full sm:w-auto bg-slate-900 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-base btn-premium flex items-center justify-center gap-3 primary-button"
                  >
                    Book a Strategy Call <ArrowRight className="w-5 h-5" />
                  </button>
                </MagneticButton>
                
                <MagneticButton>
                  <button 
                    data-cursor-text="Free"
                    className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-sm sm:text-base text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group min-h-[44px]"
                  >
                    <CheckCircle2 className="w-5 h-5 group-hover:text-emerald-500 transition-colors" /> Free Audit
                  </button>
                </MagneticButton>
              </div>
            </div>
          </DotGlobeHero>
          </Suspense>
        </BackgroundGradientGlow>
      </header>

      {/* Clients Section (Animated Logo Cloud) */}
      <section className="py-8 border-b border-white relative z-10" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 200px' }}>
        <div className="container-custom">
          <div className="w-full">
            <h2 className="mb-5 text-center">
              <span className="block font-medium text-2xl text-slate-500">Our Expertise</span>
              <span className="font-black text-2xl text-primary tracking-tight md:text-3xl">End-to-End Solutions</span>
            </h2>
            <Suspense fallback={<div style={{ minHeight: '80px' }} />}>
              <LogoCloud services={services} />
            </Suspense>
          </div>
        </div>
      </section>

      <section id="services">
        <Suspense fallback={<SectionFallback />}>
          <InteractiveServices />
        </Suspense>
      </section>

      {/* Strategic Marketing Detail Section */}
      <section id="strategic-marketing" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              <ScaleInView delay={0.2} className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5">
                <LazyVideo src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774899653/marketing_video_yes6gn.mp4" className="w-full h-full object-cover block" style={{ borderRadius: 'inherit' }} />
              </ScaleInView>
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">ADS • ADS • ADS</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900"><span className="text-gradient">Strategic Marketing</span></h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">Ready to scale your brand with data-driven advertising? We craft high-performing campaigns across platforms that maximize ROI and drive consistent growth.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Facebook Ads', 'Google Ads'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">{btn}</button>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </FadeInView>
        </div>
      </section>

      {/* Social Media Detail Section */}
      <section className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 order-2 lg:order-1 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">SOCIAL • SOCIAL • SOCIAL</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900"><span className="text-gradient">Social Media</span></h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">Build a strong online presence with high-performing social media strategies that engage your audience and drive real business growth.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Instagram', 'LinkedIn', 'Content Strategy'].map((btn) => (
                    <MagneticButton key={btn}>
                      <button className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">{btn}</button>
                    </MagneticButton>
                  ))}
                </div>
              </div>
              <ScaleInView delay={0.2} className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2">
                <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-purple-900/30 to-slate-900/30" style={{ filter: 'blur(20px) brightness(0.7)' }} />
                <LazyVideo src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774898952/management_video_j9vvld.mp4" className="relative w-full h-full object-contain z-10 block" style={{ borderRadius: 'inherit' }} />
              </ScaleInView>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </FadeInView>
        </div>
      </section>

      {/* Automation Detail Section */}
      <section className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              <ScaleInView delay={0.2} className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5">
                <LazyVideo src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774897694/automation_video_eevmht.mp4" className="w-full h-full object-cover block" style={{ borderRadius: 'inherit' }} />
              </ScaleInView>
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">AUTOMATE • AUTOMATE • AUTOMATE</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900"><span className="text-gradient">Automation</span></h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">Automate repetitive tasks, streamline workflows, and scale your operations efficiently while focusing on what truly matters.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['CRM', 'Lead Gen', 'Business Flows'].map((btn) => (
                    <MagneticButton key={btn}><button className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">{btn}</button></MagneticButton>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </FadeInView>
        </div>
      </section>

      {/* Web Development Detail Section */}
      <section id="web-development" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">WEB • WEB • WEB</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900"><span className="text-gradient">Web Development</span></h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">Build fast, scalable, and high-converting websites that deliver seamless user experiences and drive real business growth.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Website Development', 'Landing Pages'].map((btn) => (
                    <MagneticButton key={btn}><button className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">{btn}</button></MagneticButton>
                  ))}
                </div>
              </div>
              <ScaleInView delay={0.2} className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2">
                <LazyVideo src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774898094/web_dev_video_hoheur.mp4" className="w-full h-full object-cover block" style={{ borderRadius: 'inherit' }} />
              </ScaleInView>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </FadeInView>
        </div>
      </section>

      {/* SEO Detail Section */}
      <section id="seo" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              <ScaleInView delay={0.2} className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5">
                <LazyVideo src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774897169/seo_video_dgkbor.mp4" className="w-full h-full object-cover block" style={{ borderRadius: 'inherit' }} />
              </ScaleInView>
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">SEO • SEO • SEO</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900"><span className="text-gradient">Robust SEO</span></h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">Elevate your online presence with data-driven SEO strategies, optimized content, and scalable workflows that drive long-term organic growth.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Keyword Research', 'Content Strategy', 'Analytics'].map((btn) => (
                    <MagneticButton key={btn}><button className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">{btn}</button></MagneticButton>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </FadeInView>
        </div>
      </section>

      {/* Visual Branding Detail Section */}
      <section id="visual-branding" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center relative z-10">
              <div className="flex-1 w-full lg:max-w-[500px] space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <span className="text-[12px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-[16px] py-[6px] rounded-full">DESIGN • DESIGN • DESIGN</span>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-4xl md:text-[42px] font-bold leading-[1.2] tracking-tight text-slate-900"><span className="text-gradient">Visual Branding</span></h2>
                    <p className="text-slate-500 text-[15px] md:text-[18px] font-medium leading-[1.6] max-lg:max-w-lg max-lg:mx-auto">We craft visually stunning designs that connect with your audience, elevate your brand identity, and drive meaningful engagement.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {['Social Media', 'Ads', 'Videos'].map((btn) => (
                    <MagneticButton key={btn}><button className="px-[16px] sm:px-[20px] py-[8px] bg-slate-100/50 backdrop-blur-sm border border-slate-200/50 rounded-[6px] text-[13px] font-medium text-slate-900 hover:bg-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 min-h-[44px]">{btn}</button></MagneticButton>
                  ))}
                </div>
              </div>
              <ScaleInView delay={0.2} className="relative w-full aspect-[4/3] lg:w-[380px] lg:min-w-[380px] mx-auto rounded-[24px] overflow-hidden group shadow-xl ring-1 ring-black/5 order-1 lg:order-2">
                <LazyVideo src="https://res.cloudinary.com/dtzo88csm/video/upload/v1774896151/visual_branding_video_vv9gci.mp4" className="w-full h-full object-cover block" style={{ borderRadius: 'inherit' }} />
              </ScaleInView>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          </FadeInView>
        </div>
      </section>

      {/* Grouped Clients Section */}
      <div id="clients">
        <section className="py-8 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <div className="container-custom">
            <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
              <div className="text-left mb-16 space-y-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">Client <span className="text-gradient">Success Stories</span></h2>
                <p className="text-slate-500 text-lg font-medium max-w-2xl">Real results from brands that scaled with Adibuz's AI-driven growth engine.</p>
              </div>
              <div className="flex justify-start relative z-10">
                <Suspense fallback={<SectionFallback />}>
                  <CircularTestimonials
                    testimonials={testimonialData}
                    autoplay={true}
                    colors={{ name: "#0a0a0a", designation: "#454545", testimony: "#171717", arrowBackground: "#141414", arrowForeground: "#f1f1f7", arrowHoverBackground: "#3A0F63" }}
                    fontSizes={{ name: "28px", designation: "18px", quote: "18px" }}
                  />
                </Suspense>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
            </FadeInView>
          </div>
        </section>

        <section className="py-8 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <div className="container-custom">
            <FadeInView className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-8 lg:py-[24px] lg:px-[60px] overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
                <FadeInView className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">Scaling Brands <br /> <span className="text-gradient">Beyond Borders.</span></h2>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">We help businesses grow across <span className="text-[#3A0F63] font-bold">global markets</span> with data-driven <span className="text-[#3A0F63] font-bold">marketing systems</span>.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    <div className="space-y-1"><div className="text-3xl font-bold text-[#3A0F63]">500+</div><div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clients</div></div>
                    <div className="space-y-1"><div className="text-3xl font-bold text-[#3A0F63]">₹500Cr+</div><div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ad Spend</div></div>
                    <div className="space-y-1"><div className="text-3xl font-bold text-[#3A0F63]">6</div><div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Countries Served</div></div>
                  </div>
                  <MagneticButton>
                    <button className="bg-[#3A0F63] text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-[#3A0F63]/20 hover:shadow-[#3A0F63]/30 transition-all">Scale Your Brand Globally</button>
                  </MagneticButton>
                </FadeInView>
                <ScaleInView className="w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-none mx-auto">
                    <Suspense fallback={<div className="w-full h-full" />}>
                      <InteractiveGlobe size={450} markers={globeMarkers} connections={globeConnections} dotColor="rgba(124, 58, 237, ALPHA)" arcColor="rgba(124, 58, 237, 0.3)" markerColor="rgba(58, 15, 99, 1)" />
                    </Suspense>
                  </div>
                </ScaleInView>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
            </FadeInView>
          </div>
        </section>

        <Suspense fallback={<SectionFallback />}>
          <AboutAdibuz />
        </Suspense>

        <section className="py-8" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
          <div className="container-custom">
            <div className="text-left mb-10 md:mb-20 space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">Client <span className="text-gradient">Success.</span></h2>
              <p className="text-slate-500 text-lg font-medium max-w-2xl">Don't just take our word for it. See what our clients have to say about their growth journey with Adibuz.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {[1, 2, 3].map(i => (
                <FadeInView key={i} delay={i * 0.1} className="premium-card p-6 md:p-10 rounded-3xl md:rounded-[32px] space-y-8">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />)}
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed text-sm">"Adibuz completely transformed our ROAS. We went from 2x to 5.5x in just three months. Their AI tools are a game changer!"</p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-white/60">
                      <img src={`https://picsum.photos/seed/c${i}/100/100`} alt="client" referrerPolicy="no-referrer" width={40} height={40} loading="lazy" decoding="async" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Sarah Jenkins</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CEO, LuxeDecor</p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FAQs Section */}
      <section id="faqs" className="py-8">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-10 lg:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">Common <span className="text-gradient">Questions.</span></h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">Everything you need to know about working with us and how we help you scale.</p>
            </div>
            <div className="space-y-6">
              {[
                { q: 'How long does it take to see results?', a: 'Typically, we see initial data trends within 14 days and significant scaling potential by the 30-day mark.' },
                { q: 'Do you handle creative production?', a: 'Yes! We have a full creative studio that produces high-converting video and static assets.' },
                { q: 'What is your minimum ad spend requirement?', a: 'We typically work with brands spending at least ₹2,0,000 per month to ensure statistical significance.' }
              ].map((faq, i) => (
                <FadeInView key={i} delay={i * 0.1} className="premium-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer" style={{ cursor: 'pointer' }}>
                  <details className="group">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <span className="text-sm font-bold text-slate-800 tracking-tight">{faq.q}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed font-medium">{faq.a}</div>
                  </details>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <AudioCTA />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
