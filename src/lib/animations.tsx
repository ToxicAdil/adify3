import { motion, Variants, useReducedMotion } from 'motion/react';
import React, { forwardRef } from 'react';

// ============================================================================
// PREMIUM ANIMATION VARIANTS
// ============================================================================

export const premiumEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: premiumEasing },
  },
};

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const scaleFadeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: premiumEasing },
  },
};

export const floatVariant: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// REUSABLE COMPONENTS
// All components respect prefers-reduced-motion — animations are skipped
// (instant visible state) for users who prefer reduced motion.
// ============================================================================

/**
 * A standard, high-performance Fade In Up entrance.
 * Triggers ONLY when entering viewport exactly once.
 * Skips animation if user prefers reduced motion.
 */
export const FadeInUp = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; delay?: number }
>(({ children, className, delay = 0 }, ref) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      variants={shouldReduce ? undefined : fadeInUpVariant}
      initial={shouldReduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      transition={shouldReduce ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
});
FadeInUp.displayName = 'FadeInUp';

/**
 * A container to wrap items for a staggered entrance sequence.
 */
export const StaggerContainer = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; delay?: number }
>(({ children, className, delay = 0 }, ref) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      variants={shouldReduce ? undefined : staggerContainerVariant}
      initial={shouldReduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      transition={shouldReduce ? undefined : { delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
});
StaggerContainer.displayName = 'StaggerContainer';

/**
 * An item inside a StaggerContainer.
 */
export const StaggerItem = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <motion.div ref={ref} variants={fadeInUpVariant} className={className}>
      {children}
    </motion.div>
  );
});
StaggerItem.displayName = 'StaggerItem';

/**
 * A scale-and-fade in entrance for media/video containers.
 */
export const ScaleInView = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; delay?: number }
>(({ children, className, delay = 0 }, ref) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      variants={shouldReduce ? undefined : scaleFadeVariant}
      initial={shouldReduce ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={className}
      transition={shouldReduce ? undefined : { delay }}
    >
      {children}
    </motion.div>
  );
});
ScaleInView.displayName = 'ScaleInView';
