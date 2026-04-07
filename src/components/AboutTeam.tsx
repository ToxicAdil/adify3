import React from 'react';
import { motion } from 'motion/react';

const teamMembers = [
  {
    name: 'Adil Ali',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      '10+ years scaling digital brands.',
      'Ex-Growth Lead at top tech firms.',
      'Visionary behind Adify’s core strategy.'
    ]
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Growth',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Master of performance marketing.',
      'Managed $50M+ in ad spend.',
      'Data obsessive optimization expert.'
    ]
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Award-winning UI/UX designer.',
      'Crafts high-converting experiences.',
      'Blends aesthetic with psychology.'
    ]
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Full-stack engineering maestro.',
      'Builds lightning-fast web apps.',
      'Expert in Next.js & modern stacks.'
    ]
  },
  {
    name: 'David Kim',
    role: 'Head of SEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Decade of organic traffic scaling.',
      'Technical & content SEO master.',
      'Drives sustainable, compounding ROI.'
    ]
  }
];

const AboutTeam = () => {
  return (
    <section 
      className="w-full py-6 flex flex-col items-center relative overflow-hidden px-5 md:px-[37px] bg-transparent"
    >
      {/* Texture Overlay */}

      <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Hero Header */}
        <motion.h2
          className="text-slate-900 text-3xl md:text-5xl lg:text-6xl font-[900] tracking-tight text-center mb-8 md:mb-12 mt-10 select-none uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          OUR TEAM
        </motion.h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-6 w-full">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

const TeamCard: React.FC<{ member: any, index: number }> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative w-full rounded-[18px] border border-white/20 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-white/40"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f3e8ff 40%, #a855f7 75%, #3a0f63 100%)'
      }}
    >
      {/* Texture Overlay to create the painted/wavy grain effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none z-0" />

      {/* Image Container with CSS Mask for perfect blending into the gradient */}
      <div 
        className="relative w-full aspect-[4/5] overflow-hidden z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      >
        <img 
          src={member.image} 
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
        />
        
        {/* Hover Inner Purple Glow over the image */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0)] group-hover:shadow-[inset_0_0_40px_rgba(58,15,99,0.3)] transition-all duration-500 pointer-events-none z-20" />
      </div>

      {/* Content Container */}
      <div className="p-5 md:p-6 relative z-30 flex flex-col mt-[-20px]">
        <h3 className="text-white text-[18px] lg:text-[20px] font-bold tracking-tight mb-0.5" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>{member.name}</h3>
        {/* Using a legible light purple for the accent over dark backgrounds */}
        <p className="text-purple-200 text-[10px] font-bold uppercase tracking-widest mb-4 block">
          {member.role}
        </p>

        <ul className="space-y-2.5">
          {member.bullets.map((bullet: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 mr-2.5 flex-shrink-0 shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
              <span className="text-purple-50 text-[12px] leading-[1.4] font-medium">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AboutTeam;
