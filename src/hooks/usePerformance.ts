/**
 * Performance detection & adaptive rendering utilities.
 * Used across the About page to reduce GPU/CPU load on weaker devices.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

interface PerformanceProfile {
  tier: PerformanceTier;
  isMobile: boolean;
  isLowEnd: boolean;
  reducedMotion: boolean;
  /** Max FPS cap for animations */
  maxFps: number;
  /** Particle count multiplier (0-1) */
  particleMultiplier: number;
  /** Whether to enable heavy effects (blur, glow, shadows) */
  enableHeavyEffects: boolean;
  /** Whether to load the Spline 3D scene */
  enableSpline: boolean;
  /** Device pixel ratio to use (capped for perf) */
  dpr: number;
}

/**
 * Detect device performance tier based on hardware signals.
 */
function detectPerformanceTier(): PerformanceTier {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'low';

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;

  // Check device memory (Chrome only)
  const memory = (navigator as any).deviceMemory || 4;

  // Check if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

  // Simple scoring system
  let score = 0;
  score += cores >= 8 ? 3 : cores >= 4 ? 2 : 1;
  score += memory >= 8 ? 3 : memory >= 4 ? 2 : 1;
  score += isMobile ? 0 : 2;
  score += window.devicePixelRatio > 2 ? 0 : 1; // High DPR = more GPU work

  if (score >= 7) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}

/**
 * Hook: Returns a performance profile for adaptive rendering.
 */
export function usePerformanceProfile(): PerformanceProfile {
  const [profile, setProfile] = useState<PerformanceProfile>(() => {
    const isMobile = typeof window !== 'undefined' && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    );

    return {
      tier: 'high',
      isMobile,
      isLowEnd: false,
      reducedMotion: false,
      maxFps: 60,
      particleMultiplier: 1,
      enableHeavyEffects: true,
      enableSpline: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    };
  });

  useEffect(() => {
    const tier = detectPerformanceTier();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const profiles: Record<PerformanceTier, Omit<PerformanceProfile, 'tier' | 'isMobile' | 'reducedMotion'>> = {
      high: {
        isLowEnd: false,
        maxFps: 60,
        particleMultiplier: 1,
        enableHeavyEffects: true,
        enableSpline: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      },
      medium: {
        isLowEnd: false,
        maxFps: isMobile ? 30 : 45,
        particleMultiplier: isMobile ? 0.3 : 0.5,
        enableHeavyEffects: !isMobile,
        enableSpline: true,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      },
      low: {
        isLowEnd: true,
        maxFps: 30,
        particleMultiplier: 0.15,
        enableHeavyEffects: false,
        enableSpline: false, // Show static fallback
        dpr: 1,
      },
    };

    setProfile({
      tier,
      isMobile,
      reducedMotion,
      ...profiles[tier],
    });
  }, []);

  return profile;
}

/**
 * Hook: IntersectionObserver-based visibility tracking.
 * Returns [ref, isVisible] - pauses work when element scrolls out of view.
 */
export function useVisibility<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0.01, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * Hook: FPS-throttled requestAnimationFrame.
 * Automatically pauses when `active` is false.
 */
export function useThrottledRAF(
  callback: (deltaTime: number) => void,
  maxFps: number,
  active: boolean
) {
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;

    const interval = 1000 / maxFps;

    const loop = (time: number) => {
      const delta = time - lastTimeRef.current;
      if (delta >= interval) {
        lastTimeRef.current = time - (delta % interval);
        callbackRef.current(delta);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [maxFps, active]);
}
