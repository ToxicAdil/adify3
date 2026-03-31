import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Menu, X, Globe, BarChart3, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdifyLogo from '../components/AdifyLogo';
import MagneticButton from '../components/MagneticButton';
import CustomCursor from '../components/CustomCursor';

const ClientsPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/#services' },
    { label: 'Clients', path: '/clients' },
    { label: 'About', path: '/about' },
    { label: 'Why Adify', path: '/#why' },
    { label: 'Reviews', path: '/#reviews' },
    { label: 'FAQs', path: '/#faqs' }
  ];

  const successStories = [
    {
      brand: "Glow & Co.",
      industry: "E-Commerce / Skincare",
      title: "Scaling a D2C Skincare Brand Globally",
      results: [
        { metric: "+240%", label: "Revenue Growth" },
        { metric: "4.5x", label: "Average ROAS" },
        { metric: "-35%", label: "CPA Reduction" }
      ],
      description: "Glow & Co had great products but struggled to break past their monthly revenue ceiling due to rising acquisition costs. We completely overhauled their paid social strategy, implemented dynamic creative testing, and built robust backend email automation flows.",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
    },
    {
      brand: "Nexus Tech",
      industry: "B2B SaaS",
      title: "Generating High-Ticket Enterprise Leads",
      results: [
        { metric: "150+", label: "Qualified Demos" },
        { metric: "6x", label: "Pipeline Value" },
        { metric: "40%", label: "Shorter Sales Cycle" }
      ],
      description: "As a scaling enterprise software provider, Nexus Tech wanted to reach exactly the right decision makers. Through highly targeted LinkedIn outreach systems, precision search intent campaigns, and optimized landing pages, we built an engine that consistently brings high-intent leads to their calendar.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
    },
    {
      brand: "FitLife Hub",
      industry: "Fitness & Wellness",
      title: "From Local Gym to App Dominance",
      results: [
        { metric: "50,000+", label: "New Users" },
        { metric: "12%", label: "Higher Retention" },
        { metric: "3x", label: "Subscription MRR" }
      ],
      description: "FitLife Hub had a localized audience that they wanted to transition into a global app audience. We executed a full-funnel strategy focusing on community-led growth, influencer collaborations, and aggressive performance marketing on TikTok and Meta.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
    }
  ];

  return (
    <div className="bg-[#faf5ff] min-h-screen text-slate-900 selection:bg-[#3A0F63]/20 relative">
      <CustomCursor />
      
      {/* Header Inline */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'} header`}>
        <div className="container-custom">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'glass rounded-full px-12 py-3 shadow-sm' : 'py-2'}`}>
            <Link to="/" className="flex items-center group cursor-pointer">
              <AdifyLogo height={34} className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path}
                  className={`text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide ${item.label === 'Clients' ? 'text-[#3A0F63]' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <MagneticButton>
                <button className="hidden sm:block text-[13px] font-bold text-slate-900 hover:opacity-70 transition-opacity">
                  Chat Now
                </button>
              </MagneticButton>
              <MagneticButton>
                <button className="hidden md:flex px-6 py-2.5 bg-[#3A0F63] text-white hover:bg-purple-900 rounded-full text-[13px] font-bold transition-all items-center gap-2 transform hover:scale-105 shadow-md shadow-[#3A0F63]/20">
                  Get Started <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </MagneticButton>
              
              <button 
                className="md:hidden p-2 text-slate-900" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 lg:pt-48 pb-20 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative container-custom mb-24 md:mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
             <div className="inline-flex items-center gap-2 bg-purple-500/10 text-[#3A0F63] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-purple-200">
               <Globe size={14} /> CLIENT SUCCESS
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
               We Measure Success by <span className="text-[#3A0F63]">Your Revenue.</span>
             </h1>
             <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
               Explore how we've built high-performing marketing systems that transform brands and dominate their respective markets.
             </p>
          </motion.div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className="container-custom space-y-32">
          {successStories.map((story, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="absolute inset-0 bg-[#3A0F63]/5 translate-x-4 translate-y-4 rounded-3xl -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl bg-white aspect-[4/3] w-full">
                  <img src={story.image} alt={story.brand} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-8">
                     <span className="bg-white/90 backdrop-blur text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                       {story.industry}
                     </span>
                  </div>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-sm font-bold tracking-[0.2em] text-[#3A0F63] uppercase bg-purple-50 px-3 py-1 inline-block rounded-md">{story.brand}</h3>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">{story.title}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">{story.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-100">
                  {story.results.map((result, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-2xl lg:text-3xl font-black text-[#3A0F63]">{result.metric}</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{result.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          ))}
        </section>

        {/* CTA SECTION */}
        <section className="container-custom mt-32 md:mt-48">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#3A0F63] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-[#3A0F63]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900 opacity-50" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Ready to add your brand to our success stories?</h2>
              <p className="text-lg text-purple-200 font-medium">Stop relying on vanity metrics. Let's build a profitable performance marketing system tailored exactly for your business.</p>
              
              <button className="mt-8 px-8 py-4 bg-white text-[#3A0F63] hover:bg-slate-50 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                Discuss Your Strategy <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm font-medium text-slate-400 border-t border-purple-100">
        <p>© {new Date().getFullYear()} Adify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClientsPage;
