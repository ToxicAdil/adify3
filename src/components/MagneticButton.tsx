import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  key?: React.Key;
}

/**
 * MagneticButton — CSS-only version (no framer-motion).
 * Uses CSS transitions for spring-like snap-back. Visually identical.
 */
const MagneticButton = ({ children, className, strength = 0.2 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const boundingRect = ref.current?.getBoundingClientRect();
    if (boundingRect) {
      const { left, top, width, height } = boundingRect;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const x = Math.max(Math.min((e.clientX - centerX) * strength, 6), -6);
      const y = Math.max(Math.min((e.clientY - centerY) * strength, 6), -6);
      setPosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: position.x !== 0 ? 'transform' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
