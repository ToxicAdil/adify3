"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { lazy, Suspense } from "react";

// Detect mobile once at module level
const isMobileDevice =
  typeof window !== "undefined" &&
  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
    window.innerWidth < 768);

// Defer Three.js loading — only on desktop, only after idle
const ThreeGlobe = !isMobileDevice
  ? lazy(
      () =>
        new Promise<{ default: React.ComponentType<{ radius: number; speed: number }> }>(
          (resolve) => {
            const load = () => {
              import("./globe-three-inner").then((m) =>
                resolve({ default: m.ThreeGlobeInner })
              );
            };
            // Increase timeout: give LCP a chance to complete first
            if ("requestIdleCallback" in window) {
              (window as any).requestIdleCallback(load, { timeout: 6000 });
            } else {
              setTimeout(load, 5000);
            }
          }
        )
    )
  : null;

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Pure-CSS animated background shown while Three.js loads (or permanently on mobile).
 * Zero JS cost — all GPU-composited CSS animations.
 */
const CSSGlobe = () => (
  <div
    className="css-globe-container"
    style={{ width: "100%", height: "100%", position: "relative" }}
    aria-hidden="true"
  >
    <div className="css-globe" />
  </div>
);

const DotGlobeHero = React.forwardRef<HTMLDivElement, DotGlobeHeroProps>(
  ({ rotationSpeed = 0.005, globeRadius = 1.3, className, children, ...props }, ref) => {
    // On mobile, never attempt to load Three.js
    const [showThree, setShowThree] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isMobileDevice) return; // Never show Three on mobile
      // Small delay to let React paint first, then schedule Three.js
      const timer = setTimeout(() => setShowThree(true), 200);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        {/* Globe Container — opacity 0.10 on mobile, 0.18 on desktop */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.10] md:opacity-[0.18]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          style={{ willChange: "opacity" }}
          aria-hidden="true"
        >
          {/* Mobile: always CSS globe. Desktop: Three.js after idle */}
          {!isMobileDevice && showThree && ThreeGlobe ? (
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
