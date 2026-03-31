"use client"
import React from 'react'; 
import { Grid2x2PlusIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import AdifyLogo from './AdifyLogo';

export function SimpleHeader() {
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Clients', href: '#clients' },
    { label: 'About', href: '#about' },
    { label: 'Why Adify', href: '#why-adify' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <nav className={`mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 transition-all duration-500 ${isScrolled ? 'glass rounded-full shadow-sm py-3' : ''}`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <AdifyLogo height={34} className="transition-transform duration-300 group-hover:scale-[1.02]" />
        </div>
        
        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              className={`${buttonVariants({ variant: 'ghost' })} text-[13px] font-semibold text-slate-500 hover:text-slate-900 transition-colors tracking-wide`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <Button variant="ghost" className="text-[13px] font-bold text-slate-900">Sign In</Button>
          <Button className="bg-slate-900 text-white rounded-full text-[13px] font-bold px-6">Get Started</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex items-center gap-4 lg:hidden">
            <Button size="icon" variant="outline" className="rounded-full border-slate-200">
              <MenuToggle
                strokeWidth={2.5}
                open={open}
                onOpenChange={setOpen}
                className="size-5"
              />
            </Button>
          </div>
          <SheetContent
            className="bg-white/95 backdrop-blur-xl border-l border-slate-200 gap-0"
            showClose={false}
            side="right"
          >
            <div className="flex flex-col gap-y-2 overflow-y-auto px-6 pt-20 pb-5 h-full">
              {links.map((link) => (
                <a
                  key={link.label}
                  className={`${buttonVariants({
                    variant: 'ghost',
                    className: 'justify-start text-lg font-bold text-slate-900 py-6',
                  })}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              <div className="mt-auto pb-8 flex flex-col gap-4">
                <Button variant="outline" className="w-full text-[13px] font-bold rounded-full py-6">Sign In</Button>
                <Button className="w-full bg-slate-900 text-white text-[13px] font-bold rounded-full py-6">Get Started</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
