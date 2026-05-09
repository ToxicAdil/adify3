import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Calendar, MessageCircle,
  Globe, Zap, Share2, Video, Sparkles, CheckCircle2, Workflow, LineChart, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdibuzLogo from '../components/AdibuzLogo';
import { SEO } from '@/components/SEO';

/* ─── Types ─────────────────────────────────────────────── */
interface ChatMessage { id: string; sender: 'bot' | 'user'; text: string; }
type FlowNode  = { botMessage: string; options: string[]; next: string | Record<string,string>; storeAs?: string; };
type FinalNode = { botMessage: string; options?: undefined; next?: undefined; };

/* ─── Flow Data (unchanged) ──────────────────────────────── */
const FLOWS: Record<string, FlowNode | FinalNode> = {
  start:   { botMessage: 'Hi there. What service are you looking for?', options: ['Website Development','AI Automation','Social Media Management','Video Editing'], storeAs:'service', next:{ 'Website Development':'web_1','AI Automation':'ai_1','Social Media Management':'smm_1','Video Editing':'video_1' } },
  web_1:   { botMessage:'What type of website do you need?', options:['Business Website','E-commerce Website','Landing Page','Not sure'], storeAs:'website_type', next:'web_2' },
  web_2:   { botMessage:'Do you already have a website?', options:['Yes','No'], storeAs:'has_website', next:'web_3' },
  web_3:   { botMessage:'What is your budget range?', options:['$100 – $300','$300 – $1000','$1000+'], storeAs:'budget', next:'web_4' },
  web_4:   { botMessage:'When do you want to start?', options:['Immediately','Within 1–2 weeks','Just exploring'], storeAs:'timeline', next:'final' },
  ai_1:    { botMessage:'What do you want to automate?', options:['Lead Generation','Chatbot / Customer Support','Workflow Automation','Not sure'], storeAs:'automation_type', next:'ai_2' },
  ai_2:    { botMessage:'Do you currently use any tools?', options:['Yes','No'], storeAs:'uses_tools', next:'ai_3' },
  ai_3:    { botMessage:'What is your monthly budget?', options:['Under $200','$200 – $1000','$1000+'], storeAs:'budget', next:'final' },
  smm_1:   { botMessage:'Which platform do you want help with?', options:['Instagram','LinkedIn','Both','Not sure'], storeAs:'platform', next:'smm_2' },
  smm_2:   { botMessage:'What is your goal?', options:['Growth','Leads','Branding'], storeAs:'goal', next:'smm_3' },
  smm_3:   { botMessage:'How active are you currently?', options:['Not active','Posting sometimes','Already active'], storeAs:'activity_level', next:'final' },
  video_1: { botMessage:'What type of videos?', options:['Reels / Shorts','YouTube Videos','Ads'], storeAs:'video_type', next:'video_2' },
  video_2: { botMessage:'How many videos per month?', options:['5 – 10','10 – 30','30+'], storeAs:'video_quantity', next:'final' },
  final:   { botMessage:"Analysis complete. 🚀 Our strategy team will reach out to you shortly. We're excited to help you scale." },
};

/* ─── Audio (unchanged) ──────────────────────────────────── */
const NODE_AUDIO: Record<string,string> = {
  start:'/audio/start.mp3', web_1:'/audio/web_step1.mp3', web_2:'/audio/web_step2.mp3',
  web_3:'/audio/web_step3.mp3', web_4:'/audio/web_step4.mp3', final:'/audio/final.mp3',
  ai_1:'/audio/ai_step1.mp3', ai_2:'/audio/ai_step2.mp3', ai_3:'/audio/ai_step3.mp3',
  smm_1:'/audio/social_step1.mp3', smm_2:'/audio/social_step2.mp3', smm_3:'/audio/social_step3.mp3',
  video_1:'/audio/video_step1.mp3', video_2:'/audio/video_step2.mp3',
};

function playAudio(url: string) {
  const audio = new Audio(url);
  audio.volume = 0.6;
  window.dispatchEvent(new CustomEvent('robot-speaking',{detail:{active:true}}));
  const stop = () => window.dispatchEvent(new CustomEvent('robot-speaking',{detail:{active:false}}));
  audio.addEventListener('ended',stop); audio.addEventListener('error',stop);
  audio.play().catch(stop);
}

const uid = () => Math.random().toString(36).substring(2,10);

/* ─── Service icon map ───────────────────────────────────── */
const SERVICE_ICONS: Record<string, React.ComponentType<any>> = {
  'Website Development': Globe,
  'AI Automation': Zap,
  'Social Media Management': Share2,
  'Video Editing': Video,
  'Business Website': Globe,
  'E-commerce Website': Target,
  'Landing Page': Workflow,
  'Lead Generation': LineChart,
  'Chatbot / Customer Support': MessageCircle,
  'Workflow Automation': Workflow,
  'Instagram': Sparkles,
  'LinkedIn': Share2,
  'Reels / Shorts': Video,
  'YouTube Videos': Video,
  'Ads': Target,
  'Yes': CheckCircle2,
  'No': ArrowLeft // Just placeholder
};

