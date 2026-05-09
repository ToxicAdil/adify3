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
import { motion, useScroll, useTransform } from 'motion/react';

import { FloatingPurpleShapes } from '@/components/ui/floating-purple-shapes';
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow';
import { SimpleHeader } from '@/components/ui/simple-header';
import { SEO } from '@/components/SEO';

// ====================================================================
// PERFORMANCE: Lazy-load ALL components that use framer-motion
// This keeps the vendor-motion (107KB) chunk OUT of the critical path.
// It only loads when the user scrolls to sections that need it.
// ====================================================================
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const InteractiveServices = lazy(() => import('./components/InteractiveServices').then(m => ({ default: m.InteractiveServices })));
const AboutAdibuz = lazy(() => import('./components/AboutAdibuz'));
const AboutPreviewCard = lazy(() => import('./components/AboutPreviewCard').then(m => ({ default: m.AboutPreviewCard })));
const InsightPreviewCard = lazy(() => import('./components/InsightPreviewCard').then(m => ({ default: m.InsightPreviewCard })));
const CircularTestimonials = lazy(() => import('./components/ui/circular-testimonials').then(m => ({ default: m.CircularTestimonials })));
const InteractiveGlobe = lazy(() => import('./components/ui/interactive-globe').then(m => ({ default: m.InteractiveGlobe })));
const LogoCloud = lazy(() => import('./components/ui/logo-cloud-4').then(m => ({ default: m.LogoCloud })));
const Footer = lazy(() => import('./components/ui/footer-section').then(m => ({ default: m.Footer })));

import { FadeInUp, StaggerContainer, StaggerItem, floatVariant, ScaleInView } from '@/lib/animations';

// Lazy-load Three.js globe — deferred via requestIdleCallback inside globe-hero
const DotGlobeHero = lazy(() => import('@/components/ui/globe-hero').then(m => ({ default: m.DotGlobeHero })));

