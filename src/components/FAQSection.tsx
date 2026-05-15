import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FadeInUp } from '@/lib/animations';

const faqs = [
  {
    q: 'How does Adibuz use AI in digital marketing?',
    a: 'Adibuz integrates AI into strategy, automation, audience analysis, content workflows, lead qualification, and performance optimization. Our systems help brands reduce manual effort, improve efficiency, and scale faster through data-driven decision making and intelligent automation.',
  },
  {
    q: 'What makes Adibuz different from traditional agencies?',
    a: 'Unlike traditional agencies that focus only on execution, Adibuz builds scalable digital systems. We combine AI automation, premium branding, performance marketing, web development, and strategic growth frameworks to create long-term business impact instead of short-term vanity metrics.',
  },
  {
    q: 'What services does Adibuz specialize in?',
    a: 'Adibuz specializes in AI automation, high-performance website development, SEO, social media management, paid advertising, branding strategy, conversion optimization, and modern digital growth systems tailored for scalable businesses.',
  },
  {
    q: 'Can Adibuz help startups and growing businesses?',
    a: 'Yes. We work with startups, personal brands, service businesses, SaaS companies, e-commerce brands, and growing enterprises. Our systems are designed to adapt to different growth stages and business goals.',
  },
  {
    q: 'How long does it usually take to see measurable growth?',
    a: 'The timeline depends on the service and market competition. Paid campaigns can generate results within weeks, while SEO and long-term brand systems typically compound over several months. Our focus is sustainable, measurable, and scalable growth.',
  },
  {
    q: 'Does Adibuz provide both branding and performance marketing?',
    a: 'Yes. Adibuz combines premium brand positioning with performance-driven marketing strategies. We help businesses create strong digital identities while also building systems that generate leads, conversions, and long-term customer growth.',
  },
  {
    q: 'Can you redesign or optimize an existing website?',
    a: 'Absolutely. We help businesses modernize outdated websites by improving performance, user experience, branding consistency, responsiveness, SEO structure, and conversion-focused design systems.',
  },
];

export function FAQSection() {
  return (
    <section id="faqs" className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-20">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Frequently Asked <br />
              <span className="text-gradient">Questions.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
              Everything you need to know about our AI-driven systems and how we help ambitious brands scale.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInUp
                key={i}
                delay={i * 0.1}
                className="premium-card rounded-[20px] md:rounded-[24px] transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group hover:shadow-[0_20px_40px_-10px_rgba(58,15,99,0.08)] hover:-translate-y-1 border border-slate-200/50 hover:border-[#3A0F63]/30 bg-white hover:bg-[#fcfaff]"
              >
                <div className="flex items-center justify-between py-4 px-5 md:py-[18px] md:px-7 cursor-pointer">
                  <span className="text-base md:text-[1.1rem] font-bold text-slate-800 tracking-tight group-hover:text-[#3A0F63] transition-colors duration-500 pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#3A0F63] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0 group-hover:shadow-lg group-hover:shadow-[#3A0F63]/20 group-hover:scale-105">
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-rotate-180 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>
                </div>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-7 pb-5 md:pb-6 text-slate-500 text-[0.95rem] md:text-[1.05rem] leading-[1.65] font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[50ms]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
