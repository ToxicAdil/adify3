import { motion, Variants } from 'motion/react';
import React, { forwardRef } from 'react';

// ============================================================================
// PREMIUM ANIMATION VARIANTS
// ============================================================================

export const premiumEasing: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Refined smooth ease-out for better responsiveness

export const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 }, // Reduced travel distance for a less 'floaty', more stable feel
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEasing } // Snappier duration
  }
};

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for better flow
      delayChildren: 0.05
    }
  }
};

export const scaleFadeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.98 }, // Subtle scale instead of 0.95
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: premiumEasing }
  }
};

export const floatVariant: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: 'easeInOut'
    }
  }
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================

/**
 * A standard, high-performance Fade In Up entrance.
 * Triggers ONLY when entering viewport exactly once.
 */
export const FadeInUp = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>(({ children, className, delay = 0 }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }} // Replaced 'amount' with margin for reliable triggering on small laptop screens
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
});
FadeInUp.displayName = 'FadeInUp';

/**
 * A container to wrap items for a staggered entrance sequence.
 */
export const StaggerContainer = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>(({ children, className, delay = 0 }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
});
StaggerContainer.displayName = 'StaggerContainer';

/**
 * An item inside a StaggerContainer that automatically maps to the parent's variants.
 */
export const StaggerItem = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
}>(({ children, className }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
});
StaggerItem.displayName = 'StaggerItem';

/**
 * A scale-and-fade in entrance for media/video containers.
 */
export const ScaleInView = forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>(({ children, className, delay = 0 }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={scaleFadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
});
ScaleInView.displayName = 'ScaleInView';
