"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface AccordionItem {
  id: string
  number: string
  title: string
  content: string
}

const items: AccordionItem[] = [
  {
    id: "strategic",
    number: "01",
    title: "Strategic Marketing",
    content: "Data-driven growth plans tailored to your brand goals, including market analysis and competitive benchmarking.",
  },
  {
    id: "ads",
    number: "02",
    title: "Paid Advertising",
    content: "High-converting search and social campaigns designed to drive immediate ROI through precise targeting.",
  },
  {
    id: "social",
    number: "03",
    title: "Social Media",
    content: "Building community and engagement across all platforms with strategic content and influencer partnerships.",
  },
  {
    id: "web",
    number: "04",
    title: "Web Development",
    content: "Building robust, high-performance landing pages and infrastructure designed for conversion and scale.",
  },
  {
    id: "automation",
    number: "05",
    title: "Marketing Automation",
    content: "Streamlining workflows and lead nuturing systems to maximize efficiency and customer lifetime value.",
  },
  {
    id: "seo",
    number: "06",
    title: "Organic SEO",
    content: "Dominating search results with technical authority and content strategy to rank where your customers are looking.",
  },
]

export function UniqueAccordion() {
  const [activeId, setActiveId] = useState<string | null>("strategic")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="w-full max-w-xl">
      <div className="space-y-0">
        {items.map((item, index) => {
          const isActive = activeId === item.id
          const isHovered = hoveredId === item.id

          return (
            <div key={item.id} className="border-b border-slate-200 last:border-0">
              <motion.button
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative text-left"
                initial={false}
              >
                <div className="flex items-center gap-6 py-6 px-1">
                  {/* Number with animated circle */}
                  <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#3A0F63]"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : isHovered ? 0.85 : 0,
                        opacity: isActive ? 1 : isHovered ? 0.1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                    <motion.span
                      className="relative z-10 text-sm font-bold tracking-wide"
                      animate={{
                        color: isActive ? "#ffffff" : "#64748b",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.number}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl md:text-2xl font-bold tracking-tight text-slate-900"
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                      color: isActive || isHovered ? "#0f172a" : "#64748b",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Animated indicator */}
                  <div className="ml-auto flex items-center gap-3">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8"
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-slate-900"
                        animate={{
                          opacity: isActive || isHovered ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.path
                          d="M8 1V15M1 8H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={false}
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Animated progress underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-[#3A0F63] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive ? 1 : isHovered ? 0.3 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              </motion.button>

              {/* Content */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="pl-16 pr-12 pb-8 text-slate-500 leading-relaxed font-medium"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
