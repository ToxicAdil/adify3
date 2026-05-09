import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // The main app wrapper — only hide opacity, NO y-offset to prevent shake/jump
    const mainWrapper = document.getElementById('main-app-content');
    if (mainWrapper) {
      gsap.set(mainWrapper, { opacity: 0 });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setIsDone(true);
          if (onComplete) onComplete();
        }
      });

      // 1. Fade in logo
      tl.to('.adibuz-logo-main', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.2);

      // 2. Tagline wrapper slide up
      tl.to('.tagline-text', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.8);

      // 3. Tagline typewriter effect
      tl.to('.tagline-char', {
        opacity: 1,
        duration: 0.05,
        stagger: 0.04,
        ease: 'none'
      }, 0.8);

      // 4. Hold briefly, then smoothly fade out the entire preloader
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 3.0);

      // 5. Fade in main content simultaneously — no transform to avoid globe misalignment
      if (mainWrapper) {
        tl.to(mainWrapper, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, 3.0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isDone) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] pointer-events-none select-none">
      {/* SPLIT HALVES */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#f0eeff] to-[#f6f4ff] top-half origin-top will-change-transform" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#f6f4ff] to-[#faf8ff] bottom-half origin-bottom will-change-transform" />

      {/* CONTENT LAYER */}
      <div className="absolute inset-0 flex flex-col items-center justify-center content-layer">
        


        {/* Central Logo & Text */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="overflow-hidden pb-4">
            <img 
              src="/adibuz-logo.png" 
              alt="Adibuz Logo" 
              className="h-16 sm:h-20 md:h-28 lg:h-32 w-auto object-contain opacity-0 translate-y-12 adibuz-logo-main drop-shadow-xl"
            />
          </div>

          <div className="mt-6 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#7c3aed]/80 translate-y-4 tagline-text flex flex-wrap justify-center whitespace-pre max-w-[90vw]">
            {"Elevating Your Digital Presence".split("").map((char, i) => (
              <span key={i} className="opacity-0 tagline-char">
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
