'use client';

import { useEffect, useRef, useState } from 'react';

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const trailRefs = useRef<{ x: number; y: number }[]>([
    { x: -100, y: -100 },
    { x: -100, y: -100 },
    { x: -100, y: -100 },
  ]);
  const frameCount = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    // Smooth follow with lerp for main dot + trail
    const animate = () => {
      // Main dot - fast follow
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.12;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.12;
      
      // Trail dots - progressively slower
      trailRefs.current[0].x += (currentRef.current.x - trailRefs.current[0].x) * 0.06;
      trailRefs.current[0].y += (currentRef.current.y - trailRefs.current[0].y) * 0.06;
      
      trailRefs.current[1].x += (trailRefs.current[0].x - trailRefs.current[1].x) * 0.04;
      trailRefs.current[1].y += (trailRefs.current[0].y - trailRefs.current[1].y) * 0.04;
      
      trailRefs.current[2].x += (trailRefs.current[1].x - trailRefs.current[2].x) * 0.03;
      trailRefs.current[2].y += (trailRefs.current[1].y - trailRefs.current[2].y) * 0.03;

      setPos({ x: currentRef.current.x, y: currentRef.current.y });
      setTrail([
        { x: trailRefs.current[0].x, y: trailRefs.current[0].y, id: 0 },
        { x: trailRefs.current[1].x, y: trailRefs.current[1].y, id: 1 },
        { x: trailRefs.current[2].x, y: trailRefs.current[2].y, id: 2 },
      ]);

      frameCount.current++;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed pointer-events-none z-[9999] inset-0">
      {/* Main radial glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          left: pos.x - 150,
          top: pos.y - 150,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 30%, transparent 70%)',
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Bright dot at cursor */}
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          background: 'rgba(255,255,255,0.15)',
          boxShadow: '0 0 6px rgba(255,255,255,0.1)',
        }}
      />
      {/* Trail dot 1 */}
      {trail[0] && (
        <div
          key="trail-0"
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: trail[0].x - 3,
            top: trail[0].y - 3,
            background: 'rgba(255,255,255,0.08)',
          }}
        />
      )}
      {/* Trail dot 2 */}
      {trail[1] && (
        <div
          key="trail-1"
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: trail[1].x - 2,
            top: trail[1].y - 2,
            background: 'rgba(255,255,255,0.05)',
          }}
        />
      )}
      {/* Trail dot 3 */}
      {trail[2] && (
        <div
          key="trail-2"
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            left: trail[2].x - 1,
            top: trail[2].y - 1,
            background: 'rgba(255,255,255,0.03)',
          }}
        />
      )}
    </div>
  );
}
