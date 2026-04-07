import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import { CASE_STUDIES } from '@/data/case-studies';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import { FloatingPurpleShapes } from '@/components/ui/floating-purple-shapes';
import { GradientBackground } from '@/components/ui/gradient-backgrounds';

const WorkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white relative overflow-hidden">
      <SimpleHeader />
      <FloatingPurpleShapes />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-40 pb-12 md:pb-20 relative z-10">
        <GradientBackground variant="bottom" className="opacity-40" />
        <div className="container-custom px-5 md:px-[37px]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
            >
              Case Studies
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Real Results. <br />
              <span className="text-gradient">Real Growth.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Explore how we’ve helped brands scale revenue, optimize performance, and build systems that drive consistent growth.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust Section (Stats) */}
      <section className="py-12 border-y border-slate-100 bg-white/30 backdrop-blur-sm relative z-10">
        <div className="container-custom px-5 md:px-[37px]">
          <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-4 items-center">
            {[
              { label: "₹50Cr+ Ad Spend Managed", icon: CheckCircle2 },
              { label: "500+ Clients Served", icon: CheckCircle2 },
              { label: "5+ Years Experience", icon: CheckCircle2 }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <stat.icon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-800 font-bold text-sm sm:text-lg md:text-xl tracking-tight">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container-custom px-5 md:px-[37px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {CASE_STUDIES.map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Sample Website Section */}
      <section className="py-12 md:py-24 relative z-10 bg-white/30 backdrop-blur-sm border-y border-slate-100">
        <div className="container-custom px-5 md:px-[37px]">
          <div className="text-center space-y-4 mb-10 md:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight">What We Can <span className="text-gradient">Build For You</span></h2>
            <p className="text-sm sm:text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Explore sample websites designed for different industries — giving you a clear idea of what your brand could look like.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
          >
            {[
              { title: "Cafe Website", tag: "Sample Build", desc: "An elegant, high-converting website designed to attract more customers and increase orders for your cafe.", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" },
              { title: "Real Estate Website", tag: "Sample Build", desc: "A modern property listing website built to generate leads and showcase listings professionally.", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" },
              { title: "Healthcare Website", tag: "Sample Build", desc: "A clean, trust-focused website designed to build credibility and increase patient bookings.", img: "https://images.unsplash.com/photo-1505751172107-5732bb72cc53?w=800&q=80" },
              { title: "E-commerce Website", tag: "Sample Build", desc: "A conversion-optimized online store designed to drive sales and maximize revenue.", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80" },
              { title: "Personal Brand Website", tag: "Sample Build", desc: "A powerful personal brand website to showcase your expertise and attract high-value clients.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
              { title: "SaaS / Startup Website", tag: "Sample Build", desc: "A modern, scalable website designed to communicate your product clearly and drive user acquisition.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" }
            ].map((industry, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="group relative bg-white/70 backdrop-blur-md rounded-2xl md:rounded-[32px] p-4 md:p-5 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/20"
              >
                <div className="relative aspect-[16/10] rounded-xl md:rounded-[24px] overflow-hidden mb-4 md:mb-8 shadow-inner">
                  <img 
                    src={industry.img} 
                    alt={industry.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                      {industry.tag}
                    </span>
                  </div>
                </div>

                <div className="px-1 md:px-2 pb-2 space-y-2 md:space-y-4">
                  <h3 className="text-lg md:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{industry.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{industry.desc}</p>
                  
                  <div className="pt-4">
                    <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all pb-2">
                      View Demo <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="h-0.5 w-12 bg-primary/20 group-hover:w-20 transition-all rounded-full" />
                  </div>
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute -inset-1 bg-primary/5 rounded-[36px] opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-12 md:py-24 relative z-10">
        <div className="container-custom px-5 md:px-[37px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-card rounded-2xl md:rounded-[40px] p-8 md:p-12 lg:p-20 text-center space-y-6 md:space-y-8 bg-white/60 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Want results like this?</h2>
              <p className="text-sm sm:text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                Ready to take your brand to the next level? Join hundreds of satisfied clients and start scaling today.
              </p>
              
              <div className="pt-4 md:pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <MagneticButton>
                  <button className="bg-slate-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg btn-premium flex items-center justify-center gap-3 primary-button w-full sm:w-auto">
                    Book a Strategy Call <ArrowRight className="w-6 h-6" />
                  </button>
                </MagneticButton>
                
                <MagneticButton>
                  <button className="px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg text-slate-600 border border-slate-200 hover:bg-white transition-all flex items-center justify-center gap-2 group w-full sm:w-auto">
                    Free Audit
                  </button>
                </MagneticButton>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const CaseStudyCard: React.FC<{ study: any, index: number }> = ({ study, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link to={`/work/${study.id}`} className="block h-full">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-900/10 group-hover:border-primary/20">
          {/* Media Hook */}
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
            {study.videoUrl ? (
              <div className="w-full h-full relative">
                <video
                  src={study.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 fill-white text-white" />
                </div>
              </div>
            ) : (
              <img 
                src={study.image} 
                alt={study.client}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Card Content */}
          <div className="p-5 md:p-8 flex flex-col flex-1 space-y-4 md:space-y-6">
            <div className="space-y-4 flex-1">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                {study.industry}
              </span>
              
              <h3 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                {study.client}
              </h3>
              
              <div className="space-y-1">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Challenge</p>
                <p className="text-slate-600 font-medium line-clamp-1">{study.challenge}</p>
              </div>
              
              <div className="space-y-1 pt-2">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Result</p>
                <p className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {study.result.split(' ')[0]} <span className="text-primary">{study.result.split(' ').slice(1).join(' ')}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest pt-4 border-t border-slate-50 group-hover:gap-4 transition-all">
              View Case Study <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default WorkPage;
