import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Configuration for an elegant, slightly elastic feel
  const TRAIL_COUNT = 10; // Reduced from 16 for memory optimization
  const LERP_FACTOR = 0.8; // Subtle stretch (0.75-0.85 range)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Check for data-cursor-text on hovered element
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor-text]');
      if (interactiveEl) {
        setCursorText(interactiveEl.getAttribute('data-cursor-text'));
        setIsHovering(true);
      } else {
        setCursorText(null);
        setIsHovering(false);
      }

      // Initialize points instantly on first move
      if (pointsRef.current.length === 0) {
        for (let i = 0; i < TRAIL_COUNT; i++) {
          pointsRef.current.push({ x: e.clientX, y: e.clientY });
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pointsRef.current.length > 0) {
        // The "head" follows the mouse with a high but slightly eased factor
        pointsRef.current[0].x += (mouseRef.current.x - pointsRef.current[0].x) * 0.9;
        pointsRef.current[0].y += (mouseRef.current.y - pointsRef.current[0].y) * 0.9;

        // Subsequent points follow with high lerp for a tight trail
        for (let i = 1; i < TRAIL_COUNT; i++) {
          const prev = pointsRef.current[i - 1];
          const curr = pointsRef.current[i];
          curr.x += (prev.x - curr.x) * LERP_FACTOR;
          curr.y += (prev.y - curr.y) * LERP_FACTOR;
        }

        // Draw the sharp trail
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Premium solid purple with opacity fade toward the tail
        const gradient = ctx.createLinearGradient(
          pointsRef.current[0].x, 
          pointsRef.current[0].y, 
          pointsRef.current[TRAIL_COUNT - 1].x, 
          pointsRef.current[TRAIL_COUNT - 1].y
        );
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.8)'); // #7c3aed at 80% opacity
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');   // #7c3aed at 0% opacity
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2; // Thin, sharp, and elegant
        
        // No glow or blur for a crisp, minimal look
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';

        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

        // Smooth quadratic curves for the fluid look
        for (let i = 1; i < TRAIL_COUNT - 1; i++) {
          const xc = (pointsRef.current[i].x + pointsRef.current[i + 1].x) / 2;
          const yc = (pointsRef.current[i].y + pointsRef.current[i + 1].y) / 2;
          ctx.quadraticCurveTo(pointsRef.current[i].x, pointsRef.current[i].y, xc, yc);
        }

        // Final segment
        ctx.lineTo(
          pointsRef.current[TRAIL_COUNT - 1].x, 
          pointsRef.current[TRAIL_COUNT - 1].y
        );
        
        ctx.stroke();

        // Update text position
        if (textRef.current) {
          textRef.current.style.transform = `translate(${mouseRef.current.x + 20}px, ${mouseRef.current.y + 20}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        id="cursor-trail"
        className="fixed inset-0 pointer-events-none z-[9999]"
      />
      {cursorText && (
        <div 
          ref={textRef}
          className="fixed top-0 left-0 pointer-events-none z-[10000] px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
};

export default CustomCursor;


