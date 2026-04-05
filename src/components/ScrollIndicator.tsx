import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'clients', label: 'Clients' },
  { id: 'faqs', label: 'FAQs' }
];

const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observers.set(id, element);
      }
    });

    // Re-check after mount to catch late-rendered elements
    setTimeout(() => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && !observers.has(id)) {
          observer.observe(element);
          observers.set(id, element);
        }
      });
    }, 1000);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed right-[20px] md:right-[30px] top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col items-center justify-center pointer-events-auto">
      {/* Pill container — clean white, matching Adymize */}
      <div 
        className="flex flex-col items-center gap-5 px-[10px] py-[18px] rounded-full shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div
              key={section.id}
              onClick={() => handleScrollTo(section.id)}
              className="relative cursor-pointer flex items-center justify-center w-[18px] h-[18px]"
              title={section.label}
            >
              {/* Active ring */}
              {isActive && (
                <motion.div
                  layoutId="activeRing"
                  className="absolute inset-0 rounded-full border-[2px] border-[#1a1a1a]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              {/* Dot */}
              <motion.div
                animate={{
                  width: isActive ? 7 : 6,
                  height: isActive ? 7 : 6,
                }}
                transition={{ duration: 0.25 }}
                className="rounded-full bg-[#1a1a1a]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
