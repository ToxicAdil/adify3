import React from 'react';
import { motion } from 'motion/react';

const ImpactStatement = () => {
  return (
    <section className="w-full pt-[40px] pb-[60px] md:pt-[80px] md:pb-[140px] flex flex-col items-center justify-center relative bg-transparent px-5 md:px-[37px] overflow-hidden">

      {/* Premium background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center">
        
        {/* Caption */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-primary text-[12px] md:text-[14px] font-bold uppercase tracking-[0.25em] mb-8 block"
        >
          Serving clients across multiple countries worldwide
        </motion.span>

        {/* Impact Heading */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h2 
            className="text-slate-900 text-[26px] sm:text-[36px] md:text-[56px] lg:text-[76px] font-[500] leading-[1.3] -rotate-1"
            style={{ 
              fontFamily: "'Caveat', cursive",
              letterSpacing: '0.05em'
            }}
          >
            We build scalable growth systems for brands that want real results.
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactStatement;
