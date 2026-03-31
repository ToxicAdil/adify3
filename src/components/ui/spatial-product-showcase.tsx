'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import {
  Rocket,
  ArrowRight,
  TrendingUp,
  Target,
  PenTool,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'left' | 'right';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: LucideIcon;
}

export interface ProfileData {
  id: ProductId;
  label: string; // Display name for the switcher
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string; // Tailwind gradient classes
    glow: string;     // Tailwind color class for accents
    ring: string;     // Tailwind border color for rings
  };
  stats: {
    status: string;
    focusLevel: number;
  };
  features: FeatureMetric[];
}

// Default Data
const PROFILE_DATA: Record<ProductId, ProfileData> = {
  left: {
    id: 'left',
    label: 'Adil',
    title: 'Adil Ali',
    description: 'Founder & Visionary behind Adify. Spearheading strategic growth, full-stack development, and data-driven marketing systems that scale brands beyond borders.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80', // Placeholder
    colors: {
      gradient: 'from-slate-900 to-black',
      glow: 'bg-black',
      ring: 'border-slate-900',
    },
    stats: { status: 'Building Systems', focusLevel: 100 },
    features: [
      { label: 'Strategy', value: 98, icon: Target },
      { label: 'Execution', value: 95, icon: TrendingUp },
    ],
  },
  right: {
    id: 'right',
    label: 'Co-Founder',
    title: 'Creative Director',
    description: 'Co-Founder & Design Lead. Crafting premium visual identities, engaging social experiences, and cohesive brand narratives that convert.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80', // Placeholder
    colors: {
      gradient: 'from-[#3A0F63] to-purple-800',
      glow: 'bg-[#3A0F63]',
      ring: 'border-[#3A0F63]',
    },
    stats: { status: 'Crafting Brands', focusLevel: 98 },
    features: [
      { label: 'Creativity', value: 99, icon: Sparkles },
      { label: 'Design', value: 96, icon: PenTool },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.2,
      filter: 'blur(15px)',
      rotate: isLeft ? -10 : 10,
      x: isLeft ? -40 : 40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
    <motion.div
      animate={{
        background: isLeft
          ? 'radial-gradient(circle at 0% 50%, rgba(58, 15, 99, 0.08), transparent 50%)'
          : 'radial-gradient(circle at 100% 50%, rgba(109, 40, 217, 0.08), transparent 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProfileVisual = ({ data, isLeft }: { data: ProfileData; isLeft: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0">
    {/* Animated Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-15%] rounded-full border-2 border-dashed opacity-50 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-[-10%] rounded-full bg-gradient-to-br ${data.colors.gradient} blur-3xl opacity-30`}
    />

    {/* Image Container */}
    <div className="relative h-64 w-64 lg:h-80 lg:w-80 rounded-full border border-slate-200/60 shadow-xl flex items-center justify-center overflow-hidden bg-white/50 backdrop-blur-md">
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center p-4"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={`${data.title}`}
            variants={ANIMATIONS.image(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-cover rounded-full shadow-lg"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Status Label */}
    <motion.div
      layout="position"
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3A0F63] bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-md">
        <span className={`h-2 w-2 rounded-full ${data.colors.glow} animate-pulse`} />
        {data.stats.status}
      </div>
    </motion.div>
  </motion.div>
);

const ProfileDetails = ({ data, isLeft }: { data: ProfileData; isLeft: boolean; key?: React.Key }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isLeft ? 'left-0 bg-[#3A0F63]' : 'right-0 bg-violet-600';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass} w-full`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-sm font-bold uppercase tracking-[0.2em] text-[#3A0F63] mb-2 bg-[#3A0F63]/10 px-3 py-1 rounded-full">
        {data.label}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-slate-500 mb-8 max-w-sm leading-relaxed text-sm md:text-base font-medium ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-6 bg-white/60 p-6 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-md">
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
              <div className={`flex items-center gap-2 text-slate-700 font-semibold`}>
                <feature.icon size={16} className="text-[#3A0F63]" /> <span>{feature.label}</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#3A0F63]">{feature.value}%</span>
            </div>
            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${barColorClass}`}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Status */}
      <motion.div variants={ANIMATIONS.item} className={`mt-6 flex items-center gap-3 text-slate-600 ${flexDirClass}`}>
        <Rocket size={18} className="text-[#3A0F63]" />
        <span className="text-sm font-bold tracking-wide">Output Level: {data.stats.focusLevel}%</span>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({ 
  activeId, 
  onToggle 
}: { 
  activeId: ProductId; 
  onToggle: (id: ProductId) => void 
}) => {
  const options = Object.values(PROFILE_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="absolute bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none">
      <motion.div layout className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            className="relative w-32 h-12 rounded-full flex items-center justify-center text-sm font-bold focus:outline-none transition-colors"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-[#3A0F63] shadow-md"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}>
              {opt.label}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function EarbudShowcase() {
  const [activeSide, setActiveSide] = useState<ProductId>('left');
  
  const currentData = PROFILE_DATA[activeSide];
  const isLeft = activeSide === 'left';

  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#faf5ff] text-slate-900 flex flex-col items-center justify-center rounded-[inherit]">
      
      <BackgroundGradient isLeft={isLeft} />

      <main className="relative z-10 w-full h-full px-6 py-12 pb-28 flex flex-col justify-center">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full ${
            isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Left Column: Visuals */}
          <ProfileVisual data={currentData} isLeft={isLeft} />

          {/* Right Column: Content */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProfileDetails 
                key={activeSide} 
                data={currentData} 
                isLeft={isLeft} 
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      <Switcher activeId={activeSide} onToggle={setActiveSide} />
    </div>
  );
}
