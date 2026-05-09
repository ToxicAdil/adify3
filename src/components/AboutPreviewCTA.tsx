import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Sparkles, Globe, TrendingUp, Cpu, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const trustStats = [
    { icon: <Clock size={16} />, text: '5+ Years Building Digital Systems' },
    { icon: <Sparkles size={16} />, text: 'AI-Powered Growth Strategies' },
    { icon: <Globe size={16} />, text: 'Multi-Industry Experience' },
    { icon: <TrendingUp size={16} />, text: 'Conversion-Focused Execution' },
];

export const AboutPreviewCTA: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-custom px-4 sm:px-[37px]">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                >
                    {/* Outer hover glow */}
                    <div className="absolute -inset-8 bg-primary/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

                    <div className="premium-card rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-14 lg:py-20 lg:px-16 overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-900/5">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">

                            {/* ============================================================
                                LEFT SIDE — VISUAL STORYTELLING STACK
                                ============================================================ */}
                            <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center order-2 lg:order-1">
                                {/* Ambient glow layer */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                                >
                                    <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/20 blur-[80px] rounded-full" />
                                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/15 blur-[60px] rounded-full" />
                                </motion.div>

                                {/* ── Main portrait card ── */}
                                <motion.div
                                    className="absolute w-[65%] max-w-[280px] aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl shadow-slate-900/20 border border-white/50 z-10"
                                    style={{ left: '10%', top: '5%' }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    animate={{ y: [-8, 8, -8] }}
                                >
                                    {/* dark tint overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                                        alt="Adibuz Leadership"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    {/* bottom label inside card */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
                                        <p className="text-white text-xs font-black uppercase tracking-wider">Adibuz Agency</p>
                                        <p className="text-white/60 text-[10px] font-medium">Digital Growth Experts</p>
                                    </div>
                                </motion.div>

                                {/* ── Secondary image card (bottom-right offset) ── */}
                                <motion.div
                                    className="absolute w-[44%] max-w-[180px] aspect-square rounded-[20px] overflow-hidden shadow-xl border border-white/60 z-20"
                                    style={{ right: '4%', bottom: '12%' }}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    animate={{ y: [6, -6, 6] }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
                                        alt="Strategy Team"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </motion.div>

                                {/* ── Floating Glass Card: AI-Driven ── */}
                                <motion.div
                                    className="absolute top-[8%] right-[4%] z-30 bg-white/90 backdrop-blur-md border border-white/70 shadow-lg px-4 py-3 rounded-2xl flex items-center gap-3"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    animate={{ y: [-5, 5, -5] }}
                                >
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                        <Cpu size={17} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core</p>
                                        <p className="text-sm font-bold text-slate-900 whitespace-nowrap">AI-Driven Systems</p>
                                    </div>
                                </motion.div>

                                {/* ── Floating Glass Card: Strategy First (dark) ── */}
                                <motion.div
                                    className="absolute bottom-[22%] left-[2%] z-30 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 shadow-xl px-4 py-3 rounded-2xl flex items-center gap-3"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                    animate={{ y: [5, -5, 5] }}
                                >
                                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                                        <Target size={17} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Focus</p>
                                        <p className="text-sm font-bold text-white whitespace-nowrap">Strategy First</p>
                                    </div>
                                </motion.div>

                                {/* ── Floating badge: Built for Scale ── */}
                                <motion.div
                                    className="absolute top-[50%] left-[-2%] z-30 bg-primary text-white backdrop-blur-md shadow-lg shadow-primary/30 px-3 py-2 rounded-xl flex items-center gap-2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                    animate={{ y: [-4, 4, -4] }}
                                >
                                    <Zap size={13} />
                                    <span className="text-[11px] font-black uppercase tracking-wider whitespace-nowrap">Built for Scale</span>
                                </motion.div>
                            </div>

                            {/* ============================================================
                                RIGHT SIDE — CONTENT
                                ============================================================ */}
                            <div className="space-y-10 text-center lg:text-left order-1 lg:order-2">



                                {/* Main Heading */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] font-black text-slate-900 tracking-tighter leading-[1.12]"
                                >
                                    Building Modern Brands{' '}
                                    <br className="hidden sm:block" />
                                    Through{' '}
                                    <span className="text-gradient">Intelligent Systems.</span>
                                </motion.h2>

                                {/* Subtext */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="space-y-4 text-base md:text-[17px] text-slate-500 font-medium leading-[1.75] max-w-xl mx-auto lg:mx-0"
                                >
                                    <p>
                                        Adibuz is a performance-focused digital growth agency helping brands scale through{' '}
                                        <span className="text-slate-700 font-semibold">AI automation</span>,{' '}
                                        <span className="text-slate-700 font-semibold">strategic marketing</span>, premium web experiences, and data-driven systems.
                                    </p>
                                    <p>
                                        We combine creativity, technology, and execution to build digital ecosystems designed for long-term growth.
                                    </p>
                                </motion.div>

                                {/* Trust Metrics Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0"
                                >
                                    {trustStats.map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 12 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.35 + i * 0.07 }}
                                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 border border-slate-100/80 hover:bg-white hover:shadow-md hover:shadow-purple-100/50 hover:border-primary/20 transition-all duration-300 group cursor-default"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                                                {stat.icon}
                                            </div>
                                            <span className="text-sm font-bold text-slate-700 leading-tight">
                                                {stat.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2"
                                >
                                    <MagneticButton>
                                        <Link
                                            to="/about"
                                            className="w-full sm:w-auto bg-slate-900 text-white px-9 py-[14px] rounded-full font-bold text-sm btn-premium flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 hover:scale-[1.03] transition-all duration-300"
                                        >
                                            Explore About Adibuz <ArrowRight size={17} />
                                        </Link>
                                    </MagneticButton>

                                    <MagneticButton>
                                        <Link
                                            to="/about#team"
                                            className="w-full sm:w-auto px-9 py-[14px] rounded-full font-bold text-sm text-slate-600 border border-slate-200 hover:bg-white hover:border-slate-300 hover:text-slate-900 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                                        >
                                            Meet The Team
                                        </Link>
                                    </MagneticButton>
                                </motion.div>
                            </div>
                        </div>

                        {/* Subtle background depth */}
                        <div className="absolute top-[-60px] right-[-60px] w-[480px] h-[480px] bg-primary/5 blur-[140px] rounded-full -z-10 pointer-events-none" />
                        <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] bg-purple-400/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/3 blur-[100px] rounded-full -z-10 pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
