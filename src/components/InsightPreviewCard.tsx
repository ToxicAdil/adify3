import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useInsights } from '../hooks/useInsights';

export const InsightPreviewCard: React.FC = () => {
  const { insights, loading } = useInsights();
  const featuredInsight = insights.find(i => i.is_featured) || insights[0];

  return (
    <section id="insights-preview" className="py-12 md:py-20 relative z-10">
      <div className="container-custom px-5 md:px-[37px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group max-w-6xl mx-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute -inset-4 md:-inset-8 bg-purple-400/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

          <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-14 lg:p-16 shadow-[0_20px_80px_-20px_rgba(58,15,99,0.08)] border border-slate-100/60 flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-stretch relative overflow-hidden">
            
            {/* LEFT SIDE (FEATURED BLOG) */}
            <div className="w-full md:w-5/12 relative z-10 flex items-center">
              {loading || !featuredInsight ? (
                <div className="w-full aspect-[4/5] rounded-[32px] bg-slate-100 animate-pulse border border-slate-200/50" />
              ) : (
                <Link to={`/insights/${featuredInsight.slug}`} className="group/card w-full block relative rounded-[32px] overflow-hidden bg-white border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(58,15,99,0.1)] hover:shadow-[0_20px_60px_-15px_rgba(58,15,99,0.2)] transition-all duration-500">
                  <div className="aspect-[16/10] overflow-hidden relative bg-slate-50">
                    <img 
                      src={featuredInsight.featured_image} 
                      alt={featuredInsight.title} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-80" />
                    
                    {/* Category Tag */}
                    {featuredInsight.category && (
                      <div className="absolute top-5 left-5 z-20">
                        <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#8B5CF6] text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                          {featuredInsight.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 md:p-8 bg-white relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-wider">
                      <span>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(featuredInsight.created_at))}</span>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredInsight.read_time} MIN READ</span>
                    </div>
                    
                    <h3 className="text-xl md:text-[22px] font-bold text-slate-900 mb-4 leading-[1.3] group-hover/card:text-[#8B5CF6] transition-colors tracking-tight">
                      {featuredInsight.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center text-[#8B5CF6] font-bold text-[13px] tracking-wide">
                      Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover/card:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* RIGHT SIDE (MASTER THE MARKET) */}
            <div className="w-full md:w-7/12 space-y-8 relative z-10 flex flex-col justify-center pl-0 md:pl-8">
              <h2 className="text-5xl md:text-6xl lg:text-[72px] font-black text-slate-900 tracking-tight leading-[1.05]">
                Master the <br />
                <span className="text-[#8B5CF6]">market.</span>
              </h2>

              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Explore our library of premium editorial content designed to help you build, scale, and automate modern digital brands with precision.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <MagneticButton>
                  <Link 
                    to="/insights"
                    className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-base btn-premium flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Read Insights <ArrowRight className="w-5 h-5" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};
