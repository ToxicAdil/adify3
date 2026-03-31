import React from 'react';
import { motion } from 'motion/react';
import { Target, Bot, LineChart, Layers, ArrowRight } from 'lucide-react';

const AboutAdify: React.FC = () => {
  return (
    <section id="about" className="py-8 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="premium-card rounded-3xl md:rounded-[32px] p-6 md:p-[37px] overflow-hidden relative"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Content */}
            <motion.div 
               initial={{ opacity: 0, x: -40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="space-y-8"
            >
               {/* Label */}
               <div className="inline-flex items-center">
                  <span className="text-[12px] font-bold text-[#3A0F63] uppercase tracking-[0.2em] bg-[#3A0F63]/10 px-[16px] py-[6px] rounded-full">
                    ABOUT ADIFY
                  </span>
               </div>
               
               {/* Main Heading */}
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                 We Build Systems That <span className="text-[#3A0F63]">Scale Businesses.</span>
               </h2>
               
               {/* Description */}
               <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                 We are a performance-focused digital marketing agency that goes beyond clicks and impressions.
                 <br/><br/>
                 At Adify, we build data-driven marketing systems designed to generate consistent revenue, scale brands globally, and deliver measurable ROI.
               </p>
               
               {/* Core Points */}
               <div className="grid sm:grid-cols-2 gap-6 pt-2">
                 {[
                   { icon: Target, text: "Performance-first approach" },
                   { icon: Bot, text: "AI-driven marketing strategies" },
                   { icon: LineChart, text: "Transparent reporting & tracking" },
                   { icon: Layers, text: "Scalable systems for growth" }
                 ].map((point, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                     className="flex items-start gap-3 group"
                   >
                     <div className="mt-1 w-8 h-8 rounded-full bg-[#3A0F63]/10 flex shrink-0 items-center justify-center text-[#3A0F63] group-hover:bg-[#3A0F63] group-hover:text-white transition-colors duration-300">
                       <point.icon className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-semibold text-slate-700 leading-tight group-hover:text-[#3A0F63] transition-colors duration-300 mt-1.5">
                       {point.text}
                     </span>
                   </motion.div>
                 ))}
               </div>

               {/* Micro Stats */}
               <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 border-t border-slate-100">
                 <div className="space-y-1">
                   <div className="text-2xl font-bold text-slate-900">500+</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clients</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-2xl font-bold text-slate-900">₹500Cr+</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ad Spend</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-2xl font-bold text-slate-900">5+</div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years Exp.</div>
                 </div>
               </div>

               {/* CTA */}
               <div className="pt-4">
                 <button className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-[#3A0F63] to-[#6D28D9] text-white rounded-full font-bold shadow-xl shadow-[#3A0F63]/30 hover:shadow-[#3A0F63]/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2">
                   <span className="relative z-10">Book a Strategy Call</span>
                   <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                   {/* Button Hover Glow */}
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                 </button>
               </div>
            </motion.div>

            {/* Right Side Visual: Animated Gradient / Floating Elements */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.3 }}
               className="relative h-[500px] lg:h-full lg:min-h-[600px] w-full flex items-center justify-center rounded-[24px] overflow-hidden"
            >
                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-3xl border border-white/40 rounded-[24px] z-10" />
                
                {/* Abstract animated elements behind the blur */}
                <motion.div 
                   animate={{ 
                       scale: [1, 1.2, 1],
                       rotate: [0, 90, 0],
                       opacity: [0.3, 0.6, 0.3],
                   }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#3A0F63]/30 rounded-full blur-[80px] z-0"
                />
                <motion.div 
                   animate={{ 
                       scale: [1, 1.5, 1],
                       rotate: [0, -90, 0],
                       opacity: [0.2, 0.5, 0.2],
                   }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-[#6D28D9]/20 rounded-full blur-[100px] z-0"
                />
                
                {/* Foreground structure (e.g. geometric wireframe representation of a "system") */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 gap-12">
                    {/* Visual element representing a scalable system */}
                    <div className="relative group w-48 h-48 md:w-64 md:h-64 mt-12">
                         <div className="absolute inset-0 rounded-full border border-[#3A0F63]/20 border-dashed animate-[spin_30s_linear_infinite]" />
                         <div className="absolute inset-4 rounded-full border border-[#6D28D9]/30 animate-[spin_20s_linear_infinite_reverse]" />
                         <div className="absolute inset-8 rounded-full border border-[#A78BFA]/40 border-dotted animate-[spin_15s_linear_infinite]" />
                         
                         {/* Center Core */}
                         <div className="absolute inset-0 m-auto w-16 h-16 bg-gradient-to-tr from-[#3A0F63] to-[#6D28D9] rounded-2xl shadow-[0_0_40px_rgba(109,40,217,0.5)] flex items-center justify-center transform rotate-45 transition-transform duration-500 group-hover:scale-110">
                             <div className="w-8 h-8 bg-white/20 rounded-lg transform -rotate-45 backdrop-blur-sm" />
                         </div>

                         {/* Orbiting nodes */}
                         <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-0"
                         >
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(58,15,99,0.5)] ring-2 ring-[#3A0F63]" />
                         </motion.div>
                         <motion.div 
                             animate={{ rotate: -360 }}
                             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-4"
                         >
                             <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(109,40,217,0.5)] ring-2 ring-[#6D28D9]" />
                         </motion.div>
                         <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                             className="absolute inset-8"
                         >
                             <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(167,139,250,0.8)] ring-1 ring-[#A78BFA]" />
                         </motion.div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="px-6 py-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-lg text-sm font-bold text-[#3A0F63] flex items-center gap-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        System Active & Scaling
                    </motion.div>
                </div>
            </motion.div>
          </div>
          
          {/* Subtle decorative bottom shadow */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full z-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAdify;
