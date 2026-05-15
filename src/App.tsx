import React, { lazy, Suspense, memo, useRef, useEffect, useState } from 'react';

import ScrollIndicator from './components/ScrollIndicator';
import { motion, useScroll, useTransform } from 'motion/react';

import { FloatingPurpleShapes } from '@/components/ui/floating-purple-shapes';
import { BackgroundGradientGlow } from '@/components/ui/background-gradient-glow';
import { SimpleHeader } from '@/components/ui/simple-header';
import { SEO } from '@/components/SEO';

// ====================================================================
// PERFORMANCE: Lazy-load ALL components that use framer-motion / heavy deps
// ====================================================================
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const InteractiveServices = lazy(() =>
  import('./components/InteractiveServices').then((m) => ({ default: m.InteractiveServices }))
);
const AboutAdibuz = lazy(() => import('./components/AboutAdibuz'));
const AboutPreviewCard = lazy(() =>
  import('./components/AboutPreviewCard').then((m) => ({ default: m.AboutPreviewCard }))
);
const InsightPreviewCard = lazy(() =>
  import('./components/InsightPreviewCard').then((m) => ({ default: m.InsightPreviewCard }))
);
const CircularTestimonials = lazy(() =>
  import('./components/ui/circular-testimonials').then((m) => ({
    default: m.CircularTestimonials,
  }))
);
const InteractiveGlobe = lazy(() =>
  import('./components/ui/interactive-globe').then((m) => ({ default: m.InteractiveGlobe }))
);
const LogoCloud = lazy(() =>
  import('./components/ui/logo-cloud-4').then((m) => ({ default: m.LogoCloud }))
);
const Footer = lazy(() =>
  import('./components/ui/footer-section').then((m) => ({ default: m.Footer }))
);

import { FadeInUp, ScaleInView } from '@/lib/animations';
import { ServiceDetailSection } from '@/components/ServiceDetailSection';
import { FAQSection } from '@/components/FAQSection';
import { HeroContent } from '@/components/HeroContent';

// Lazy-load Three.js globe — deferred via requestIdleCallback inside globe-hero
const DotGlobeHero = lazy(() =>
  import('@/components/ui/globe-hero').then((m) => ({ default: m.DotGlobeHero }))
);

// ====================================================================
// PERFORMANCE: Detect mobile once
// ====================================================================
const isMobile =
  typeof window !== 'undefined' &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768);

// ====================================================================
// CLOUDINARY VIDEO HELPERS
// Auto-select WebM (smaller) on desktop; use poster JPG on mobile
// ====================================================================
/**
 * Returns an optimised Cloudinary video URL.
 * Applies: WebM format, auto quality, capped width for mobile.
 */
function cloudinaryVideo(publicId: string, mobile = false): string {
  const base = `https://res.cloudinary.com/dtzo88csm/video/upload`;
  const transforms = mobile
    ? `f_webm,q_auto:low,w_480,so_0`
    : `f_webm,q_auto:good,w_800`;
  return `${base}/${transforms}/${publicId}`;
}

/**
 * Returns a Cloudinary poster image URL (first frame, compressed JPG).
 */
function cloudinaryPoster(publicId: string): string {
  return `https://res.cloudinary.com/dtzo88csm/video/upload/f_jpg,q_auto:low,w_640,so_0/${publicId}`;
}

// Video asset definitions
const VIDEOS = {
  marketing: 'v1774899653/marketing_video_yes6gn.mp4',
  social:    'v1774898952/management_video_j9vvld.mp4',
  automation:'v1774897694/automation_video_eevmht.mp4',
  webdev:    'v1774898094/web_dev_video_hoheur.mp4',
  seo:       'v1774897169/seo_video_dgkbor.mp4',
  branding:  'v1774896151/visual_branding_video_vv9gci.mp4',
};

const services = [
  'Web Development',
  'AI Automation',
  'Social Media Marketing',
  'Performance Ads',
  'Lead Generation',
  'Strategic Marketing',
  'SEO Optimization',
  'Data Analytics',
];

