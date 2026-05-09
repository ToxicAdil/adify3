"use client";

import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Defer Three.js loading — only load after page is idle
const ThreeGlobe = lazy(() => 
  new Promise<{ default: React.ComponentType<{ radius: number; speed: number }> }>((resolve) => {
    // Wait for idle or 4 seconds, whichever comes first
    const load = () => {
      import("./globe-three-inner").then(m => resolve({ default: m.ThreeGlobeInner }));
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(load, { timeout: 4000 });
    } else {
      setTimeout(load, 3000);
    }
  })
);

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * CSS-only wireframe globe that loads instantly.
 * Three.js version loads lazily after page is interactive.
 */
const CSSGlobe = () => (
  <div className="css-globe-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
    {/* Main sphere wireframe */}
    <div className="css-globe" />
  </div>
);

const DotGlobeHero = React.forwardRef<HTMLDivElement, DotGlobeHeroProps>(
  ({ rotationSpeed = 0.005, globeRadius = 1.3, className, children, ...props }, ref) => {
    const [showThree, setShowThree] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // After mount, schedule Three.js loading
    useEffect(() => {
      const timer = setTimeout(() => setShowThree(true), 100);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        {/* Globe Container */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.10] md:opacity-[0.18]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          style={{ willChange: 'opacity' }}
        >
          {showThree ? (
            <Suspense fallback={<CSSGlobe />}>
              <ThreeGlobe radius={globeRadius} speed={rotationSpeed} />
            </Suspense>
          ) : (
            <CSSGlobe />
          )}
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-[37px] flex flex-col items-center justify-center text-center">
          {children}
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
