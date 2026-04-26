import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  ArrowLeft,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdibuzLogo from '../components/AdibuzLogo';


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

const INTRO_AUDIO_URL = '/audio/start.mp3';

/* Audio URL map — nodeKey → local file */
const NODE_AUDIO: Record<string, string> = {
  start:  '/audio/start.mp3',
  web_1:  '/audio/web_step1.mp3',
  web_2:  '/audio/web_step2.mp3',
  web_3:  '/audio/web_step3.mp3',
  web_4:  '/audio/web_step4.mp3',
  final:  '/audio/final.mp3',
  ai_1:   '/audio/ai_step1.mp3',
  ai_2:   '/audio/ai_step2.mp3',
  ai_3:   '/audio/ai_step3.mp3',
  smm_1:  '/audio/social_step1.mp3',
  smm_2:  '/audio/social_step2.mp3',
  smm_3:  '/audio/social_step3.mp3',
  video_1: '/audio/video_step1.mp3',
  video_2: '/audio/video_step2.mp3',
};

/* Plays audio and fires robot-speaking events for lip-sync */
function playAudio(url: string): HTMLAudioElement {
  const audio = new Audio(url);
  audio.volume = 0.6;
  window.dispatchEvent(new CustomEvent('robot-speaking', { detail: { active: true } }));
  const stop = () => window.dispatchEvent(new CustomEvent('robot-speaking', { detail: { active: false } }));
  audio.addEventListener('ended', stop);
  audio.addEventListener('error', stop);
  audio.play().catch(stop);
  return audio;
}

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleSpeaking = (e: any) => {
      setIsSpeaking(e.detail?.active || false);
    };
    window.addEventListener('robot-speaking', handleSpeaking);
    return () => window.removeEventListener('robot-speaking', handleSpeaking);
  }, []);

  /* ── Scroll ── */
  useEffect(() => {
    if (scrollRef.current) {
      // Scroll chat container
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, 100);

      // On mobile, also scroll the window to ensure the options area at the bottom isn't hidden by the browser UI
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 150);
      }
    }
  }, [messages, isTyping, currentOptions]);

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

      // Play node voice + trigger robot lip-sync
      if (NODE_AUDIO[nodeKey]) playAudio(NODE_AUDIO[nodeKey]);

      if (node.options) {
        // Show options after a brief pause
        setTimeout(() => setCurrentOptions(node.options!), 150);
      } else {
        setIsComplete(true);
      }
    }, delay);
  }, []);


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
    <div className="h-[100dvh] lg:h-auto lg:min-h-screen flex flex-col font-sans overflow-hidden lg:overflow-visible" style={{ background: '#F3F0F8' }}>

      {/* ── Top Bar ── */}
      <header className="px-4 py-3 sm:px-6 flex items-center justify-between bg-white/60 backdrop-blur-md border-b border-slate-200/60 shrink-0 z-50">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs hidden sm:inline font-medium">Back</span>
        </button>
        <AdibuzLogo height={48} />
        <div className="w-14" />
      </header>

      {/* ── Centered Container ── */}
      <main className="flex-1 flex items-stretch lg:items-start justify-center p-4 sm:p-6 lg:py-8 min-h-0">
        <div
          className="w-full flex flex-col lg:flex-row overflow-hidden bg-white h-full lg:h-auto lg:min-h-[min(680px,calc(100vh-120px))] lg:max-h-[calc(100vh-120px)]"
          style={{
            maxWidth: 1140,
            borderRadius: 20,
            boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
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
              className="relative w-full px-6 flex items-center justify-center"
              style={{ height: 300 }}
            >
              <div 
                className="w-[180px] h-[144px] bg-[#3A0F63] border-[5px] border-white/30 shadow-[0_20px_60px_rgba(58,15,99,0.3)] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
                style={{ borderRadius: '38%' }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                <div className="flex flex-col items-center gap-4 relative z-10 pt-3">
                  {/* Eyes */}
                  <div className="flex gap-6">
                    <motion.div 
                      animate={{ 
                        scaleY: [1, 0.1, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ 
                        duration: 0.2, 
                        repeat: Infinity, 
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                      className="w-[26px] h-[26px] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.6)] origin-center" 
                    />
                    <motion.div 
                      animate={{ 
                        scaleY: [1, 0.1, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{ 
                        duration: 0.2, 
                        repeat: Infinity, 
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                      className="w-[26px] h-[26px] rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.6)] origin-center" 
                    />
                  </div>
                  {/* Smile / Mouth */}
                  <motion.svg 
                    width="65" 
                    height="18" 
                    viewBox="0 0 20 6" 
                    fill="none" 
                    animate={isSpeaking ? { scaleY: [1, 1.2, 1.05, 1.35, 1, 1.15, 1.05] } : { scaleY: 1 }}
                    transition={isSpeaking ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
                    className="origin-top"
                  >
                    <path 
                      d="M4 1.5C4 1.5 7.5 4.5 10 4.5C12.5 4.5 16 1.5 16 1.5" 
                      stroke="white" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                    />
                  </motion.svg>
                </div>

                <motion.div
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-white"
                />
              </div>
            </motion.div>

            <div className="text-center max-w-[260px] space-y-1.5 relative z-10 mt-2 mb-6">
              <h2 className="text-lg font-bold tracking-tight text-slate-800">Adibuz Assistant</h2>
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
                      href="https://wa.me/919341586751"
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
                Powered by Adibuz
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
