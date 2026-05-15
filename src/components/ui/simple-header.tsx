import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import AdibuzLogo from '../AdibuzLogo';
import MagneticButton from '../MagneticButton';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export function SimpleHeader({ dark = false }: { dark?: boolean }) {
	const [open, setOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ label: 'Home', id: 'home', path: '/' },
		{ label: 'Services', id: 'services', path: '/#services' },
		{ label: 'Clients', id: 'clients', path: '/#clients' },
		{ label: 'Work', id: 'work', path: '/work' },
		{ label: 'Insights', id: 'insights', path: '/insights' },
		{ label: 'About', id: 'about', path: '/about' }
	];

	const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		if (window.location.pathname !== '/') return;
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			window.history.pushState(null, '', `#${id}`);
		}
		setOpen(false);
	};

	return (
		<motion.header 
			initial={{ y: -40, opacity: 0, filter: "blur(12px)" }}
			animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
			transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
			className={cn(
				"fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
				isScrolled ? "py-4" : "py-6"
			)}
		>
			<nav className="container-custom flex justify-center">
				<motion.div 
					layout
					transition={{ type: "spring", stiffness: 400, damping: 30 }}
					className={cn(
						"flex items-center justify-between transition-all duration-500 w-full",
						isScrolled 
							? dark 
								? "bg-black/90 backdrop-blur-md border border-white/10 rounded-[16px] px-6 sm:px-8 py-3 shadow-lg max-w-5xl"
								: "bg-[#ffffff] border border-slate-100 rounded-[16px] px-6 sm:px-8 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] max-w-5xl"
							: "py-2 px-2 max-w-7xl"
					)}
				>
					<Link to="/" className="flex items-center group cursor-pointer">
						<AdibuzLogo height={isScrolled ? 36 : 44} className={cn("transition-all duration-500 group-hover:scale-[1.02]", dark && "brightness-0 invert")} />
					</Link>

					<div className="hidden lg:flex items-center gap-6 xl:gap-10">
						{navItems.map((item) => {
							const isHash = item.path?.includes('#');
							const isActive = window.location.pathname === item.path || (window.location.pathname === '/' && item.id === 'home');
							
							return item.path && !isHash ? (
								<Link 
									key={item.label} 
									to={item.path}
									className={cn(
										"relative text-[13px] font-semibold transition-colors tracking-wide group pb-1",
										dark 
											? isActive ? "text-purple-400" : "text-slate-400 hover:text-white"
											: isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
									)}
								>
									{item.label}
									<div className={cn("absolute -bottom-[6px] left-0 w-full h-[3px] rounded-full origin-center transition-transform duration-300 scale-x-0 group-hover:scale-x-100", dark ? "bg-purple-400" : "bg-primary")} />
								</Link>
							) : (
								<a 
									key={item.label} 
									href={item.path}
									onClick={(e) => handleScrollTo(e, item.id)}
									className={cn(
										"relative text-[13px] font-semibold transition-colors tracking-wide group pb-1",
										dark 
											? isActive ? "text-purple-400" : "text-slate-400 hover:text-white"
											: isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
									)}
								>
									{item.label}
									<div className={cn("absolute -bottom-[6px] left-0 w-full h-[3px] rounded-full origin-center transition-transform duration-300 scale-x-0 group-hover:scale-x-100", dark ? "bg-purple-400" : "bg-primary")} />
								</a>
							);
						})}
					</div>

					<div className="flex items-center gap-4 lg:gap-6">
						<div className="hidden sm:flex items-center gap-4 lg:gap-6">
							<MagneticButton>
								<button 
									data-cursor-text="Chat"
									aria-label="Open live chat"
									className={cn(
										"text-[13px] font-bold transition-opacity",
										dark ? "text-slate-300 hover:text-white" : "text-slate-900 hover:opacity-70"
									)}
								>
									Chat Now
								</button>
							</MagneticButton>
							<MagneticButton>
								<button 
									data-cursor-text="Join"
									aria-label="Get started with Adibuz"
									className={cn(
										"px-6 py-2.5 rounded-full text-[13px] font-bold transition-all",
										dark 
											? "bg-[#3A0F63] text-white hover:bg-purple-900 border border-purple-500/30 shadow-[0_0_20px_rgba(58,15,99,0.5)]"
											: "bg-slate-900 text-white btn-premium primary-button"
									)}
								>
									Get Started
								</button>
							</MagneticButton>
						</div>

						<Sheet open={open} onOpenChange={setOpen}>
							<Button 
								size="icon" 
								variant="ghost" 
								aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
								aria-expanded={open}
								aria-controls="mobile-nav"
								className={cn("lg:hidden p-2 hover:bg-transparent min-h-[44px] min-w-[44px]", dark ? "text-slate-300" : "text-slate-600")}>
								<MenuToggle
									strokeWidth={2.5}
									open={open}
									onOpenChange={setOpen}
									className="size-6"
								/>
							</Button>
							<SheetContent
								className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg border-r-0 sm:border-r"
								showClose={false}
								side="left"
							>
								<div className="flex flex-col gap-y-4 px-6 pt-20 pb-10 overflow-y-auto">
									<div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-6">
										<AdibuzLogo height={48} className={cn(dark && "brightness-0 invert")} />
									</div>
									{navItems.map((item) => (
										item.path && !item.path.includes('#') ? (
											<Link
												key={item.label}
												to={item.path}
												className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-primary transition-colors py-3 min-h-[48px] flex items-center"
												onClick={() => setOpen(false)}
											>
												{item.label}
											</Link>
										) : (
											<a
												key={item.label}
												href={item.path}
												className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-primary transition-colors py-3 min-h-[48px] flex items-center"
												onClick={(e) => handleScrollTo(e, item.id)}
											>
												{item.label}
											</a>
										)
									))}
								</div>
								<SheetFooter className="flex flex-col gap-4 p-6 bg-slate-50/50 border-t mt-auto">
									<Button 
										variant="outline" 
										className="w-full rounded-xl py-6 font-bold text-lg border-slate-200"
										onClick={() => setOpen(false)}
									>
										Chat Now
									</Button>
									<Button 
										className="w-full bg-slate-900 text-white rounded-xl py-6 font-bold text-lg shadow-lg"
										onClick={() => setOpen(false)}
									>
										Get Started
									</Button>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>
				</motion.div>
			</nav>
		</motion.header>
	);
}
