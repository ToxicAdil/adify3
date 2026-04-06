"use client"
import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Users, 
  Zap, 
  Globe, 
  BarChart3, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

// --- Type Definitions ---
type ServiceType = 'strategic' | 'social' | 'ads' | 'web' | 'automation' | 'seo';

interface ServiceNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

const services: ServiceNode[] = [
  {
    id: 'strategic',
    title: 'Strategic Marketing',
    description: 'Data-driven growth plans tailored to your brand goals.',
    icon: <Target className="w-6 h-6" />,
    color: '#E34F26',
    details: ['Market Analysis', 'Competitor Benchmarking', 'Growth Roadmap', 'KPI Tracking']
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Building community and engagement across all platforms.',
    icon: <Users className="w-6 h-6" />,
    color: '#1572B6',
    details: ['Content Strategy', 'Community Management', 'Influencer Partnerships', 'Social Analytics']
  },
  {
    id: 'ads',
    title: 'Paid Ads',
    description: 'High-converting campaigns that drive immediate ROI.',
    icon: <Zap className="w-6 h-6" />,
    color: '#F7DF1E',
    details: ['Meta & Google Ads', 'Retargeting', 'A/B Testing', 'Performance Analysis']
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Custom tracking and infrastructure for scale.',
    icon: <Globe className="w-6 h-6" />,
    color: '#61DAFB',
    details: ['Landing Pages', 'E-commerce', 'API Integrations', 'Technical SEO']
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Streamlining workflows to save time and increase ROI.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: '#339933',
    details: ['Email Marketing', 'CRM Implementation', 'Workflow Optimization', 'Lead Nurturing']
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Dominating search results with organic authority.',
    icon: <Sparkles className="w-6 h-6" />,
    color: '#06B6D4',
    details: ['On-Page Optimization', 'Technical Audits', 'Content Strategy', 'Backlink Building']
  }
];

type GlowColor = 'cyan' | 'purple';

