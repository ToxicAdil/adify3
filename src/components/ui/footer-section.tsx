'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import AdifyLogo from '@/components/AdifyLogo';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Services',
		links: [
			{ title: 'Strategic Marketing', href: '#strategic-marketing' },
			{ title: 'Social Media', href: '#services' },
			{ title: 'Automation', href: '#services' },
			{ title: 'Web Development', href: '#web-development' },
			{ title: 'SEO', href: '#seo' },
			{ title: 'Visual Branding', href: '#visual-branding' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about' },
			{ title: 'Clients', href: '#clients' },
			{ title: 'Reviews', href: '#reviews' },
			{ title: 'FAQs', href: '#faqs' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Case Studies', href: '#clients' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
		],
	},
	{
		label: 'Connect',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full flex flex-col items-center justify-center border-t border-slate-200/60 bg-white/60 backdrop-blur-2xl px-6 py-12 lg:py-16">
			{/* Top glow accent */}
			<div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" style={{ background: 'linear-gradient(90deg, transparent, rgba(58,15,99,0.4), transparent)' }} />

			<div className="w-full max-w-6xl mx-auto">
			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<AdifyLogo height={52} />
					<p className="text-slate-400 mt-8 text-sm font-medium md:mt-0">
						We build high-performing marketing systems that drive real revenue, not just clicks.
					</p>
					<p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
						© {new Date().getFullYear()} Adibuz. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.15em]">{section.label}</h3>
								<ul className="mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="text-slate-400 hover:text-[#3A0F63] inline-flex items-center transition-all duration-300 font-medium min-h-[36px] py-1"
											>
												{link.icon && <link.icon className="me-1.5 size-3.5" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	key?: string;
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
