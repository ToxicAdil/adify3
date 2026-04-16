import React, { useState, useEffect, useRef, Suspense, lazy, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  ArrowLeft,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdifyLogo from '../components/AdifyLogo';

const Robot3D = lazy(() => import('../components/Robot3D'));

/* ═══════════════════════ Types ═══════════════════════ */

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

/* ═══════════════════════ Flow Data ═══════════════════ */

type FlowNode = {
  botMessage: string;
  options: string[];
  next: string | Record<string, string>;
  storeAs?: string;
};

type FinalNode = {
  botMessage: string;
  options?: undefined;
  next?: undefined;
};

const FLOWS: Record<string, FlowNode | FinalNode> = {
  start: {
    botMessage: 'Hi there. What service are you looking for?',
    options: ['Website Development', 'AI Automation', 'Social Media Management', 'Video Editing'],
    storeAs: 'service',
    next: {
      'Website Development': 'web_1',
      'AI Automation': 'ai_1',
      'Social Media Management': 'smm_1',
      'Video Editing': 'video_1',
    },
  },

  // Website Development
  web_1: { botMessage: 'What type of website do you need?', options: ['Business Website', 'E-commerce Website', 'Landing Page', 'Not sure'], storeAs: 'website_type', next: 'web_2' },
  web_2: { botMessage: 'Do you already have a website?', options: ['Yes', 'No'], storeAs: 'has_website', next: 'web_3' },
  web_3: { botMessage: 'What is your budget range?', options: ['$100 – $300', '$300 – $1000', '$1000+'], storeAs: 'budget', next: 'web_4' },
  web_4: { botMessage: 'When do you want to start?', options: ['Immediately', 'Within 1–2 weeks', 'Just exploring'], storeAs: 'timeline', next: 'final' },

  // AI Automation
  ai_1: { botMessage: 'What do you want to automate?', options: ['Lead Generation', 'Chatbot / Customer Support', 'Workflow Automation', 'Not sure'], storeAs: 'automation_type', next: 'ai_2' },
  ai_2: { botMessage: 'Do you currently use any tools?', options: ['Yes', 'No'], storeAs: 'uses_tools', next: 'ai_3' },
  ai_3: { botMessage: 'What is your monthly budget?', options: ['Under $200', '$200 – $1000', '$1000+'], storeAs: 'budget', next: 'final' },

  // Social Media Management
  smm_1: { botMessage: 'Which platform do you want help with?', options: ['Instagram', 'LinkedIn', 'Both', 'Not sure'], storeAs: 'platform', next: 'smm_2' },
  smm_2: { botMessage: 'What is your goal?', options: ['Growth', 'Leads', 'Branding'], storeAs: 'goal', next: 'smm_3' },
  smm_3: { botMessage: 'How active are you currently?', options: ['Not active', 'Posting sometimes', 'Already active'], storeAs: 'activity_level', next: 'final' },

  // Video Editing
  video_1: { botMessage: 'What type of videos?', options: ['Reels / Shorts', 'YouTube Videos', 'Ads'], storeAs: 'video_type', next: 'video_2' },
  video_2: { botMessage: 'How many videos per month?', options: ['5 – 10', '10 – 30', '30+'], storeAs: 'video_quantity', next: 'final' },

  // Final
  final: { botMessage: "Thanks! 🚀 Our team will reach out to you shortly. We're excited to help you grow." },
};

/* ═══════════════════════ Utils ═══════════════════════ */

const uid = () => Math.random().toString(36).substring(2, 10);

/* ═══════════════════════ Component ═══════════════════ */

const INTRO_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303454/start.mp3_k0iebg.mp3';
const WEB_DEV_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303454/web_step1_k0bw4f.mp3';
const WEB_STEP2_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303452/web_step2_jenuj3.mp3';
const WEB_STEP3_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303454/web_step3_lc1jhu.mp3';
const WEB_STEP4_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303455/web_step4_qeh0cl.mp3';
const FINAL_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303454/final_emrrzq.mp3';
const AI_STEP1_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303452/ai_step_1_ijn5jh.mp3';
const AI_STEP2_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303453/ai_step_2_lrmddn.mp3';
const AI_STEP3_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303453/ai_step_3_zcufs1.mp3';
const SOCIAL_STEP1_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303452/social_step_1_xr3w6d.mp3';
const SOCIAL_STEP2_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303452/social_step_2_ujiuvf.mp3';
const SOCIAL_STEP3_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303453/social_step_3_nllyxd.mp3';
const VIDEO_STEP1_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303454/video_step_1_xqycwe.mp3';
const VIDEO_STEP2_AUDIO_URL = 'https://res.cloudinary.com/dtzo88csm/video/upload/v1776303454/video_step_2_y5adyo.mp3';

export default function ChatAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState('start');
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ── Scroll ── */
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 80);
    }
  }, [messages, isTyping]);

  /* ── Push bot message ── */
  const pushBot = useCallback((nodeKey: string) => {
    const node = FLOWS[nodeKey];
    if (!node) return;

    setIsTyping(true);
    setCurrentOptions([]);
    const delay = nodeKey === 'start' ? 400 : 600 + Math.random() * 300;

    setTimeout(() => {
      setMessages((prev) => {
        const lastBot = [...prev].reverse().find((m) => m.sender === 'bot');
        if (lastBot && lastBot.text === node.botMessage) return prev;
        return [...prev, { id: uid(), sender: 'bot', text: node.botMessage }];
      });
      setIsTyping(false);

      // Play specific node audio
      if (nodeKey === 'web_2') {
        const audio = new Audio(WEB_STEP2_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'web_3') {
        const audio = new Audio(WEB_STEP3_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'web_4') {
        const audio = new Audio(WEB_STEP4_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'final') {
        const audio = new Audio(FINAL_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'ai_1') {
        const audio = new Audio(AI_STEP1_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'ai_2') {
        const audio = new Audio(AI_STEP2_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'ai_3') {
        const audio = new Audio(AI_STEP3_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'smm_1') {
        const audio = new Audio(SOCIAL_STEP1_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'smm_2') {
        const audio = new Audio(SOCIAL_STEP2_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'smm_3') {
        const audio = new Audio(SOCIAL_STEP3_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'video_1') {
        const audio = new Audio(VIDEO_STEP1_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      } else if (nodeKey === 'video_2') {
        const audio = new Audio(VIDEO_STEP2_AUDIO_URL);
        audio.volume = 0.6;
        audio.play().catch(() => {});
      }

      if (node.options) {
        // Show options after a brief pause
        setTimeout(() => setCurrentOptions(node.options!), 150);
      } else {
        setIsComplete(true);
      }
    }, delay);
  }, []);

  /* ── Intro audio ── */
  useEffect(() => {
    const audio = new Audio(INTRO_AUDIO_URL);
    audio.volume = 0.6;
    audioRef.current = audio;
    audio.play().catch(() => {
      // Autoplay blocked — silently ignore; browser policy may require user interaction first
    });
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []); // run once on mount

  /* ── Init ── */
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      pushBot('start');
    }
  }, [hasStarted, pushBot]);

  /* ── Next node resolver ── */
  const getNextNode = (nodeKey: string, answer: string): string | null => {
    const node = FLOWS[nodeKey];
    if (!node?.next) return null;
    if (typeof node.next === 'string') return node.next;
    return (node.next as Record<string, string>)[answer] || null;
  };

  /* ── Option click ── */
  const handleOption = (option: string) => {
    if (isTyping || isComplete) return;

    // Play sound for specific selections
    if (option === 'Website Development') {
      const audio = new Audio(WEB_DEV_AUDIO_URL);
      audio.volume = 0.6;
      audio.play().catch(() => {});
    }

    // User selection message
    setMessages((prev) => [...prev, { id: uid(), sender: 'user', text: option }]);
    setCurrentOptions([]);

    const nextKey = getNextNode(currentNode, option);
    if (nextKey) {
      setCurrentNode(nextKey);
      pushBot(nextKey);
    }
  };

  /* ═══════════════════════ Render ═══════════════════════ */

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: '#F3F0F8' }}>

      {/* ── Top Bar ── */}
      <header className="px-4 py-3 sm:px-6 flex items-center justify-between bg-white/60 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs hidden sm:inline font-medium">Back</span>
        </button>
        <AdifyLogo height={36} />
        <div className="w-14" />
      </header>

      {/* ── Centered Container ── */}
      <main className="flex-1 flex items-start justify-center px-4 py-6 sm:py-8">
        <div
          className="w-full flex flex-col lg:flex-row overflow-hidden"
          style={{
            maxWidth: 1140,
            borderRadius: 20,
            boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            background: '#fff',
            minHeight: 'min(680px, calc(100vh - 120px))',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >

          {/* ═══ LEFT PANEL — Robot ═══ */}
          <div
            className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              width: '40%',
              minWidth: 380,
              background: 'linear-gradient(160deg, #F9F5FF 0%, #F3EEFF 40%, #EDE5FF 100%)',
              borderRight: '1px solid rgba(168,85,247,0.08)',
              borderRadius: '20px 0 0 20px',
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.07), transparent 65%)' }} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full px-6"
              style={{ height: 380 }}
            >
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[#A855F7]/20 border-t-[#A855F7] animate-spin" />
                </div>
              }>
                <Robot3D />
              </Suspense>
            </motion.div>

            <div className="text-center max-w-[260px] space-y-1.5 relative z-10 mt-2 mb-6">
              <h2 className="text-lg font-bold tracking-tight text-slate-800">Adify Assistant</h2>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Your AI-powered guide to finding the right solution.
              </p>
            </div>
          </div>

          {/* ═══ RIGHT PANEL — Chat ═══ */}
          <div className="flex-1 flex flex-col min-w-0 bg-white" style={{ borderRadius: '0 20px 20px 0' }}>

            {/* Header */}
            <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">Project Qualification</h3>
              <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 leading-relaxed">
                Answer a few quick prompts so we can route your request correctly.
              </p>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 sm:px-8 py-5">
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`px-4 py-2.5 text-[13px] sm:text-sm leading-relaxed max-w-[85%] ${
                        msg.sender === 'user'
                          ? 'bg-[#A855F7] text-white rounded-2xl rounded-tr-md'
                          : 'bg-slate-100/80 text-slate-700 rounded-2xl rounded-tl-md'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-slate-100/80 px-4 py-2.5 rounded-2xl rounded-tl-md flex gap-1.5 items-center">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  </motion.div>
                )}

                {/* Final CTA */}
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.35 }}
                    className="flex flex-wrap gap-2.5 pt-3"
                  >
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A855F7] text-white text-xs font-medium hover:bg-[#9333EA] active:scale-[0.97] transition-all shadow-sm shadow-[#A855F7]/15"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book a Call
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium hover:bg-emerald-100 active:scale-[0.97] transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp Us
                    </a>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Bottom: Option Buttons (Scaledek-style grid) ── */}
            <div className="px-6 sm:px-8 pb-5 pt-3 border-t border-slate-100 bg-white" style={{ borderRadius: '0 0 20px 0' }}>
              <AnimatePresence mode="wait">
                {currentOptions.length > 0 && (
                  <motion.div
                    key={currentNode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="grid gap-2.5"
                    style={{ gridTemplateColumns: currentOptions.length <= 3 ? 'repeat(auto-fit, minmax(0, 1fr))' : 'repeat(2, 1fr)' }}
                  >
                    {currentOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOption(opt)}
                        disabled={isTyping}
                        className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-[13px] sm:text-sm font-medium hover:border-[#A855F7]/40 hover:bg-[#A855F7]/[0.03] hover:text-[#7C3AED] active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Powered by */}
              <p className="text-[8px] text-slate-300 mt-3 uppercase tracking-[0.15em] font-semibold text-center">
                Powered by Adify
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
