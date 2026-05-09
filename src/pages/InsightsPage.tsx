import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Clock, Sparkles, Zap, Search,
  TrendingUp, Target, Globe, BarChart3, Cpu, Megaphone, Layers, Rocket
} from 'lucide-react';
import { useInsights } from '../hooks/useInsights';
import { InsightCard } from '../components/insights/InsightCard';
import { NewsletterCTA } from '../components/insights/NewsletterCTA';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import CustomCursor from '../components/CustomCursor';
import { Insight } from '../services/insightService';
import { SEO } from '@/components/SEO';

import { FadeInUp, StaggerContainer, StaggerItem } from '@/lib/animations';

// ─── Topic categories ─────────────────────────────────────────────────────────
const TOPICS = [
  { label: 'AI Marketing',    icon: Cpu,       color: 'from-violet-500 to-purple-700' },
  { label: 'SEO',             icon: TrendingUp, color: 'from-purple-500 to-fuchsia-700' },
  { label: 'Automation',      icon: Zap,        color: 'from-fuchsia-500 to-purple-700' },
  { label: 'Branding',        icon: Layers,     color: 'from-purple-600 to-violet-700' },
  { label: 'Web Development', icon: Globe,      color: 'from-violet-600 to-purple-800' },
  { label: 'Growth Systems',  icon: Rocket,     color: 'from-purple-500 to-violet-700' },
  { label: 'Paid Ads',        icon: Target,     color: 'from-fuchsia-600 to-purple-700' },
  { label: 'Analytics',       icon: BarChart3,  color: 'from-violet-500 to-fuchsia-600' },
];

