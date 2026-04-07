"use client";

import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-[#7C3AED]/[0.15]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <div
            className={cn("absolute", className)}
            style={{
                animation: `shapeEnter 2.4s cubic-bezier(0.23, 0.86, 0.39, 0.96) ${delay}s both`,
                '--end-rotate': `${rotate}deg`,
                '--start-rotate': `${rotate - 15}deg`,
            } as React.CSSProperties}
        >
            <div
                style={{
                    width,
                    height,
                    animation: 'shapeBob 12s ease-in-out infinite',
                    willChange: 'transform',
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-sm border border-white/[0.35]",
                        "shadow-[0_10px_40px_rgba(124,58,237,0.25)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.2),transparent_70%)]"
                    )}
                />
            </div>
        </div>
    );
}

export function FloatingPurpleShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-violet-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-[#C4B5FD]/[0.35]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />
                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-[#A78BFA]/[0.32]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-[#8B5CF6]/[0.30]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />
                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-[#7C3AED]/[0.28]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />
                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-[#E9D5FF]/[0.30]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>
        </div>
    );
}
