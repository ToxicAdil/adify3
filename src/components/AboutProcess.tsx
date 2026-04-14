import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const steps = [
  {
    num: '01',
    title: 'analysis',
    desc: 'We audit your current ecosystem and define the highest-impact growth opportunities.'
  },
  {
    num: '02',
    title: 'concept',
    desc: 'We craft a sharp creative and technical direction aligned with your business goals.'
  },
  {
    num: '03',
    title: 'visuals & systems',
    desc: 'We execute premium interfaces, automation flows, and campaign structures.'
  },
  {
    num: '04',
    title: 'optimization',
    desc: 'Continuous A/B testing, data analysis, and refinement to maximize your ROI.'
  },
  {
    num: '05',
    title: 'scaling',
    desc: 'Amplifying winning strategies to drive compounding growth without sacrificing efficiency.'
  }
];

// Constants for layout
const Y_SPACING = 130;
const X_OFFSET = 260; // center of card to center of screen
const CARD_WIDTH = 320;

const AboutProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // Map out card coordinates for the 1200px virtual bounds
  const cards = steps.map((step, i) => {
    // Exact staircase diagonal layout from left to right, snaking back
    const cxPattern = [200, 600, 1000, 600, 200];
    const cx = cxPattern[i];
    const cy = 200 + i * 160; 
    return { ...step, cx, cy };
  });

  // Build the SVG path routing
  let pathD = `M 600 40 `; // start at pill bottom
  // Line to 01 (Enters right edge of 01)
  pathD += `C 600 120, ${cards[0].cx + 160 + 60} ${cards[0].cy}, ${cards[0].cx + 160} ${cards[0].cy} `;
  
  // Lines between cards
  for (let i = 1; i < cards.length; i++) {
     const prev = cards[i-1];
     const curr = cards[i];
     const movingRight = curr.cx > prev.cx;
     
     if (movingRight) {
       const startX = prev.cx + 160;
       const endX = curr.cx - 160;
       pathD += `C ${startX + 60} ${prev.cy}, ${endX - 60} ${curr.cy}, ${endX} ${curr.cy} `;
     } else {
       const startX = prev.cx - 160;
       const endX = curr.cx + 160;
       pathD += `C ${startX - 60} ${prev.cy}, ${endX + 60} ${curr.cy}, ${endX} ${curr.cy} `;
     }
  }

  const svgHeight = cards[cards.length - 1].cy + 80;

  return (
    <section ref={containerRef} className="w-full bg-transparent py-6 relative overflow-hidden" style={{ minHeight: svgHeight }}>


      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden xl:block w-[1200px] h-full mx-auto relative z-10" style={{ height: svgHeight }}>
        
        {/* Process Pill Header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="px-6 py-2 rounded-[12px] border border-slate-200 bg-white shadow-sm">
            <span className="text-slate-900 text-[15px] font-medium tracking-wide lowercase">process</span>
          </div>
        </div>

        {/* The Animated SVG Line */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <svg viewBox={`0 0 1200 ${svgHeight}`} className="w-full h-full" preserveAspectRatio="xMidYMin meet">
            <path 
              d={pathD}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <motion.path 
              d={pathD}
              fill="none"
              stroke="#9333ea" 
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* The Floating Cards */}
        {cards.map((card, i) => (
          <div 
            key={i}
            className="absolute flex items-center h-auto" 
            style={{ 
              left: card.cx - (CARD_WIDTH / 2), 
              top: card.cy,
              width: CARD_WIDTH,
              transform: 'translateY(-50%)'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full rich-purple-textured-box py-6 px-8 relative z-10"
              whileHover={{ y: -8 }}
            >
              <div className="relative z-10">
                <div className="text-purple-300/80 font-bold text-[12px] font-mono tracking-wider mb-2">{card.num}.</div>
                <h3 className="text-white text-[22px] font-bold tracking-tight mb-2 lowercase">{card.title}</h3>
                <p className="text-purple-100/70 font-medium text-[14px] leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="xl:hidden flex flex-col items-center gap-12 w-full px-6 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="px-6 py-2 rounded-[12px] border border-slate-200 bg-white shadow-sm">
            <span className="text-slate-900 text-[15px] font-medium tracking-wide lowercase">process</span>
          </div>
        </div>

        <div className="w-full max-w-sm relative">
          <div className="absolute left-[20px] top-[24px] bottom-0 w-[2px] bg-slate-200">
            <motion.div className="w-full bg-primary origin-top" style={{ scaleY: pathLength, height: '100%' }} />
          </div>

          <div className="flex flex-col gap-4">
            {cards.map((card, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="pl-12 relative w-full"
              >
                <div className="absolute left-[16.5px] top-[24px] w-[9px] h-[9px] rounded-full bg-white border-2 border-primary" />
                <div className="w-full rich-purple-textured-box py-6 px-7">
                  <div className="relative z-10">
                    <div className="text-purple-300/80 font-bold text-[12px] font-mono tracking-widest mb-2">{card.num}.</div>
                    <h3 className="text-white text-[20px] font-bold tracking-tight mb-2 lowercase">{card.title}</h3>
                    <p className="text-purple-100/70 font-medium text-[14px] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutProcess;
