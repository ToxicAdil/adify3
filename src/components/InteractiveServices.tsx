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

  return (
    <section id="services" className="py-8 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-12 lg:py-[40px] lg:px-[60px] overflow-hidden relative"
        >

          <div className="text-center mb-8 -mt-6 relative z-10 pointer-events-none">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full mt-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative backdrop-blur-2xl border border-slate-200 transition-all duration-300 ease-out flex flex-col bg-white/80 p-6 md:p-8 rounded-3xl cursor-pointer group ${activeId === service.id ? 'ring-2 ring-primary/20 bg-white/95 shadow-xl' : 'hover:shadow-lg hover:-translate-y-1'}`}
                onClick={() => setActiveId(service.id === activeId ? null : service.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${activeId === service.id ? 'bg-[#3A0F63] text-white shadow-md' : 'bg-[#f5f0ff] text-[#3A0F63] group-hover:bg-[#3A0F63] group-hover:text-white'}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{service.title}</h3>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-2">
                  {service.description}
                </p>

                <AnimatePresence>
                  {activeId === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-2 border-t border-slate-100/80 space-y-3">
                        {service.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm text-slate-500 font-medium group/detail">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3A0F63]/40 mt-1.5 group-hover/detail:bg-[#3A0F63] transition-colors shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
