"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradientGlow = ({ 
  className,
  children 
}: { 
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Aurora Dream Corner Whispers */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.20), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.25), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.18), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.22), transparent 62%),
            linear-gradient(180deg, #faf7ff 0%, #fffaff 100%)
          `,
        }}
      />
      {children}
    </div>
  );
};
