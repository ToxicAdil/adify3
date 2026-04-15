import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  User, 
  Bot, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdifyLogo from '../components/AdifyLogo';

const Robot3D = lazy(() => import('../components/Robot3D'));

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: string[];
  field?: string;
}

const STEPS = [
  {
    id: 'welcome',
    content: "Hi there! I'm the Adify Assistant. I'm here to help you scale your business with AI-driven marketing. What's your name?",
    field: 'name',
    type: 'input'
  },
  {
    id: 'service',
    content: (name: string) => `Nice to meet you, ${name}! Which service are you most interested in?`,
    options: ['Web Development', 'AI Automation', 'Performance Ads', 'Social Media Marketing', 'SEO Optimization'],
    field: 'service',
    type: 'options'
  },
  {
    id: 'budget',
    content: "Great choice. What's your monthly marketing budget range?",
    options: ['$1,000 - $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+'],
    field: 'budget',
    type: 'options'
  },
  {
    id: 'goal',
    content: "What's your primary goal for this project?",
    options: ['Increase Revenue', 'Lead Generation', 'Brand Awareness', 'Scale Operations'],
    field: 'goal',
    type: 'options'
  },
  {
    id: 'contact',
    content: "Almost done! What's the best email address to reach you at?",
    field: 'email',
    type: 'input'
  },
  {
    id: 'final',
    content: "Thank you! I've analyzed your requirements. One of our strategists will reach out to you within 24 hours with a custom growth plan.",
    type: 'final'
  }
];

export default function ChatAssistantPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Initial message
    addBotMessage(STEPS[0]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (step: any) => {
    setIsTyping(true);
    setTimeout(() => {
      const content = typeof step.content === 'function' ? step.content(formData.name || '') : step.content;
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'bot',
        content,
        options: step.options,
        field: step.field
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleUserInput = (value: string) => {
    if (!value.trim()) return;

    const currentStep = STEPS[currentStepIndex];
    
    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: value
    };
    setMessages(prev => [...prev, userMsg]);
    
    // Update form data
    const newFormData = { ...formData, [currentStep.field!]: value };
    setFormData(newFormData);
    setInputValue('');

    // Move to next step
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStepIndex(nextIndex);
      addBotMessage(STEPS[nextIndex]);
    }
  };

  const handleOptionClick = (option: string) => {
    handleUserInput(option);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-primary selection:text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(58,15,99,0.04),transparent_60%)] pointer-events-none" />
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-slate-200 backdrop-blur-md sticky top-0 z-50 bg-white/70">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-6">
          <AdifyLogo height={28} />
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-900">Adify Assistant</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Active Now</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </header>

      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full relative overflow-hidden">
        {/* Left Side: 3D Robot Character */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-8 relative bg-[#F8FAFC]" style={{ minHeight: '600px' }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,15,99,0.05),transparent_70%)]" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative w-full"
            style={{ height: '420px' }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#3A0F63]/20 border-t-[#3A0F63] animate-spin" />
              </div>
            }>
              <Robot3D />
            </Suspense>
          </motion.div>

          <div className="mt-6 text-center max-w-sm space-y-4 relative z-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Project Qualification</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Answer a few questions to help us understand your business needs and route your request to the right specialist.
            </p>
          </div>
        </div>

        {/* Right Side: Chat Interface */}
        <div className="flex-[1.5] flex flex-col h-[calc(100vh-80px)] lg:h-auto">
          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-4 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                      msg.type === 'user' ? 'bg-slate-100 border border-slate-200' : 'bg-primary/10 border border-primary/20'
                    }`}>
                      {msg.type === 'user' ? <User className="w-4 h-4 text-slate-600" /> : <Bot className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.type === 'user' 
                          ? 'bg-[#3A0F63] text-white rounded-tr-none' 
                          : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>

                      {/* Bot Options */}
                      {msg.type === 'bot' && msg.options && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {msg.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleOptionClick(option)}
                              disabled={messages[messages.length - 1].id !== msg.id}
                              className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-all text-xs font-medium shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-200 bg-white/70 backdrop-blur-md relative z-10">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleUserInput(inputValue);
              }}
              className="relative max-w-3xl mx-auto"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping || !!STEPS[currentStepIndex].options}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 text-slate-900 placeholder:text-slate-400 shadow-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping || !!STEPS[currentStepIndex].options}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#3A0F63] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:pointer-events-none shadow-lg"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-bold">
              Powered by Adify AI
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