// ====================================================================
// PERFORMANCE: Detect mobile once to skip custom cursor
// ====================================================================
const isMobile = typeof window !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768
);

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
  { quote: "Adibuz completely transformed our ROAS. We went from 2x to 5.5x in just three months. Their AI tools are a game changer!", name: "Sarah Chen", designation: "CEO, LuxeDecor", src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=75&w=150&fm=webp&fit=crop" },
  { quote: "The attention to detail in their creative testing is impressive. We've seen significant improvements in our application's load times and overall user experience.", name: "Michael Rodriguez", designation: "Founder, TechStart", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=75&w=150&fm=webp&fit=crop" },
  { quote: "What sets Adibuz apart is its flexibility. We've been able to maintain consistency across our applications while still customizing components to match our brand identity.", name: "Emily Thompson", designation: "Marketing Director, GlowUp", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=75&w=150&fm=webp&fit=crop" },
  { quote: "The performance optimization in these components is outstanding. We've seen significant improvements in our application's load times and overall user experience.", name: "James Wilson", designation: "Performance Lead, SwiftScale", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=75&w=150&fm=webp&fit=crop" },
  { quote: "The community support and regular updates make this component library a reliable choice for our projects. It's clear that the team behind it is committed to quality.", name: "Sophia Martinez", designation: "E-commerce Manager, UrbanStyle", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=150&fm=webp&fit=crop" }
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

import { Preloader } from '@/components/ui/preloader';

// --- Main App ---

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const heroY = useTransform(scrollY, [0, 800], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);
  const heroFilter = useTransform(scrollY, [0, 800], ["blur(0px)", "blur(6px)"]);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white relative">
      <SEO />
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <div id="main-app-content" className="opacity-0">
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
      <header id="home" className="sticky top-0 z-[1] h-screen min-h-[100vh] max-h-[100vh] overflow-hidden">
        <motion.div
          style={{
            opacity: heroOpacity,
            filter: heroFilter,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BackgroundGradientGlow className="w-full h-full flex flex-col items-center justify-center">
          <FloatingPurpleShapes />
          <Suspense fallback={<div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center pt-20" />}>
          <DotGlobeHero className="w-full h-full flex flex-col items-center justify-center" globeRadius={isMobile ? 0.8 : 1.3}>
            {/* Inner motion wrapper to animate text/buttons but NOT the globe! */}
            <motion.div
              style={{
                scale: heroScale,
                y: heroY,
              }}
              className="flex flex-col items-center justify-center w-full h-full relative z-10"
            >
            {/* PROBLEM 7: Hero Content Centered */}
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
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                    style={{ transformOrigin: "center" }}
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
                We build high-performing marketing systems that drive <span className="text-primary font-bold">real revenue</span>, not just clicks.
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
                    transition={{ type: "spring", stiffness: 300 }}
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
          </DotGlobeHero>
          </Suspense>
        </BackgroundGradientGlow>
        </motion.div>
      </header>

      {/* ============================================================
          SLIDING PAGE CONTENT
          ============================================================ */}
      <main className="relative z-[10] bg-[#fdfaff] rounded-t-[48px] shadow-[0_-24px_60px_rgba(109,40,217,0.08)]">
        {/* Background Gradients to match the body */}
        <div className="absolute inset-0 z-0 pointer-events-none rounded-t-[48px]" style={{
          backgroundImage: `radial-gradient(circle at 15% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(109, 40, 217, 0.08) 0%, transparent 50%)`,
          backgroundAttachment: 'fixed'
        }} />
        
        <div className="relative z-10 w-full">
          {/* Clients Section (Animated Logo Cloud) */}
          <section className="pt-16 pb-12 mt-0 overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 200px' }}>
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
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
          </FadeInUp>
        </div>
      </section>

      {/* Social Media Detail Section */}
      <section className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
          </FadeInUp>
        </div>
      </section>

      {/* Automation Detail Section */}
      <section className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
          </FadeInUp>
        </div>
      </section>

      {/* Web Development Detail Section */}
      <section id="web-development" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
          </FadeInUp>
        </div>
      </section>

      {/* SEO Detail Section */}
      <section id="seo" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
          </FadeInUp>
        </div>
      </section>

      {/* Visual Branding Detail Section */}
      <section id="visual-branding" className="py-8 relative" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container-custom">
          <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
          </FadeInUp>
        </div>
      </section>

      {/* Grouped Clients Section */}
      <div id="clients">
        <section className="py-8 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <div className="container-custom">
            <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
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
            </FadeInUp>
          </div>
        </section>

        <section className="py-8 relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
          <div className="container-custom">
            <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-8 lg:py-[24px] lg:px-[60px] overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
                <FadeInUp className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">Scaling Brands <br /> <span className="text-gradient">Beyond Borders.</span></h2>
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">We help businesses grow across <span className="text-[#3A0F63] font-bold">global markets</span> with data-driven <span className="text-[#3A0F63] font-bold">marketing systems</span>.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    <div className="space-y-2">
                      <div className="text-3xl md:text-4xl font-[900] text-[#3A0F63] tracking-tight">25+</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Clients</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl md:text-4xl font-[900] text-[#3A0F63] tracking-tight">₹35L+</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Ad Spend Managed</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl md:text-4xl font-[900] text-[#3A0F63] tracking-tight">6</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Countries Served</div>
                    </div>
                  </div>
                  <MagneticButton>
                    <button className="bg-[#3A0F63] text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-[#3A0F63]/20 hover:shadow-[#3A0F63]/30 transition-all">Grow Beyond Borders</button>
                  </MagneticButton>
                </FadeInUp>
                <ScaleInView className="w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-none mx-auto">
                    <Suspense fallback={<div className="w-full h-full" />}>
                      <InteractiveGlobe size={450} markers={globeMarkers} connections={globeConnections} dotColor="rgba(124, 58, 237, ALPHA)" arcColor="rgba(124, 58, 237, 0.3)" markerColor="rgba(58, 15, 99, 1)" />
                    </Suspense>
                  </div>
                </ScaleInView>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
            </FadeInUp>
          </div>
        </section>

        <Suspense fallback={<SectionFallback />}>
          <AboutAdibuz />
        </Suspense>

        <div id="clients">
          <Suspense fallback={<SectionFallback />}>
            <InsightPreviewCard />
          </Suspense>
        </div>
      </div>

      {/* About Preview Card */}
      <Suspense fallback={<SectionFallback />}>
        <AboutPreviewCard />
      </Suspense>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20">
            <div className="space-y-8">

              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Frequently Asked <br /><span className="text-gradient">Questions.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
                Everything you need to know about our AI-driven systems and how we help ambitious brands scale.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { 
                  q: 'How does Adibuz use AI in digital marketing?', 
                  a: 'Adibuz integrates AI into strategy, automation, audience analysis, content workflows, lead qualification, and performance optimization. Our systems help brands reduce manual effort, improve efficiency, and scale faster through data-driven decision making and intelligent automation.' 
                },
                { 
                  q: 'What makes Adibuz different from traditional agencies?', 
                  a: 'Unlike traditional agencies that focus only on execution, Adibuz builds scalable digital systems. We combine AI automation, premium branding, performance marketing, web development, and strategic growth frameworks to create long-term business impact instead of short-term vanity metrics.' 
                },
                { 
                  q: 'What services does Adibuz specialize in?', 
                  a: 'Adibuz specializes in AI automation, high-performance website development, SEO, social media management, paid advertising, branding strategy, conversion optimization, and modern digital growth systems tailored for scalable businesses.' 
                },
                { 
                  q: 'Can Adibuz help startups and growing businesses?', 
                  a: 'Yes. We work with startups, personal brands, service businesses, SaaS companies, e-commerce brands, and growing enterprises. Our systems are designed to adapt to different growth stages and business goals.' 
                },
                { 
                  q: 'How long does it usually take to see measurable growth?', 
                  a: 'The timeline depends on the service and market competition. Paid campaigns can generate results within weeks, while SEO and long-term brand systems typically compound over several months. Our focus is sustainable, measurable, and scalable growth.' 
                },
                { 
                  q: 'Does Adibuz provide both branding and performance marketing?', 
                  a: 'Yes. Adibuz combines premium brand positioning with performance-driven marketing strategies. We help businesses create strong digital identities while also building systems that generate leads, conversions, and long-term customer growth.' 
                },
                { 
                  q: 'Can you redesign or optimize an existing website?', 
                  a: 'Absolutely. We help businesses modernize outdated websites by improving performance, user experience, branding consistency, responsiveness, SEO structure, and conversion-focused design systems.' 
                }
              ].map((faq, i) => (
                <FadeInUp key={i} delay={i * 0.1} className="premium-card rounded-[20px] md:rounded-[24px] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group hover:shadow-[0_20px_40px_-10px_rgba(58,15,99,0.08)] hover:-translate-y-1 border border-slate-200/50 hover:border-[#3A0F63]/30 bg-white hover:bg-[#fcfaff]">
                  <div className="flex items-center justify-between py-4 px-5 md:py-[18px] md:px-7 cursor-pointer">
                    <span className="text-base md:text-[1.1rem] font-bold text-slate-800 tracking-tight group-hover:text-[#3A0F63] transition-colors duration-500 pr-4 leading-snug">
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#3A0F63] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 group-hover:shadow-lg group-hover:shadow-[#3A0F63]/20 group-hover:scale-105">
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-rotate-180 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    </div>
                  </div>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-7 pb-5 md:pb-6 text-slate-500 text-[0.95rem] md:text-[1.05rem] leading-[1.65] font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[50ms]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>


      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
        </div>
      </main>
      </div>
    </div>
  );
}
