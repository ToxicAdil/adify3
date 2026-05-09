import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Insight } from '../../services/insightService';

export function FeaturedInsight({ insight }: { insight: Insight }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(insight.created_at));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-700"
    >
      <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-[400px] lg:min-h-[500px]">
        
        {/* Image Section */}
        <div className="relative aspect-video lg:aspect-auto overflow-hidden">
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
          <img 
            src={insight.featured_image} 
            alt={insight.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/60 lg:from-slate-900/30 to-transparent pointer-events-none" />
          
          {insight.category && (
            <div className="absolute top-6 left-6 z-30">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-[#3A0F63] text-[12px] font-bold tracking-widest uppercase rounded-full shadow-lg">
                {insight.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 relative z-10 bg-white lg:bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-[14px] font-medium text-slate-500 mb-6 uppercase tracking-wider">
            <span>{formattedDate}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {insight.read_time} MIN READ</span>
          </div>

          <Link to={`/insights/${insight.slug}`} className="group-hover:text-[#3A0F63] transition-colors focus:outline-none">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 mb-6 leading-[1.15] tracking-tight">
              {insight.title}
              <span className="absolute inset-0 z-10" aria-hidden="true" />
            </h2>
          </Link>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl">
            {insight.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                 {/* Using a placeholder avatar for now based on author name initials */}
                 <span className="text-sm font-bold text-slate-500">{insight.author_name.charAt(0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-slate-900">{insight.author_name}</span>
                <span className="text-[12px] font-medium text-slate-500">Adibuz Team</span>
              </div>
            </div>

            <span className="hidden sm:flex items-center text-white bg-[#3A0F63] px-6 py-3 rounded-full font-semibold text-[14px] shadow-lg group-hover:bg-[#4d1482] transition-all duration-300 group-hover:scale-105">
              Read Article <ArrowRight className="w-4 h-4 ml-2" />
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
