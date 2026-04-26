export interface CaseStudy {
  id: string;
  client: string;
  challenge: string;
  result: string;
  image: string;
  videoUrl?: string;
  metrics: { label: string; value: string }[];
  industry: string;
  timeline: string;
  problem: string;
  solution: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'askin-astrology',
    client: 'Askin Astrology',
    challenge: 'Low conversions and inconsistent leads',
    result: '₹4Cr+ Revenue Generated',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&q=80',
    videoUrl: 'https://res.cloudinary.com/dtzo88csm/video/upload/v1774899653/marketing_video_yes6gn.mp4',
    metrics: [
      { label: 'Total Revenue', value: '₹4Cr+' },
      { label: 'Return on Ad Spend', value: '3.5x' },
      { label: 'Cost Per Acquisition', value: '60% Lower' },
      { label: 'Conversions', value: '2x Increase' }
    ],
    industry: 'Spiritual / E-commerce',
    timeline: '6 Months',
    problem: 'The client struggled with highly competitive ad auctions and a funnel that leaked at the checkout stage. Organic growth had plateaued, and paid acquisition was barely breaking even.',
    solution: [
      'Full funnel reconstruction with emphasis on social proof.',
      'AI-driven creative testing of astrology readings.',
      'Optimization of checkout flow using behavior analytics.',
      'Refined audience targeting using spiritual affinity layers.'
    ],
    testimonial: {
      quote: "Adibuz's team didn't just run ads; they understood my audience better than I did. The results speak for themselves.",
      author: "Prakash J.",
      role: "Founder, Askin Astrology"
    }
  },
  {
    id: 'luxe-decor',
    client: 'LuxeDecor',
    challenge: 'High competition in high-ticket luxury niche',
    result: '5.5x Average ROAS Scaled',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    videoUrl: 'https://res.cloudinary.com/dtzo88csm/video/upload/v1774898952/management_video_j9vvld.mp4',
    metrics: [
      { label: 'Avg ROAS', value: '5.5x' },
      { label: 'Annual Revenue', value: '₹12Cr+' },
      { label: 'Market Share', value: '45% Growth' },
      { label: 'LTV', value: '3.2x Increase' }
    ],
    industry: 'Home Decor',
    timeline: '12 Months',
    problem: 'Scaling high-ticket items ($2000+) was difficult due to long decision-making cycles and lack of trust in digital advertising.',
    solution: [
      'Multi-touch attribution models to track long customer journeys.',
      'Premium video storytelling focused on craftsmanship.',
      'VIP retargeting funnels for abandoned high-value carts.',
      'Concierge-style lead capture systems.'
    ],
    testimonial: {
      quote: "Finally a team that understands luxury. We are spending 3x more now because our confidence in the ROAS is absolute.",
      author: "Sarah Chen",
      role: "CEO, LuxeDecor"
    }
  },
  {
    id: 'techstart-saas',
    client: 'TechStart',
    challenge: 'Struggling to acquire B2B enterprise leads',
    result: '850+ Qualified MQLs/Month',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    videoUrl: 'https://res.cloudinary.com/dtzo88csm/video/upload/v1774897694/automation_video_eevmht.mp4',
    metrics: [
      { label: 'Monthly MQLs', value: '850+' },
      { label: 'Cost Per Lead', value: '₹1,200 Lower' },
      { label: 'Pipeline Value', value: '₹35Cr+' },
      { label: 'Retention', value: '18% Higher' }
    ],
    industry: 'SaaS / Enterprise',
    timeline: '4 Months',
    problem: 'Long sales cycles and irrelevant traffic were draining the marketing budget without delivering SQLs.',
    solution: [
      'LinkedIn-first account-based marketing (ABM).',
      'Integration of AI chatbots to qualify leads instantly.',
      'Dynamic content replacement based on visitor industry.',
      'Automated nurture sequences for medium-intent leads.'
    ],
    testimonial: {
      quote: "Our sales team is actually happy now. The quality of leads coming through is night and day compared to our previous agency.",
      author: "Michael Rodriguez",
      role: "Founder, TechStart"
    }
  }
];
