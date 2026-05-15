import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { CASE_STUDIES } from '@/data/case-studies';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Zap, 
  Target, 
  Clock, 
  Building2,
  TrendingUp,
  Play
} from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import { FloatingPurpleShapes } from '@/components/ui/floating-purple-shapes';
import { SEO } from '@/components/SEO';

const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const study = CASE_STUDIES.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaff]">
        <div className="text-center space-y-6 px-6">
          <h1 className="text-4xl font-bold text-slate-900">Case Study Not Found</h1>
          <p className="text-slate-500 max-w-md mx-auto">
            The requested case study could not be found. Please check the URL or head back to the main list.
          </p>
          <Link to="/work" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:gap-4 transition-all">
            <ArrowLeft className="w-5 h-5" /> Back to Work
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white relative overflow-hidden">
      <SEO 
        title={`${study.client} | Adibuz Case Study`}
        description={study.challenge}
      />
      <SimpleHeader />
      <FloatingPurpleShapes />

      {/* Hero / Header Section */}
      <section className="pt-40 pb-20 relative z-10 border-b border-slate-100">
        <div className="container-custom px-[37px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
            <div className="space-y-8 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-primary font-bold text-sm tracking-widest uppercase"
              >
                <Link to="/work" className="hover:opacity-60 transition-opacity">WORK</Link>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-slate-500">{study.client}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.05]"
              >
                {study.client}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl md:text-3xl text-slate-500 font-medium tracking-tight max-w-3xl leading-[1.35]"
              >
                {study.challenge}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap lg:flex-col gap-6 lg:gap-8 pb-4"
            >
              {[
                { label: 'Industry', value: study.industry, icon: Building2 },
                { label: 'Timeline', value: study.timeline, icon: Clock }
              ].map((info, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{info.label}</p>
                    <p className="text-lg font-bold text-slate-900">{info.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 relative z-10">
        <div className="container-custom px-[37px]">
          <div className="grid lg:grid-cols-12 gap-20">
            {/* Project Overview Column */}
            <div className="lg:col-span-12 space-y-24">
              
              {/* Problem & Solution Group */}
              <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">The Problem</h2>
                    <div className="w-20 h-1.5 rounded-full bg-primary/20" />
                  </div>
                  <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                    {study.problem}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">What We Did</h2>
                    <div className="w-20 h-1.5 rounded-full bg-primary/20" />
                  </div>
                  <ul className="space-y-6">
                    {study.solution.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 className="w-7 h-7 text-emerald-500 mt-1 flex-shrink-0" />
                        <span className="text-xl text-slate-700 font-bold leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* High Impact Results Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="premium-card rounded-[48px] overflow-hidden p-12 md:p-20 bg-slate-900 text-white shadow-2xl"
              >
                <div className="flex flex-col items-center text-center space-y-12 relative z-10">
                  <div className="space-y-4">
                    <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">Key Performance Metrics</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">Exponential <span className="text-primary">Impact.</span></h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 w-full pt-8">
                    {study.metrics.map((m, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="space-y-3"
                      >
                        <p className="text-5xl md:text-7xl font-black tracking-tight text-white">{m.value}</p>
                        <p className="text-sm md:text-base font-bold uppercase tracking-widest text-slate-400">{m.label}</p>
                        <div className="h-1 w-12 bg-primary/30 mx-auto rounded-full mt-4" />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />
              </motion.div>

              {/* Proof Section (Media) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">The Visual Proof</h2>
                  <p className="text-slate-500 font-medium text-lg">Peek inside the systems that delivered these results.</p>
                </div>
                
                <div className="relative aspect-video rounded-[48px] overflow-hidden shadow-2xl bg-white border border-slate-100 p-2 md:p-6 ring-1 ring-black/5">
                  <div className="relative w-full h-full rounded-[32px] overflow-hidden group">
                    {study.videoUrl ? (
                      <video
                        src={study.videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={study.image} alt={study.client} width={1200} height={750} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    )}
                    
                    {/* Brand Watermark */}
                    <div className="absolute bottom-10 left-10 z-20 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                      <span className="text-white font-black text-xs uppercase tracking-widest drop-shadow-md">Verified Results</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial Section */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto py-20 px-12 rounded-[56px] bg-primary/[0.03] border border-primary/10 relative overflow-hidden text-center space-y-10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
                  <BarChart3 className="w-8 h-8" />
                </div>
                
                <blockquote className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                   "{study.testimonial.quote}"
                </blockquote>
                
                <div className="space-y-1">
                  <p className="text-2xl font-black text-slate-900">{study.testimonial.author}</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#3A0F63]">{study.testimonial.role}</p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-3xl opacity-50 rounded-full" />
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 blur-3xl opacity-50 rounded-full" />
              </motion.div>

              {/* Final CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center py-20 bg-slate-900 rounded-[56px] space-y-12 shadow-2xl relative overflow-hidden"
              >
                <div className="relative z-10 space-y-6">
                  <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Want results like this?</h2>
                  <p className="text-xl text-slate-400 font-medium max-w-xl mx-auto">Take the first step towards exponential growth. Reach out today for a free strategy session.</p>
                  
                  <div className="pt-6">
                    <MagneticButton>
                      <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto shadow-2xl shadow-white/10">
                        Book a Strategy Call <ArrowRight className="w-6 h-6" />
                      </button>
                    </MagneticButton>
                  </div>
                </div>
                
                {/* Intense Purple Glow */}
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-primary/20 blur-[180px] rounded-full pointer-events-none" />
              </motion.div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                 <Link to="/work" className="flex items-center gap-3 text-slate-500 font-bold uppercase tracking-widest hover:text-primary transition-colors hover:gap-5 transition-all">
                   <ArrowLeft className="w-6 h-6" /> View All Work
                 </Link>
                 
                 <div className="flex items-center gap-4">
                   <p className="text-xs font-black uppercase text-slate-300 tracking-widest">Share Project</p>
                   {/* Icons would go here */}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyDetailPage;
