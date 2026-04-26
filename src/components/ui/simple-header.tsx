import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import AdibuzLogo from '../AdibuzLogo';
import MagneticButton from '../MagneticButton';
import { cn } from '@/lib/utils';

export function SimpleHeader({ dark = false }: { dark?: boolean }) {
	const [open, setOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{ label: 'Home', id: 'home', path: '/' },
		{ label: 'Services', id: 'services', path: '/#services' },
		{ label: 'Work', id: 'work', path: '/work' },
		{ label: 'Clients', id: 'clients', path: '/#clients' },
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
		<header className={cn(
			"fixed top-0 left-0 right-0 z-50 transition-all duration-500",
			isScrolled ? "py-4" : "py-8"
		)}>
			<nav className="container-custom">
				<div className={cn(
					"flex items-center justify-between transition-all duration-500",
					isScrolled 
						? dark 
							? "bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 sm:px-6 lg:px-12 py-3 shadow-2xl shadow-purple-900/20"
							: "glass rounded-full px-4 sm:px-6 lg:px-12 py-3 shadow-md"
						: "py-2"
				)}>
					<Link to="/" className="flex items-center group cursor-pointer">
						<AdibuzLogo height={48} className={cn("transition-transform duration-300 group-hover:scale-[1.02]", dark && "brightness-0 invert")} />
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
										"text-[13px] font-semibold transition-colors tracking-wide",
										dark 
											? isActive ? "text-purple-400" : "text-slate-400 hover:text-white"
											: "text-slate-500 hover:text-slate-900"
									)}
								>
									{item.label}
								</Link>
							) : (
								<a 
									key={item.label} 
									href={item.path}
									onClick={(e) => handleScrollTo(e, item.id)}
									className={cn(
										"text-[13px] font-semibold transition-colors tracking-wide",
										dark 
											? "text-slate-400 hover:text-white"
											: "text-slate-500 hover:text-slate-900"
									)}
								>
									{item.label}
								</a>
							);
						})}
					</div>

					<div className="flex items-center gap-4 lg:gap-6">
						<div className="hidden sm:flex items-center gap-4 lg:gap-6">
							<MagneticButton>
								<button 
									data-cursor-text="Chat"
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
							<Button size="icon" variant="ghost" className={cn("lg:hidden p-2 hover:bg-transparent min-h-[44px] min-w-[44px]", dark ? "text-slate-300" : "text-slate-600")}>
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
				</div>
			</nav>
		</header>
	);
}
