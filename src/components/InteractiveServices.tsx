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

          <div className="relative h-[200px] flex items-center justify-center z-10">
            {/* Box is now blank as requested */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
