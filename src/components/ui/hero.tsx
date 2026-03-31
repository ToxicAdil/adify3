import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function HeroGlobe() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#faf5ff] pb-10 pt-32 lg:pt-48 font-light text-slate-900 antialiased md:pb-32"
      style={{
        background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
      }}
    >
      <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(58, 15, 99, 0.08) 0%, rgba(250, 245, 255, 0) 60%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(58, 15, 99, 0.08) 0%, rgba(250, 245, 255, 0) 60%)",
        }}
      />
 
      <div className="container-custom relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <span className="mb-6 inline-block rounded-full border border-[#3A0F63]/20 bg-[#3A0F63]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#3A0F63]">
            AI-FIRST MARKETING
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl xl:text-[80px] tracking-tight leading-[1.1] text-slate-900">
            Scale Smarter.{" "}
            <br />
            <span className="text-[#3A0F63]">Grow Faster.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 md:text-xl font-medium">
            We build high-performing marketing systems that drive real revenue, not just clicks. Leverage AI-driven insights to dominate your market.
          </p>
 
          <div className="mb-16 sm:mb-20 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/#services"
              className="neumorphic-button relative overflow-hidden rounded-full border border-[#3A0F63]/10 bg-gradient-to-r from-[#3A0F63] to-purple-800 px-8 py-4 text-white font-bold shadow-[0_10px_40px_-10px_rgba(58,15,99,0.5)] transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(58,15,99,0.7)] hover:-translate-y-1 sm:w-auto flex items-center gap-2"
            >
              Book a Strategy Call
            </Link>
            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 text-slate-500 font-bold transition-colors hover:text-[#3A0F63] sm:w-auto"
            >
              <span className="text-sm tracking-wide uppercase">Free Audit</span>
            </a>
          </div>
        </motion.div>
        
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="w-full flex h-40 md:h-64 lg:h-80 relative overflow-hidden">
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt="Earth"
              className="absolute px-4 top-0 left-1/2 -translate-x-1/2 mx-auto -z-10 opacity-30 mix-blend-multiply drop-shadow-2xl"
              style={{ filter: "hue-rotate(240deg) saturate(2) brightness(0.8)" }}
            />
          </div>
          <div className="relative z-10 mx-auto overflow-hidden rounded-2xl shadow-[0_30px_100px_rgba(58,15,99,0.15)] border border-purple-500/10 bg-white/50 backdrop-blur-sm -mt-16 md:-mt-32">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
              alt="Adify Dashboard"
              className="h-auto w-full object-cover border border-purple-100/50 rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
