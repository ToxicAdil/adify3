import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

export const AboutPreviewCard: React.FC = () => {
  return (
    <section className="py-12 md:py-20 relative z-10">
      <div className="container-custom px-5 md:px-[37px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group max-w-6xl mx-auto"
        >
          {/* Subtle background glow similar to screenshot */}
          <div className="absolute -inset-4 md:-inset-8 bg-primary/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

          <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-14 lg:p-20 shadow-[0_20px_80px_-20px_rgba(58,15,99,0.08)] border border-slate-100/60 flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start relative overflow-hidden">
            
            {/* LEFT SIDE */}
            <div className="w-full md:w-5/12 space-y-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-slate-900 ml-1" />
                </div>
                <div className="flex gap-2 opacity-30 hidden sm:flex">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  ))}
                </div>
              </div>

              <div className="space-y-4">

                
                <p className="text-slate-500 font-medium leading-relaxed md:text-lg max-w-sm">
                  A quick look into the people, culture, and intelligent systems driving modern digital growth for ambitious brands.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full md:w-7/12 space-y-8 relative z-10">
              <h2 className="text-5xl md:text-6xl lg:text-[72px] font-black text-slate-900 tracking-tight leading-[1.05]">
                Who are <br />
                <span className="text-[#8B5CF6]">we?</span>
              </h2>

              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                We are a technology-first growth agency combining strategic marketing, AI automation, and premium web experiences to build scalable digital ecosystems.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <MagneticButton>
                  <Link 
                    to="/about"
                    className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-base btn-premium flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    About Adibuz <ArrowRight className="w-5 h-5" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton>
                  <Link 
                    to="/about#team"
                    className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center text-center"
                  >
                    Meet the Team
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
