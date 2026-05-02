'use client';

import { useEffect, useRef, useState } from 'react';

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);

    // Smooth follow with lerp
    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;
      setPos({ x: currentRef.current.x, y: currentRef.current.y });
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
    <div
      className="fixed pointer-events-none z-[9999] w-[300px] h-[300px] rounded-full"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 30%, transparent 70%)',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
