import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { insightService } from '../../services/insightService';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await insightService.subscribeNewsletter(email);
      setStatus('success');
      setMessage('Welcome aboard! You are successfully subscribed.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="my-24 container-custom"
    >
      <div className="relative rounded-[40px] overflow-hidden bg-[#3A0F63] text-white p-10 sm:p-16 lg:p-24 text-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-r from-purple-500/20 to-transparent blur-[120px] rounded-full rotate-12" />
          <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-l from-blue-500/20 to-transparent blur-[120px] rounded-full -rotate-12" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Stay ahead of the curve.
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-10 opacity-90 leading-relaxed">
            Join 5,000+ founders and marketers receiving our weekly insights on AI, growth systems, and digital strategy.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                disabled={status === 'loading' || status === 'success'}
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-purple-200 px-6 py-4 rounded-full outline-none focus:bg-white/15 focus:border-white/40 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-2 bottom-2 bg-white text-[#3A0F63] px-6 rounded-full font-bold hover:bg-purple-50 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-[#3A0F63] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Subscribe <Send className="w-4 h-4" /></>
                )}
              </button>
            </div>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-green-300 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> {message}
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-red-300 text-sm font-medium">
                <AlertCircle className="w-4 h-4" /> {message}
              </motion.div>
            )}
          </form>
          
          <p className="mt-12 text-sm text-purple-200/60">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
