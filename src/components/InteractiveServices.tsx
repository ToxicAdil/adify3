import React, { useState, useEffect } from 'react';
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

interface ServiceNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const services: ServiceNode[] = [
  {
    id: 'strategic',
    title: 'Strategic Marketing',
    description: 'Data-driven growth plans tailored to your brand goals.',
    icon: <Target className="w-6 h-6" />,
    details: [
      'Market Analysis & Research',
      'Competitor Benchmarking',
      'Growth Roadmap Development',
      'KPI Setting & Tracking'
    ]
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Building community and engagement across all platforms.',
    icon: <Users className="w-6 h-6" />,
    details: [
      'Content Strategy & Planning',
      'Community Management',
      'Influencer Partnerships',
      'Social Analytics'
    ]
  },
  {
    id: 'ads',
    title: 'Paid Ads',
    description: 'High-converting campaigns that drive immediate ROI.',
    icon: <Zap className="w-6 h-6" />,
    details: [
      'Meta & Google Ads Management',
      'Retargeting Campaigns',
      'A/B Testing & Optimization',
      'Creative Performance Analysis'
    ]
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Custom tracking and infrastructure for scale.',
    icon: <Globe className="w-6 h-6" />,
    details: [
      'High-Performance Landing Pages',
      'E-commerce Optimization',
      'Custom API Integrations',
      'Technical SEO Setup'
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Streamlining workflows to save time and increase ROI.',
    icon: <BarChart3 className="w-6 h-6" />,
    details: [
      'Email Marketing Automation',
      'CRM Implementation',
      'Workflow Optimization',
      'Lead Nurturing Systems'
    ]
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Dominating search results with organic authority.',
    icon: <Sparkles className="w-6 h-6" />,
    details: [
      'On-Page Optimization',
      'Technical SEO Audits',
      'Content Marketing Strategy',
      'Backlink Profile Building'
    ]
  }
];

export const InteractiveServices: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!activeId && !isMobile) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.2);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeId, isMobile]);

  const activeService = services.find(s => s.id === activeId);

  return (
    <section id="services" className="py-8 relative overflow-hidden bg-[#F8FAFC]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="premium-card rounded-3xl md:rounded-[48px] p-6 md:p-12 lg:py-[80px] lg:px-[80px] overflow-hidden relative"
        >
          {/* Grid Background Effect from HeroSection */}
          <div 
            className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] bg-no-repeat bg-cover bg-center opacity-[0.2] pointer-events-none" 
            style={{ 
              filter: 'hue-rotate(260deg) brightness(0.7) contrast(1.1)', // Darker purple shift
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Purple Gradient Overlay - Darker and more prominent */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-primary/25 pointer-events-none" />

          {/* Pulsing Glowness Effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(109,40,217,0.2)_0%,_transparent_70%)] pointer-events-none z-0"
          />

          {/* Animated Light Beam */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none z-0"
          />

          <div className="text-center mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight">
                Our <span className="text-gradient">Services.</span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl font-medium">
                Explore how we help brands scale with performance-driven systems
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] opacity-60">
                <Sparkles className="w-3 h-3" />
                Click on any service to explore
              </div>
            </motion.div>
          </div>

          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center z-10">
            {/* Orbiting Lines - Hidden on mobile for clarity */}
            {!isMobile && (
              <>
                <div className="absolute w-[450px] h-[450px] border border-primary/10 rounded-full" />
                <div className="absolute w-[300px] h-[300px] border border-primary/5 rounded-full" />
              </>
            )}

            {/* Center Element */}
            <motion.div 
              animate={{ 
                scale: activeId ? 0.8 : 1,
                rotate: isMobile ? 0 : rotation * 0.5
              }}
              className="relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[radial-gradient(circle_at_center,_#6D28D9_0%,_#3A0F63_100%)] flex items-center justify-center shadow-[0_0_50px_rgba(58,15,99,0.4)]"
            >
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" />
              
              {/* Soft Glow */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-15px] rounded-full bg-[#3A0F63]/20 blur-2xl -z-10"
              />
            </motion.div>

            {/* Service Nodes */}
            {services.map((service, index) => {
              const angle = (index / services.length) * 2 * Math.PI + (isMobile ? 0 : rotation * Math.PI / 180);
              const radius = isMobile ? 140 : 225;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x,
                    y,
                    zIndex: activeId === service.id ? 50 : 10
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveId(service.id === activeId ? null : service.id)}
                  className={`absolute cursor-pointer group`}
                >
                  <div className={`
                    w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                    bg-[#3A0F63] text-white shadow-[0_8px_20px_rgba(58,15,99,0.25)]
                    group-hover:shadow-[0_12px_30px_rgba(58,15,99,0.4)]
                    ${activeId === service.id ? 'scale-110 ring-2 ring-white/20' : ''}
                  `}>
                    {service.icon}
                  </div>
                  
                  {/* Node Label */}
                  {!activeId && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap"
                    >
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#3A0F63]/60 px-2 py-1">
                        {service.title}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Expanded Service Card */}
            <AnimatePresence>
              {activeId && activeService && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="absolute z-40 w-full max-w-2xl bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 md:p-12 lg:py-[60px] lg:px-[80px] shadow-2xl shadow-[#3A0F63]/10"
                >
                  <button 
                    onClick={() => setActiveId(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#3A0F63]/10 text-slate-400 hover:text-[#3A0F63] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#3A0F63] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(58,15,99,0.25)]">
                      {activeService.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{activeService.title}</h3>
                      <p className="text-[#3A0F63] text-sm font-medium">Expert Solutions</p>
                    </div>
                  </div>

                  <div className="text-left">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {activeService.description}
                    </p>

                    <div className="space-y-3">
                      {activeService.details.map((detail, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-sm text-slate-500 font-medium group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3A0F63]/40 group-hover:bg-[#3A0F63] transition-colors" />
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-8 w-full py-4 rounded-2xl bg-[#3A0F63] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#3A0F63]/20 hover:shadow-[#3A0F63]/30 transition-all"
                  >
                    Get Started <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Decorative Elements inside the card */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
