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

import { UniqueAccordion } from './ui/interactive-accordion';
import OrbitingServices from './ui/orbiting-skills';

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
          className="premium-card rounded-3xl md:rounded-[32px] overflow-hidden relative"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between min-h-[500px] md:min-h-[600px] relative z-10 px-6 md:px-12 py-12 md:py-16">
            {/* Left Side: Interactive Accordion Content */}
            <div className="w-full lg:w-[45%] lg:pl-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
                    Our <span className="text-gradient">Services.</span>
                  </h2>
                  <p className="text-slate-600 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                    Transforming brands into industry leaders with data-driven creative and technical systems.
                  </p>
                </div>
                
                <UniqueAccordion />
              </motion.div>
            </div>

            {/* Right Side: Circular Animation */}
            <div className="w-full lg:w-[55%] flex justify-center lg:justify-end mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <OrbitingServices />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
