import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Insight } from '../../services/insightService';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  insight: Insight;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(insight.created_at));

  return (
    <div
      className="group relative flex flex-col h-full bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.06),_0_10px_30px_rgba(58,15,99,0.08)] transition-all duration-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        <img 
          src={insight.featured_image} 
          alt={insight.title}
          loading="lazy"
          className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {insight.category && (
          <div className="absolute top-4 left-4 z-30">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#3A0F63] text-[11px] font-bold tracking-wider uppercase rounded-full shadow-sm">
              {insight.category.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 sm:p-8">
        <div className="flex items-center gap-4 text-[13px] font-medium text-slate-500 mb-4">
          <span>{formattedDate}</span>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {insight.read_time} min read</span>
        </div>

        <Link to={`/insights/${insight.slug}`} className="group-hover:text-[#3A0F63] transition-colors focus:outline-none">
          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-[1.3] line-clamp-2">
            {insight.title}
            <span className="absolute inset-0 z-10" aria-hidden="true" />
          </h3>
        </Link>
        
        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3 text-[15px] flex-1">
          {insight.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[14px] font-semibold text-slate-900">
            {insight.author_name}
          </span>
          <span className="flex items-center text-[#3A0F63] font-semibold text-[13px] group-hover:translate-x-1 transition-transform duration-300">
            Read Article <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </div>
    </div>
  );
}
