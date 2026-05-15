'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import AdibuzLogo from '@/components/AdibuzLogo';
import { FadeInUp } from '@/lib/animations';

export function Footer() {
	return (
		<footer className="relative w-full flex flex-col items-center justify-center border-t border-slate-200/60 bg-white/60 backdrop-blur-2xl px-6 py-8 md:py-10">
			{/* Top glow accent */}
			<div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" style={{ background: 'linear-gradient(90deg, transparent, rgba(58,15,99,0.4), transparent)' }} />

			<div className="w-full max-w-7xl mx-auto flex flex-col items-center">
				{/* Center Logo */}
				<FadeInUp className="flex flex-col items-center justify-center py-6 md:py-10 lg:py-12">
					<AdibuzLogo height={80} />
				</FadeInUp>

				{/* Bottom Bar Container */}
				<div className="w-full border-t border-slate-200/80 pt-6 pb-2">
					<FadeInUp delay={0.2} className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
						{/* Left: Links & Email */}
						<div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 lg:gap-6 flex-1">
							<a href="/privacy" className="text-[13px] md:text-sm font-medium text-slate-500 hover:text-[#3A0F63] transition-colors">
								Privacy Policy
							</a>
							<a href="/terms" className="text-[13px] md:text-sm font-medium text-slate-500 hover:text-[#3A0F63] transition-colors">
								Terms of Use
							</a>
							<a href="mailto:hello@adibuz.com" className="px-5 py-2 rounded-full border border-slate-300/60 bg-white/60 hover:bg-white text-[13px] md:text-sm font-medium text-slate-600 hover:text-[#3A0F63] hover:shadow-sm transition-all">
								hello@adibuz.com
							</a>
						</div>

						{/* Center: Copyright */}
						<div className="flex-1 flex justify-center text-center">
							<p className="text-slate-400 text-xs md:text-[13px] font-medium">
								© {new Date().getFullYear()} Adibuz. All rights reserved.
							</p>
						</div>

						{/* Right: Socials */}
						<div className="flex-1 flex items-center justify-center lg:justify-end gap-6">
							<a href="https://instagram.com/adibuz" aria-label="Follow Adibuz on Instagram" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#3A0F63] transition-colors">
								<InstagramIcon className="w-5 h-5" aria-hidden="true" />
							</a>
							<a href="https://x.com/adibuz" aria-label="Follow Adibuz on X (Twitter)" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#3A0F63] transition-colors">
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
							</a>
							<a href="https://linkedin.com/company/adibuz" aria-label="Follow Adibuz on LinkedIn" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#3A0F63] transition-colors">
								<LinkedinIcon className="w-5 h-5" aria-hidden="true" />
							</a>
						</div>
					</FadeInUp>
				</div>
			</div>
		</footer>
	);
}