// ─── Premium Featured Card ────────────────────────────────────────────────────
function PremiumFeatured({ insight }: { insight: Insight }) {
  const date = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    .format(new Date(insight.created_at));

  return (
    <FadeInUp className="relative rounded-[36px] overflow-hidden group cursor-pointer bg-white border border-slate-200/60 shadow-2xl hover:shadow-[0_32px_80px_rgba(58,15,99,0.18)] transition-all duration-700">
      <Link to={`/insights/${insight.slug}`} className="absolute inset-0 z-30" aria-label={insight.title} />

      <div className="grid lg:grid-cols-[1.4fr_1fr] min-h-[520px]">
        {/* Image */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
          <img
            src={insight.featured_image}
            alt={insight.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A0F63]/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          {/* Top labels */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[#3A0F63] text-[11px] font-bold tracking-widest uppercase rounded-full shadow">
              {insight.category?.name ?? 'Insight'}
            </span>
            <span className="px-3 py-1.5 bg-[#3A0F63]/80 backdrop-blur-md text-white text-[11px] font-bold tracking-widest uppercase rounded-full">
              ★ Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-10 sm:p-14 lg:p-16 bg-white/95 backdrop-blur-xl relative z-10">
          <div className="flex items-center gap-3 text-[12px] font-semibold text-slate-400 uppercase tracking-widest mb-6">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {insight.read_time} min read</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-[900] text-slate-900 mb-6 leading-[1.12] tracking-tight group-hover:text-[#3A0F63] transition-colors duration-500">
            {insight.title}
          </h2>

          <p className="text-slate-500 text-[16px] leading-[1.75] mb-10 line-clamp-4">
            {insight.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A0F63] to-purple-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
                {insight.author_name.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900">{insight.author_name}</p>
                <p className="text-[12px] text-slate-400">Adibuz Team</p>
              </div>
            </div>
            <span className="relative z-40 flex items-center gap-2 bg-[#3A0F63] text-white px-6 py-3 rounded-full text-[13px] font-bold shadow-lg shadow-[#3A0F63]/30 group-hover:bg-[#4d1482] transition-all duration-300 group-hover:scale-105">
              Read Article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </FadeInUp>
  );
}

// ─── Trending horizontal card ─────────────────────────────────────────────────
function TrendingCard({ insight, rank }: { insight: Insight; rank: number }) {
  const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
    .format(new Date(insight.created_at));

  return (
    <div className="group relative">
      <Link to={`/insights/${insight.slug}`} className="flex items-center gap-5 p-5 rounded-2xl bg-white/70 border border-slate-200/50 backdrop-blur-md hover:border-[#3A0F63]/30 hover:shadow-xl hover:shadow-[#3A0F63]/5 transition-all duration-500 hover:-translate-y-0.5">
        {/* Rank */}
        <span className="text-[32px] font-[900] text-slate-100 select-none leading-none w-10 shrink-0 group-hover:text-[#3A0F63]/20 transition-colors duration-300">
          {String(rank + 1).padStart(2, '0')}
        </span>

        {/* Thumb */}
        <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-slate-100 animate-pulse" />
          <img
            src={insight.featured_image}
            alt={insight.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          {insight.category && (
            <span className="text-[10px] font-bold text-[#3A0F63] uppercase tracking-widest">{insight.category.name}</span>
          )}
          <h4 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 mt-1 group-hover:text-[#3A0F63] transition-colors duration-300">
            {insight.title}
          </h4>
          <div className="flex items-center gap-3 mt-2 text-[12px] text-slate-400 font-medium">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {insight.read_time} min</span>
            <span>{date}</span>
          </div>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#3A0F63] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
      </Link>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InsightsPage() {
  const {
    insights,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useInsights();

  const isDefaultView = !activeCategory && !searchQuery;
  const featuredPost  = isDefaultView && insights.length > 0 ? insights[0] : null;
  const gridPosts     = featuredPost ? insights.slice(1) : insights;
  const trendingPosts = insights.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white relative">

      {/* ── Background gradients ─────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 15% 40%, rgba(167,139,250,0.13) 0%, transparent 50%),
                          radial-gradient(circle at 85% 20%, rgba(109,40,217,0.09) 0%, transparent 50%),
                          radial-gradient(circle at 50% 90%, rgba(167,139,250,0.07) 0%, transparent 45%)`,
      }} />

      <CustomCursor />
      <SimpleHeader dark={false} />

      <SEO 
        title="Insights & Strategies | Adibuz" 
        description="Premium insights on AI marketing, SEO, web development, and digital growth systems from the Adibuz team." 
      />

      {/* ══════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-32 pb-12 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >


          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[900] tracking-tight text-slate-900 mb-6 leading-[1.06]">
            Insights &{' '}
            <span className="text-gradient">Strategy</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-xl mx-auto">
            Expert perspectives on building, scaling, and automating modern digital brands.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative max-w-xl mx-auto mb-8"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles, topics, strategies…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 rounded-full bg-white border border-slate-200 shadow-lg focus:outline-none focus:border-[#3A0F63]/40 focus:ring-4 focus:ring-[#3A0F63]/10 text-slate-900 placeholder-slate-400 transition-all text-[15px] font-medium"
          />
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 border ${!activeCategory
              ? 'bg-[#3A0F63] text-white border-[#3A0F63] shadow-lg shadow-[#3A0F63]/25'
              : 'bg-white text-slate-600 border-slate-200 hover:border-[#3A0F63]/30 hover:text-[#3A0F63]'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 border ${activeCategory === cat.id
                ? 'bg-[#3A0F63] text-white border-[#3A0F63] shadow-lg shadow-[#3A0F63]/25'
                : 'bg-white text-slate-600 border-slate-200 hover:border-[#3A0F63]/30 hover:text-[#3A0F63]'}`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Loading / Error / Empty states */}
      {loading ? (
        <div className="relative z-10 flex justify-center items-center py-32">
          <div className="w-10 h-10 border-4 border-[#3A0F63]/20 border-t-[#3A0F63] rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="relative z-10 text-center py-20 text-red-500 container-custom">
          <p>Failed to load insights. Please try again later.</p>
        </div>
      ) : insights.length === 0 ? (
        <div className="relative z-10 text-center py-32 text-slate-500 container-custom">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">No insights found</h3>
          <p>We couldn't find any articles matching your current filters.</p>
        </div>
      ) : (
        <>
          {/* ══════════════════════════════════════════════════
              SECTION 2 — FEATURED INSIGHT
          ══════════════════════════════════════════════════ */}
          {featuredPost && (
            <section className="relative z-10 container-custom pb-16">
              <FadeInUp className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent max-w-[80px]" />
                  <span className="text-[11px] font-bold text-[#3A0F63] uppercase tracking-[0.25em]">Featured Article</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
              </FadeInUp>
              <PremiumFeatured insight={featuredPost} />
            </section>
          )}

          {/* ══════════════════════════════════════════════════
              SECTION 3 — EXPLORE BY TOPICS
          ══════════════════════════════════════════════════ */}
          <section className="relative z-10 py-16 bg-white/50 backdrop-blur-sm border-y border-slate-200/60">
            <div className="container-custom">
              <FadeInUp className="mb-10 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[11px] font-bold text-[#3A0F63] uppercase tracking-[0.25em] mb-2">Browse by</p>
                  <h2 className="text-3xl sm:text-4xl font-[900] text-slate-900 tracking-tight">Explore Topics</h2>
                </div>
                <p className="text-slate-500 text-[15px] max-w-sm leading-relaxed">
                  Deep-dive into the disciplines shaping modern digital growth.
                </p>
              </FadeInUp>

              <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {TOPICS.map((topic, i) => {
                  const Icon = topic.icon;
                  return (
                    <StaggerItem key={topic.label}>
                      <button
                        onClick={() => {
                          const cat = categories.find(c =>
                            c.name.toLowerCase().includes(topic.label.toLowerCase().split(' ')[0])
                          );
                          if (cat) setActiveCategory(cat.id);
                        }}
                        className="w-full group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#3A0F63]/30 hover:shadow-[0_16px_40px_rgba(58,15,99,0.12)] transition-all duration-500 cursor-pointer text-center overflow-hidden hover:-translate-y-1"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[14px] font-bold text-slate-700 group-hover:text-[#3A0F63] transition-colors duration-300 leading-tight">
                          {topic.label}
                        </span>
                        {/* Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl`} />
                      </button>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════
              SECTION 4 — LATEST INSIGHTS GRID
          ══════════════════════════════════════════════════ */}
          {gridPosts.length > 0 && (
            <section className="relative z-10 py-20 container-custom">
              <FadeInUp className="mb-12 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[11px] font-bold text-[#3A0F63] uppercase tracking-[0.25em] mb-2">From the team</p>
                  <h2 className="text-3xl sm:text-4xl font-[900] text-slate-900 tracking-tight">Latest Insights</h2>
                </div>
                {activeCategory && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-[13px] font-bold text-[#3A0F63] underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Clear filter
                  </button>
                )}
              </FadeInUp>

              <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {gridPosts.map((insight, index) => (
                  <StaggerItem key={insight.id}>
                    <InsightCard insight={insight} index={index} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          )}

          {/* ══════════════════════════════════════════════════
              SECTION 5 — TRENDING / POPULAR INSIGHTS
          ══════════════════════════════════════════════════ */}
          {isDefaultView && trendingPosts.length > 0 && (
            <section className="relative z-10 py-16 bg-gradient-to-b from-[#fdfaff] to-white border-t border-slate-200/60">
              <div className="container-custom">
                <FadeInUp className="mb-10 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A0F63] to-purple-400 flex items-center justify-center shadow-md shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#3A0F63] uppercase tracking-[0.25em]">Most read</p>
                    <h2 className="text-2xl sm:text-3xl font-[900] text-slate-900 tracking-tight">Trending This Week</h2>
                  </div>
                </FadeInUp>

                <StaggerContainer className="grid sm:grid-cols-2 gap-3">
                  {trendingPosts.map((insight, i) => (
                    <StaggerItem key={insight.id}>
                      <TrendingCard insight={insight} rank={i} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 6 — NEWSLETTER CTA
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10">
        <NewsletterCTA />
      </div>

      {/* ══════════════════════════════════════════════════
          SECTION 7 — FOOTER
      ══════════════════════════════════════════════════ */}
      <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