const globeMarkers = [
  { lat: 28.61, lng: 77.21, label: 'India' },
  { lat: 37.77, lng: -122.41, label: 'USA' },
  { lat: 43.65, lng: -79.38, label: 'Canada' },
  { lat: -33.86, lng: 151.2, label: 'Australia' },
  { lat: -26.2, lng: 28.04, label: 'South Africa' },
  { lat: 25.2, lng: 55.27, label: 'Dubai' },
];

const globeConnections = [
  { from: [28.61, 77.21] as [number, number], to: [37.77, -122.41] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [43.65, -79.38] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [-33.86, 151.2] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [-26.2, 28.04] as [number, number] },
  { from: [28.61, 77.21] as [number, number], to: [25.2, 55.27] as [number, number] },
];

const testimonialData = [
  {
    quote:
      'Adibuz completely transformed our ROAS. We went from 2x to 5.5x in just three months. Their AI tools are a game changer!',
    name: 'Sarah Chen',
    designation: 'CEO, LuxeDecor',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=75&w=150&fm=webp&fit=crop',
  },
  {
    quote:
      "The attention to detail in their creative testing is impressive. We've seen significant improvements in our application's load times and overall user experience.",
    name: 'Michael Rodriguez',
    designation: 'Founder, TechStart',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=75&w=150&fm=webp&fit=crop',
  },
  {
    quote:
      "What sets Adibuz apart is its flexibility. We've been able to maintain consistency across our applications while still customizing components to match our brand identity.",
    name: 'Emily Thompson',
    designation: 'Marketing Director, GlowUp',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=75&w=150&fm=webp&fit=crop',
  },
  {
    quote:
      "The performance optimization in these components is outstanding. We've seen significant improvements in our application's load times and overall user experience.",
    name: 'James Wilson',
    designation: 'Performance Lead, SwiftScale',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=75&w=150&fm=webp&fit=crop',
  },
  {
    quote:
      "The community support and regular updates make this component library a reliable choice for our projects. It's clear that the team behind it is committed to quality.",
    name: 'Sophia Martinez',
    designation: 'E-commerce Manager, UrbanStyle',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=150&fm=webp&fit=crop',
  },
];

