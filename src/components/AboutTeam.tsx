import React from 'react';
import { motion } from 'motion/react';
import { FadeInUp, StaggerContainer, StaggerItem } from '@/lib/animations';

const teamMembers = [
  {
    name: 'Md Adil Ali',
    role: 'Founder & Growth Strategist',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Leads Adibuz\'s growth and digital strategy.',
      'Architects scalable marketing systems and brand positioning.',
      'Helps businesses build lasting digital authority.'
    ]
  },
  {
    name: 'Krish Rawat',
    role: 'Co-Founder & SEO Specialist',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Develops SEO strategies for long-term organic growth.',
      'Optimizes content structure, keywords, and search visibility.',
      'Helps brands build sustainable online authority.'
    ]
  },
  {
    name: 'Mozzamil Hussain',
    role: 'Brand & Creative Designer',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Creates modern visual identities and marketing creatives.',
      'Focused on clean UI/UX and high-converting brand experiences.',
      'Combines design strategy with digital storytelling.'
    ]
  },
  {
    name: 'Deepak Rawat',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Builds fast, scalable, and modern digital platforms.',
      'Specializes in responsive frontend and backend integrations.',
      'Focused on performance, functionality, and clean architecture.'
    ]
  },
  {
    name: 'Dev Rawat',
    role: 'Performance Marketing Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Manages paid advertising and campaign optimization.',
      'Focused on improving conversions and customer acquisition.',
      'Operates across Meta Ads, Google Ads, and analytics systems.'
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
        <FadeInUp>
          <h2 className="text-slate-900 text-3xl md:text-5xl lg:text-6xl font-[900] tracking-tight text-center mb-8 md:mb-12 mt-10 select-none uppercase">
            OUR TEAM
          </h2>
        </FadeInUp>

        {/* Team Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-6 w-full">
          {teamMembers.map((member, index) => (
            <StaggerItem key={index}>
              <TeamCard member={member} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        
      </div>
    </section>
  );
};

const TeamCard: React.FC<{ member: any, index: number }> = ({ member, index }) => {
  return (
    <div
      className="group relative w-full h-full bg-white rounded-[18px] border border-slate-200/50 shadow-sm overflow-hidden transition-all duration-300 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Soft Blurred Gradient SaaS Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base light color at top */}
        <div className="absolute inset-0 bg-white" />
        {/* Smooth blur transition */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent via-[#c084fc]/30 to-[#3A0F63] opacity-90 blur-[30px]" />
        {/* Deep purple base so text is totally legible */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-[#3A0F63]/80 to-[#22093a]" />
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 z-10">
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] z-10 pointer-events-none" />
        
        <img 
          src={member.image} 
          alt={member.name}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
        />
        
        {/* Gradient Fade flowing into the purple bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#3A0F63]/80 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="p-5 md:p-6 relative z-30 flex flex-col">
        <h3 className="text-white text-[18px] lg:text-[20px] font-bold tracking-tight mb-0.5">{member.name}</h3>
        <p className="text-[#e9d5ff] text-[10px] font-bold uppercase tracking-widest mb-4 block">
          {member.role}
        </p>

        <ul className="space-y-2.5">
          {member.bullets.map((bullet: string, i: number) => (
            <li key={i} className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 mr-2.5 flex-shrink-0" />
              <span className="text-purple-100/80 text-[12px] leading-[1.4] font-medium">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutTeam;