interface ServiceConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  serviceType: ServiceType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingServiceProps {
  config: ServiceConfig;
  angle: number;
  onClick: (id: string) => void;
  isActive: boolean;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Icons Record using Lucide ---
const serviceIcons: Record<ServiceType, { component: React.ElementType; color: string }> = {
  strategic: { component: Target, color: '#E34F26' },
  social: { component: Users, color: '#1572B6' },
  ads: { component: Zap, color: '#F7DF1E' },
  web: { component: Globe, color: '#61DAFB' },
  automation: { component: BarChart3, color: '#339933' },
  seo: { component: Sparkles, color: '#06B6D4' }
};

interface OrbitingIconProps {
  config: typeof servicesConfigBase[0];
  isPaused: boolean;
  onClick: (id: string) => void;
  isActive: boolean;
}

// --- Memoized Icon Component ---
const ServiceIcon = memo(({ type }: { type: ServiceType }) => {
  const Icon = serviceIcons[type]?.component;
  const color = serviceIcons[type]?.color;
  return Icon ? <Icon className="w-full h-full" style={{ color }} /> : null;
});
ServiceIcon.displayName = 'ServiceIcon';

// --- Configuration for the Orbiting Services ---
// Base orbit radii — will be scaled dynamically based on screen size
const servicesConfigBase = [
  // Inner Orbit
  { id: 'strategic', orbitIndex: 0, size: 36, speed: 0.8, serviceType: 'strategic' as ServiceType, phaseShift: 0, glowColor: 'cyan' as GlowColor, label: 'Strategic Marketing' },
  { id: 'social', orbitIndex: 0, size: 36, speed: 0.8, serviceType: 'social' as ServiceType, phaseShift: (2 * Math.PI) / 3, glowColor: 'cyan' as GlowColor, label: 'Social Media' },
  { id: 'ads', orbitIndex: 0, size: 36, speed: 0.8, serviceType: 'ads' as ServiceType, phaseShift: (4 * Math.PI) / 3, glowColor: 'cyan' as GlowColor, label: 'Paid Ads' },
  // Outer Orbit
  { id: 'web', orbitIndex: 1, size: 40, speed: -0.5, serviceType: 'web' as ServiceType, phaseShift: 0, glowColor: 'purple' as GlowColor, label: 'Web Development' },
  { id: 'automation', orbitIndex: 1, size: 40, speed: -0.5, serviceType: 'automation' as ServiceType, phaseShift: (2 * Math.PI) / 3, glowColor: 'purple' as GlowColor, label: 'Automation' },
  { id: 'seo', orbitIndex: 1, size: 40, speed: -0.5, serviceType: 'seo' as ServiceType, phaseShift: (4 * Math.PI) / 3, glowColor: 'purple' as GlowColor, label: 'SEO' },
];

// --- Modern Orbiting Service Component ---
const OrbitingService = memo(({ config, isPaused, onClick, isActive }: OrbitingIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, orbitIndex, size, serviceType, label, speed, phaseShift } = config;

  // Percentage-based radii relative to the parent container
  const radiusPercent = orbitIndex === 0 ? 22 : 40;
  const color = serviceIcons[serviceType]?.color;

  // Convert radians to degrees for Framer Motion
  const initialRotation = phaseShift * (180 / Math.PI);
  const rotationDirection = speed > 0 ? 1 : -1;
  // Match original speed exactly: full rotation (2 * PI) / speed
  const duration = Math.abs((2 * Math.PI) / speed);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none will-change-transform"
      animate={{
        rotate: isPaused || isActive ? initialRotation : [initialRotation, initialRotation + 360 * rotationDirection],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="absolute top-1/2 pointer-events-auto"
        style={{
          left: `${50 + radiusPercent}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: isHovered || isActive ? 50 : 10,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(id)}
      >
        <motion.div
          animate={{
            // Keep the icon upright by counter-rotating
            rotate: isPaused || isActive ? -initialRotation : [-initialRotation, -initialRotation - 360 * rotationDirection],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`
            relative w-full h-full p-2 bg-slate-900/90 backdrop-blur-sm
            rounded-full flex items-center justify-center
            transition-all duration-300 cursor-pointer border border-white/5
            ${isHovered || isActive ? 'scale-110 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
          `}
          style={{
            boxShadow: isHovered || isActive
              ? `0 0 30px ${color}40, 0 0 60px ${color}20`
              : undefined
          }}
        >
          <div className="w-full h-full p-0.5 pointer-events-none">
            <ServiceIcon type={serviceType} />
          </div>
          {isHovered && !isActive && (
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/95 backdrop-blur-sm rounded text-[9px] font-bold text-white whitespace-nowrap pointer-events-none border border-white/10 z-50 uppercase tracking-widest">
              {label}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});
OrbitingService.displayName = 'OrbitingService';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: { radius: number; glowColor?: GlowColor; animationDelay?: number }) => {
  const glowColors = {
    cyan: { primary: 'rgba(6, 182, 212, 0.4)', secondary: 'rgba(6, 182, 212, 0.2)', border: 'rgba(6, 182, 212, 0.3)' },
    purple: { primary: 'rgba(147, 51, 234, 0.4)', secondary: 'rgba(147, 51, 234, 0.2)', border: 'rgba(147, 51, 234, 0.3)' }
  };
  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${radius * 2}%`, height: `${radius * 2}%` }}
    >
      <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`, boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`, animationDuration: '4s', animationDelay: `${animationDelay}s` }} />
      <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${colors.border}`, boxShadow: `inset 0 0 20px ${colors.secondary}` }} />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingServices() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeService = services.find(s => s.id === activeId);

  return (
    <div className="w-full flex items-center justify-center py-4 md:py-8 relative overflow-visible">
      {/* 
          Aspect-ratio locked container:
          - Responsive width with a larger max-width for desktop impact
          - Aspect ratio remains 100% stable 1:1
      */}
      <div 
        className="relative w-full max-w-[500px] aspect-square flex items-center justify-center overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Core Center Pulse */}
        <div className={`w-[15%] h-[15%] bg-gradient-to-br from-slate-800 to-slate-950 rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-white/10 transition-all duration-500 ${activeId ? 'scale-75 opacity-50 blur-sm' : ''}`}>
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10 w-[60%] h-[60%]">
            <svg viewBox="0 0 24 24" fill="none" stroke="url(#orbit-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <defs>
                <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
        </div>

        {/* Orbit Paths (Percentage based) */}
        <GlowingOrbitPath radius={22} glowColor="cyan" animationDelay={0} />
        <GlowingOrbitPath radius={40} glowColor="purple" animationDelay={1.5} />

        {servicesConfigBase.map((config) => (
          <OrbitingService
            key={config.id}
            config={config}
            isPaused={isPaused}
            onClick={(id) => setActiveId(activeId === id ? null : id)}
            isActive={activeId === config.id}
          />
        ))}

        <AnimatePresence mode="wait">
          {activeId && activeService && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute z-[100] w-[calc(100%-20px)] max-w-sm bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40"
            >
              <button onClick={() => setActiveId(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: activeService.color }}>
                  {activeService.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{activeService.title}</h3>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Solutions</p>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">{activeService.description}</p>
              <div className="space-y-3 mb-8">
                {activeService.details.map((detail, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-xs text-white/70 font-medium group">
                    <div className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: activeService.color }} />
                    {detail}
                  </motion.div>
                ))}
              </div>
              <button className="w-full py-3 md:py-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-[0.98]" style={{ backgroundColor: activeService.color }}>
                Get Started <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