// ====================================================================
// PERFORMANCE: LazyVideo — only loads/plays when visible via IO
// Uses WebM source for 60-80% smaller file size vs MP4
// ====================================================================
const LazyVideo = memo(
  ({
    src,
    className,
    style,
    ariaLabel,
  }: {
    src: string;
    className?: string;
    style?: React.CSSProperties;
    ariaLabel?: string;
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
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={className}
          style={style}
          aria-label={ariaLabel}
          // Accessibility: provide caption track stub
        >
          <track kind="captions" srcLang="en" label="English" default />
        </video>
      </div>
    );
  }
);
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
  const heroFilter = useTransform(scrollY, [0, 800], ['blur(0px)', 'blur(6px)']);

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
            HERO SECTION
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
              <Suspense
                fallback={
                  <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center pt-20" />
                }
              >
                <DotGlobeHero
                  className="w-full h-full flex flex-col items-center justify-center"
                  globeRadius={isMobile ? 0.8 : 1.3}
                >
                  <HeroContent heroScale={heroScale} heroY={heroY} />
                </DotGlobeHero>
              </Suspense>
            </BackgroundGradientGlow>
          </motion.div>
        </header>

        {/* ============================================================
            SLIDING PAGE CONTENT
            ============================================================ */}
        <main className="relative z-[10] bg-[#fdfaff] rounded-t-[48px] shadow-[0_-24px_60px_rgba(109,40,217,0.08)]">
          <div
            className="absolute inset-0 z-0 pointer-events-none rounded-t-[48px]"
            style={{
              backgroundImage: `radial-gradient(circle at 15% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(109, 40, 217, 0.08) 0%, transparent 50%)`,
              backgroundAttachment: 'fixed',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full">
            {/* Expertise / Logo Cloud */}
            <section
              className="pt-16 pb-12 mt-0 overflow-hidden"
              style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 200px' }}
              aria-label="Our Expertise"
            >
              <div className="container-custom">
                <div className="w-full">
                  <h2 className="mb-5 text-center">
                    <span className="block font-medium text-2xl text-slate-500">Our Expertise</span>
                    <span className="font-black text-2xl text-primary tracking-tight md:text-3xl">
                      End-to-End Solutions
                    </span>
                  </h2>
                  <Suspense fallback={<div style={{ minHeight: '80px' }} />}>
                    <LogoCloud services={services} />
                  </Suspense>
                </div>
              </div>
            </section>

            <section id="services" aria-label="Our Services">
              <Suspense fallback={<SectionFallback />}>
                <InteractiveServices />
              </Suspense>
            </section>

            {/* Strategic Marketing */}
            <ServiceDetailSection
              id="strategic-marketing"
              label="ADS • ADS • ADS"
              title="Strategic Marketing"
              description="Ready to scale your brand with data-driven advertising? We craft high-performing campaigns across platforms that maximize ROI and drive consistent growth."
              buttons={['Facebook Ads', 'Google Ads']}
              posterUrl={cloudinaryPoster(VIDEOS.marketing)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.marketing)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="Strategic marketing showcase video"
                />
              }
            />

            {/* Social Media */}
            <ServiceDetailSection
              label="SOCIAL • SOCIAL • SOCIAL"
              title="Social Media"
              description="Build a strong online presence with high-performing social media strategies that engage your audience and drive real business growth."
              buttons={['Instagram', 'LinkedIn', 'Content Strategy']}
              videoRight
              posterUrl={cloudinaryPoster(VIDEOS.social)}
              videoSlot={
                <>
                  <div
                    className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-purple-900/30 to-slate-900/30"
                    style={{ filter: 'blur(20px) brightness(0.7)' }}
                    aria-hidden="true"
                  />
                  <LazyVideo
                    src={cloudinaryVideo(VIDEOS.social)}
                    className="relative w-full h-full object-contain z-10 block"
                    style={{ borderRadius: 'inherit' }}
                    ariaLabel="Social media management showcase video"
                  />
                </>
              }
            />

            {/* Automation */}
            <ServiceDetailSection
              label="AUTOMATE • AUTOMATE • AUTOMATE"
              title="Automation"
              description="Automate repetitive tasks, streamline workflows, and scale your operations efficiently while focusing on what truly matters."
              buttons={['CRM', 'Lead Gen', 'Business Flows']}
              posterUrl={cloudinaryPoster(VIDEOS.automation)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.automation)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="AI automation showcase video"
                />
              }
            />

            {/* Web Development */}
            <ServiceDetailSection
              id="web-development"
              label="WEB • WEB • WEB"
              title="Web Development"
              description="Build fast, scalable, and high-converting websites that deliver seamless user experiences and drive real business growth."
              buttons={['Website Development', 'Landing Pages']}
              videoRight
              posterUrl={cloudinaryPoster(VIDEOS.webdev)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.webdev)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="Web development showcase video"
                />
              }
            />

            {/* SEO */}
            <ServiceDetailSection
              id="seo"
              label="SEO • SEO • SEO"
              title="Robust SEO"
              description="Elevate your online presence with data-driven SEO strategies, optimized content, and scalable workflows that drive long-term organic growth."
              buttons={['Keyword Research', 'Content Strategy', 'Analytics']}
              posterUrl={cloudinaryPoster(VIDEOS.seo)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.seo)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="SEO optimization showcase video"
                />
              }
            />

            {/* Visual Branding */}
            <ServiceDetailSection
              id="visual-branding"
              label="DESIGN • DESIGN • DESIGN"
              title="Visual Branding"
              description="We craft visually stunning designs that connect with your audience, elevate your brand identity, and drive meaningful engagement."
              buttons={['Social Media', 'Ads', 'Videos']}
              videoRight
              posterUrl={cloudinaryPoster(VIDEOS.branding)}
              videoSlot={
                <LazyVideo
                  src={cloudinaryVideo(VIDEOS.branding)}
                  className="w-full h-full object-cover block"
                  style={{ borderRadius: 'inherit' }}
                  ariaLabel="Visual branding showcase video"
                />
              }
            />

            {/* Grouped Clients Section */}
            <div id="clients">
              <section
                className="py-8 relative overflow-hidden"
                style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}
                aria-label="Client Success Stories"
              >
                <div className="container-custom">
                  <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden">
                    <div className="text-left mb-16 space-y-4 relative z-10">
                      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                        Client <span className="text-gradient">Success Stories</span>
                      </h2>
                      <p className="text-slate-500 text-lg font-medium max-w-2xl">
                        Real results from brands that scaled with Adibuz's AI-driven growth engine.
                      </p>
                    </div>
                    <div className="flex justify-start relative z-10">
                      <Suspense fallback={<SectionFallback />}>
                        <CircularTestimonials
                          testimonials={testimonialData}
                          autoplay={true}
                          colors={{
                            name: '#0a0a0a',
                            designation: '#454545',
                            testimony: '#171717',
                            arrowBackground: '#141414',
                            arrowForeground: '#f1f1f7',
                            arrowHoverBackground: '#3A0F63',
                          }}
                          fontSizes={{ name: '28px', designation: '18px', quote: '18px' }}
                        />
                      </Suspense>
                    </div>
                    <div
                      className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
                      aria-hidden="true"
                    />
                  </FadeInUp>
                </div>
              </section>

              <section
                className="py-8 relative overflow-hidden"
                style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}
                aria-label="Global Reach"
              >
                <div className="container-custom">
                  <FadeInUp className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-8 lg:py-[24px] lg:px-[60px] overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
                      <FadeInUp className="space-y-8">
                        <div className="space-y-4">
                          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                            Scaling Brands <br />
                            <span className="text-gradient">Beyond Borders.</span>
                          </h2>
                          <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                            We help businesses grow across{' '}
                            <span className="text-[#3A0F63] font-bold">global markets</span> with
                            data-driven{' '}
                            <span className="text-[#3A0F63] font-bold">marketing systems</span>.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                          <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-[900] text-[#3A0F63] tracking-tight">
                              25+
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                              Clients
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-[900] text-[#3A0F63] tracking-tight">
                              ₹35L+
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                              Ad Spend Managed
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-[900] text-[#3A0F63] tracking-tight">
                              6
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                              Countries Served
                            </div>
                          </div>
                        </div>
                        <button
                          className="bg-[#3A0F63] text-white px-8 py-4 rounded-full text-sm font-bold shadow-xl shadow-[#3A0F63]/20 hover:shadow-[#3A0F63]/30 transition-all"
                          aria-label="Start growing your brand beyond borders"
                        >
                          Grow Beyond Borders
                        </button>
                      </FadeInUp>
                      <ScaleInView className="w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center relative overflow-hidden">
                        <div className="w-full h-full max-w-[300px] sm:max-w-[400px] md:max-w-none mx-auto">
                          <Suspense fallback={<div className="w-full h-full" />}>
                            <InteractiveGlobe
                              size={450}
                              markers={globeMarkers}
                              connections={globeConnections}
                              dotColor="rgba(124, 58, 237, ALPHA)"
                              arcColor="rgba(124, 58, 237, 0.3)"
                              markerColor="rgba(58, 15, 99, 1)"
                            />
                          </Suspense>
                        </div>
                      </ScaleInView>
                    </div>
                    <div
                      className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"
                      aria-hidden="true"
                    />
                  </FadeInUp>
                </div>
              </section>

              <Suspense fallback={<SectionFallback />}>
                <AboutAdibuz />
              </Suspense>

              <div id="insights-preview">
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
            <FAQSection />

            <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
              <Footer />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
