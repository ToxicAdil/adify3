import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Rocket, Monitor, User, Store } from 'lucide-react';
import { Sparkles } from './ui/sparkles';

const clients = [
  { name: 'D2C', icon: ShoppingBag },
  { name: 'Startups', icon: Rocket },
  { name: 'SaaS', icon: Monitor },
  { name: 'Experts', icon: User },
  { name: 'E-Comm', icon: Store }
];

const WhoWeWorkWith = () => {
  return (
    <section className="w-full h-auto py-6 flex flex-col items-center relative overflow-hidden bg-transparent">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#3A0F63]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      {/* Hero Header Context */}
      <div className="w-full relative z-20 flex flex-col items-center pt-0">
        
        {/* Title Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center flex flex-col items-center relative z-20 mb-14"
        >
          <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-[900] tracking-tight mb-4 md:mb-6 mt-0">
            Who We Work With
          </h2>
          <p className="text-slate-400 text-base md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed px-4">
            We partner with ambitious brands ready to scale with data-driven systems.
          </p>
        </motion.div>

        {/* Inline Grid (Mock Logos) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-14 z-20 mb-12 md:mb-20 px-5 md:px-[37px] max-w-6xl mx-auto items-center justify-items-center"
        >
          {clients.map((client, i) => {
            const Icon = client.icon;
            return (
              <div 
                key={i} 
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition-opacity duration-300 opacity-80 hover:opacity-100 cursor-default"
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} fill="currentColor" />
                <span className="font-[800] tracking-tight text-base md:text-xl lg:text-2xl whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Aceternity Sparkles Arc */}
        <div className="relative -mt-16 md:-mt-32 h-60 md:h-96 w-full max-w-[1200px] overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] z-10 pointer-events-none">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#a855f7,transparent_70%)] before:opacity-30" />
          <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-purple-500/20 bg-[#0B0B0F] shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]" />
          <Sparkles
            density={800}
            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            color="#ffffff"
            size={1.5}
          />
        </div>

      </div>
      
    </section>
  );
};

export default WhoWeWorkWith;
