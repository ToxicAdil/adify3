import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useInsightDetail } from '../hooks/useInsights';
import { ReadingProgress } from '../components/insights/ReadingProgress';
import { RelatedInsights } from '../components/insights/RelatedInsights';
import { NewsletterCTA } from '../components/insights/NewsletterCTA';
import { SimpleHeader } from '@/components/ui/simple-header';
import { Footer } from '@/components/ui/footer-section';
import CustomCursor from '../components/CustomCursor';
import { SEO } from '@/components/SEO';

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { insight, related, loading, error } = useInsightDetail(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-24">
        <div className="w-10 h-10 border-4 border-[#3A0F63]/20 border-t-[#3A0F63] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !insight) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center pt-24 px-4 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
        <p className="text-slate-600 mb-8">The insight you're looking for doesn't exist or has been removed.</p>
        <Link to="/insights" className="text-[#3A0F63] font-semibold flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(insight.created_at));

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#fdfaff] selection:bg-primary selection:text-white relative">
      {/* Background Gradients to match the home page */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 15% 50%, rgba(167, 139, 250, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(109, 40, 217, 0.08) 0%, transparent 50%)`,
        backgroundAttachment: 'fixed'
      }} />

      <CustomCursor />
      <SimpleHeader dark={false} />
      
      <SEO 
        title={`${insight.seo_title || insight.title} | Adibuz Insights`}
        description={insight.seo_description || insight.excerpt}
        ogImage={insight.featured_image}
      />

      <div className="relative z-10">
        <ReadingProgress />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-white border-b border-slate-200">
        <div className="container-custom relative z-10 max-w-4xl">
          <Link to="/insights" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#3A0F63] font-medium text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all insights
          </Link>

          {insight.category && (
            <div className="mb-6">
              <span className="px-3 py-1 bg-[#3A0F63]/10 text-[#3A0F63] text-xs font-bold tracking-widest uppercase rounded-full">
                {insight.category.name}
              </span>
            </div>
          )}

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-[1.15] tracking-tight"
          >
            {insight.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-6 text-slate-600 text-sm sm:text-base font-medium"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#3A0F63] font-bold">
                {insight.author_name.charAt(0)}
              </div>
              <span className="text-slate-900 font-semibold">{insight.author_name}</span>
            </div>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
            
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formattedDate}
            </span>
            
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
            
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {insight.read_time} min read
            </span>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container-custom max-w-5xl -mt-8 sm:-mt-12 relative z-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video w-full rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl bg-slate-100"
        >
          <img 
            src={insight.featured_image} 
            alt={insight.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Content Body */}
      <div className="container-custom max-w-4xl pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Social Share (Sticky) */}
          <div className="hidden lg:block w-16 shrink-0">
            <div className="sticky top-32 flex flex-col gap-4 items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 rotate-180" style={{ writingMode: 'vertical-rl' }}>Share</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(insight.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-md transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(insight.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:shadow-md transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-[#3A0F63] prose-img:rounded-2xl max-w-none"
            >
              <ReactMarkdown>{insight.content}</ReactMarkdown>
            </motion.div>

            {/* Mobile Share */}
            <div className="lg:hidden mt-12 pt-8 border-t border-slate-200 flex items-center gap-4">
              <span className="font-semibold text-slate-900 flex items-center gap-2"><Share2 className="w-4 h-4" /> Share:</span>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(insight.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#1DA1F2] p-2">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(insight.title)}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#0A66C2] p-2">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <RelatedInsights insights={related} />
      <NewsletterCTA />
      </div>
      
      <React.Suspense fallback={<div style={{ minHeight: '300px' }} />}>
        <Footer />
      </React.Suspense>
    </div>
  );
}
