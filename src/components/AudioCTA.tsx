import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ArrowRight, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

export const AudioCTA: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.log("Audio play error:", err);
                    // Standard browser behavior: cannot play audio without user interaction
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => setIsPlaying(false);
            const handlePause = () => setIsPlaying(false);
            const handlePlay = () => setIsPlaying(true);
            
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('play', handlePlay);
            
            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('play', handlePlay);
            };
        }
    }, []);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-custom px-[37px]">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                >
                    {/* Background Animated Glow */}
                    <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                    
                    <div className="premium-card rounded-[40px] p-8 md:p-16 lg:py-20 overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-purple-900/5">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
                            
                            {/* LEFT SIDE: AUDIO PLAYER UI */}
                            <div className="flex flex-col items-center lg:items-start gap-10">
                                <div className="flex items-center gap-8">
                                    {/* Minimal Circular Play Button */}
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={togglePlay}
                                        className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                                            isPlaying 
                                            ? "bg-slate-900 text-white scale-105 shadow-slate-900/40" 
                                            : "bg-white text-slate-900 hover:shadow-xl active:scale-95 border border-slate-100"
                                        }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isPlaying ? (
                                                <motion.div
                                                    key="pause"
                                                    initial={{ opacity: 0, rotate: -90 }}
                                                    animate={{ opacity: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, rotate: 90 }}
                                                >
                                                    <Pause size={36} fill="currentColor" stroke="none" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="play"
                                                    initial={{ opacity: 0, rotate: 90 }}
                                                    animate={{ opacity: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, rotate: -90 }}
                                                >
                                                    <Play size={36} className="ml-1.5" fill="currentColor" stroke="none" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>

                                    {/* Smooth Waveform Animation */}
                                    <div className="flex items-center gap-2 h-16">
                                        {[...Array(14)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-2 rounded-full"
                                                initial={{ height: 6, backgroundColor: "rgba(58, 15, 99, 0.1)" }}
                                                animate={isPlaying ? {
                                                    height: [12, 56, 18, 64, 12][(i % 5)],
                                                    backgroundColor: i % 2 === 0 ? "rgba(58, 15, 99, 0.8)" : "rgba(124, 58, 237, 0.8)"
                                                } : { 
                                                    height: 6, 
                                                    backgroundColor: "rgba(58, 15, 99, 0.1)" 
                                                }}
                                                transition={isPlaying ? {
                                                    repeat: Infinity,
                                                    duration: 0.6 + (i * 0.1),
                                                    ease: "easeInOut",
                                                    repeatType: "reverse"
                                                } : { duration: 0.4 }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 text-center lg:text-left">
                                    <div className="flex items-center justify-center lg:justify-start gap-3 text-primary">
                                        <div className={`p-2 rounded-full bg-primary/10 ${isPlaying ? 'animate-pulse' : ''}`}>
                                            <Volume2 size={18} />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Hear from us</span>
                                    </div>
                                    <p className="text-slate-500 font-bold max-w-sm">
                                        A quick audio message about how Adify systems can transform your growth trajectory.
                                    </p>
                                </div>

                                <audio ref={audioRef} src="/audio.mp3" preload="auto" />
                            </div>

                            {/* RIGHT SIDE: CONTENT */}
                            <div className="space-y-10 text-center lg:text-left">
                                <div className="space-y-6">
                                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05]">
                                        Still <span className="text-gradient">exploring?</span>
                                    </h2>
                                    <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                                        Let us show you how we help brands grow and scale with precision using AI-driven systems.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                    <MagneticButton>
                                        <Link 
                                            to="/work" 
                                            className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-base btn-premium flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 hover:scale-105 transition-transform"
                                        >
                                            View Our Work <ArrowRight size={20} />
                                        </Link>
                                    </MagneticButton>
                                    
                                    <MagneticButton>
                                        <Link 
                                            to="/about" 
                                            className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-base text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group"
                                        >
                                            About Adify
                                        </Link>
                                    </MagneticButton>
                                </div>
                            </div>

                        </div>

                        {/* Subtle Background Detail */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px] rounded-full -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