/* ─── Smiley AI Orb ─────────────────────────────────────── */
function SmileyAIOrb({ speaking }: { speaking: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[300px]">
      <motion.div
        className="relative w-56 h-56 rounded-[3.5rem] shadow-[0_20px_50px_rgba(58,15,99,0.4),_inset_0_2px_10px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #3b0764 100%)',
        }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        {/* Eyes with realistic blinking */}
        <motion.div 
          className="absolute top-[35%] left-[26%] w-10 h-10 bg-white rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] origin-center"
          animate={{ scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1, 1] }}
          transition={{ duration: 6, times: [0, 0.35, 0.37, 0.39, 0.5, 0.85, 0.87, 0.89, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[35%] right-[26%] w-10 h-10 bg-white rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] origin-center"
          animate={{ scaleY: [1, 1, 0.1, 1, 1, 1, 0.1, 1, 1] }}
          transition={{ duration: 6, times: [0, 0.35, 0.37, 0.39, 0.5, 0.85, 0.87, 0.89, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Mouth */}
        <div className="absolute bottom-[22%] flex items-center justify-center w-20 h-16">
          <svg width="60" height="45" viewBox="0 0 60 45" fill="white" className="drop-shadow-sm">
            <motion.path
              animate={speaking ? {
                d: [
                  "M 10 22 Q 30 10 50 22 Q 30 42 10 22", // Open mid
                  "M 18 22 Q 30 15 42 22 Q 30 35 18 22", // 'O' shape (narrower)
                  "M 12 22 Q 30 5 48 22 Q 30 45 12 22",  // Wide open
                  "M 15 22 Q 30 18 45 22 Q 30 32 15 22", // Half closed
                  "M 10 22 Q 30 10 50 22 Q 30 42 10 22"  // Back to start
                ],
                transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
              } : {
                // Perfect crescent smile (closed state)
                d: "M 8 18 Q 30 36 52 18 Q 30 46 8 18",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Premium Option Card ────────────────────────────── */
function PremiumOptionCard({ label, onClick, disabled, index }: { label: string; onClick: () => void; disabled: boolean; index: number }) {
  const Icon = SERVICE_ICONS[label] || Sparkles;
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full text-left p-4 rounded-2xl overflow-hidden bg-white/70 border border-purple-100/50 shadow-[0_4px_15px_rgba(0,0,0,0.02)] backdrop-blur-md disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
    >
      {/* Hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated border line on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shadow-inner group-hover:bg-purple-100 transition-colors">
          <Icon className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="text-sm font-bold text-slate-700 group-hover:text-purple-900 transition-colors">
          {label}
        </span>
      </div>
    </motion.button>
  );
}

/* ─── Floating Badge ─────────────────────────────────────── */
function FloatingBadge({ text, delay, xOffset, yOffset }: { text: string; delay: number; xOffset: number; yOffset: number }) {
  return (
    <motion.div
      className="absolute px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-[10px] font-bold uppercase tracking-widest text-purple-800"
      style={{ left: `calc(50% + ${xOffset}px)`, top: `calc(50% + ${yOffset}px)`, transform: 'translate(-50%, -50%)' }}
      animate={{ y: [yOffset, yOffset - 8, yOffset] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {text}
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ChatAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages]           = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode]     = useState('start');
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [isTyping, setIsTyping]           = useState(false);
  const [isComplete, setIsComplete]       = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const h = (e:any) => setIsSpeaking(e.detail?.active||false);
    window.addEventListener('robot-speaking',h);
    return () => window.removeEventListener('robot-speaking',h);
  },[]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior:'smooth' }), 50);
  },[]);

  useEffect(() => { scrollToBottom(); },[messages, isTyping, currentOptions, scrollToBottom]);

  const pushBot = useCallback((nodeKey:string) => {
    const node = FLOWS[nodeKey];
    if (!node) return;
    setIsTyping(true);
    setCurrentOptions([]);
    // Slightly longer delay for premium feel
    const delay = nodeKey==='start' ? 600 : 1000 + Math.random()*500;
    setTimeout(() => {
      setMessages(p => [...p,{id:uid(),sender:'bot',text:node.botMessage}]);
      setIsTyping(false);
      if (NODE_AUDIO[nodeKey]) playAudio(NODE_AUDIO[nodeKey]);
      if (node.options?.length) {
        setTimeout(() => { setCurrentOptions([...node.options!]); scrollToBottom(); }, 200);
      } else { setIsComplete(true); }
    }, delay);
  },[scrollToBottom]);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    pushBot('start');
  },[pushBot]);

  const handleOption = (opt:string) => {
    if (isTyping||isComplete) return;
    const node = FLOWS[currentNode];
    if (!node?.next) return;
    const nextKey = typeof node.next==='string' ? node.next : (node.next as Record<string,string>)[opt];
    setMessages(p => [...p,{id:uid(),sender:'user',text:opt}]);
    setCurrentOptions([]);
    if (nextKey) { setCurrentNode(nextKey); pushBot(nextKey); }
  };

  const hour = new Date().getHours();
  const greeting = hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';

  return (
    <div className="h-[100dvh] lg:min-h-screen flex flex-col overflow-hidden bg-[#fdfaff] font-sans selection:bg-purple-200">
      <SEO 
        title="Adibuz AI Assistant | Let's Talk Strategy"
        description="Interact with the Adibuz AI Assistant to find the right digital marketing and automation solutions for your business."
      />
      {/* ── Ambient Background Mesh ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.25), transparent 70%)' }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(232, 121, 249, 0.15), transparent 70%)' }}
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ── Top Bar ── */}
      <header className="relative z-50 px-6 py-4 flex items-center justify-between border-b border-slate-200/50 shrink-0 bg-white/40 backdrop-blur-xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-purple-700 transition-colors group px-4 py-2 rounded-full hover:bg-white/60">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Exit Consultation</span>
        </button>
        <AdibuzLogo height={48} className="drop-shadow-sm" />
        <div className="w-[120px]" /> {/* Spacer for balance */}
      </header>

      {/* ── Main Layout ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full max-w-6xl flex flex-col lg:flex-row-reverse overflow-hidden rounded-[32px] bg-white/60 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(58,15,99,0.1),_inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          {/* ═══ RIGHT PANEL (AI IDENTITY) ═══ */}
          <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden shrink-0 w-[45%] border-l border-slate-200/50 bg-gradient-to-b from-white/40 to-purple-50/30">
            {/* Background elements in panel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            
            {/* Main AI Orb */}
            <div className="relative mb-12 mt-8 flex-1 flex items-center justify-center">
              <SmileyAIOrb speaking={isSpeaking} />
            </div>
          </div>

          {/* ═══ RIGHT PANEL (CHAT EXPERIENCE) ═══ */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white/40">
            
            {/* Right Header */}
            <div className="px-8 py-6 border-b border-slate-200/50 bg-white/50 backdrop-blur-md shrink-0 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Project Qualification</h3>
                <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Adibuz Growth Engine</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border border-purple-200 shadow-sm">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8 min-h-0 space-y-6 scroll-smooth">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A0F63] to-purple-600 flex items-center justify-center mr-3 mt-1 shrink-0 shadow-lg shadow-purple-900/20">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`px-5 py-3.5 text-[14px] leading-relaxed max-w-[80%] font-medium shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-[#3A0F63] to-purple-600 text-white rounded-2xl rounded-tr-sm shadow-purple-900/20'
                          : 'bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-200/60'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Advanced Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A0F63] to-purple-600 flex items-center justify-center mt-1 shrink-0 shadow-lg shadow-purple-900/20">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200/60 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Analyzing...</span>
                    <div className="flex gap-1.5 items-center">
                      {[0, 0.15, 0.3].map((d, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d, ease: "easeInOut" }}
                          className="w-1.5 h-1.5 rounded-full bg-[#3A0F63]"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Final Completion UI */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col gap-4 pt-4 pb-8"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-2">Next Steps</h4>
                    <p className="text-sm text-slate-600 mb-6">Your customized growth blueprint is ready. Choose how you'd like to proceed.</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#3A0F63] to-purple-600 text-white text-[13px] font-bold shadow-lg shadow-purple-900/25 hover:shadow-purple-900/40 hover:-translate-y-0.5 transition-all"
                      >
                        <Calendar className="w-4 h-4" /> Book a Strategy Call
                      </a>
                      <a href="https://wa.me/919341586751" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 text-[13px] font-bold hover:bg-emerald-100 hover:-translate-y-0.5 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp Us
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Interactive Options Area */}
            <div className="px-6 pb-8 pt-4 bg-gradient-to-t from-white/90 to-transparent shrink-0">
              <AnimatePresence mode="wait">
                {currentOptions.length > 0 && (
                  <motion.div
                    key={currentNode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, staggerChildren: 0.1 }}
                    className="grid gap-3"
                    style={{ gridTemplateColumns: currentOptions.length <= 3 ? 'repeat(auto-fit,minmax(200px,1fr))' : 'repeat(2,1fr)' }}
                  >
                    {currentOptions.map((opt, i) => (
                      <PremiumOptionCard key={opt} label={opt} onClick={() => handleOption(opt)} disabled={isTyping} index={i} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </main>
    </div>
  );
}
