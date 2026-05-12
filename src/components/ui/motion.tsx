'use client';

import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════════
   SHARED EASING & DURATION CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const DURATION_FAST = 0.2;
const DURATION_NORMAL = 0.4;
const DURATION_SLOW = 0.8;

/* ═══════════════════════════════════════════════════════════════
   1. FadeIn — Unified scroll-triggered fade-in
   ═══════════════════════════════════════════════════════════════ */

type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: FadeDirection;
  className?: string;
  duration?: number;
}

const DIRECTION_OFFSET = 40;

const directionMap: Record<FadeDirection, { x: number; y: number }> = {
  up: { y: DIRECTION_OFFSET, x: 0 },
  down: { y: -DIRECTION_OFFSET, x: 0 },
  left: { y: 0, x: DIRECTION_OFFSET },
  right: { y: 0, x: -DIRECTION_OFFSET },
  none: { y: 0, x: 0 },
};

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  duration = 0.7,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const offset = directionMap[direction];

  // Skip animation entirely if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        duration,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. AnimatedCounter — Animated number counter with rAF
   ═══════════════════════════════════════════════════════════════ */

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

/** Format a number with optional decimals and locale */
function formatNumber(val: number, decimals: number): string {
  if (decimals > 0) {
    return val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return Math.round(val).toLocaleString();
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const node = ref.current;
    if (!node) return;

    let startTime: number | null = null;
    let rafId: number;

    const easeOutExpo = (t: number): number =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = easedProgress * value;
      node.textContent = prefix + formatNumber(current, decimals) + suffix;

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        node.textContent = prefix + formatNumber(value, decimals) + suffix;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration, prefix, suffix, decimals]);

  // Always render the final value — no "0" flash
  return (
    <span
      ref={ref}
      className="stat-mono"
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}{formatNumber(value, decimals)}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. StaggerContainer — Stagger children animations
   ═══════════════════════════════════════════════════════════════ */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Use inside StaggerContainer children */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT_EXPO },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. MagneticButton — Button that follows the cursor subtly
   ═══════════════════════════════════════════════════════════════ */

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxDistance = 0.3; // subtle magnetic factor
      x.set((e.clientX - centerX) * maxDistance);
      y.set((e.clientY - centerY) * maxDistance);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. TextReveal — Character-by-character text reveal on scroll
   ═══════════════════════════════════════════════════════════════ */

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const characters = text.split('');

  return (
    <div ref={ref} className={className} aria-label={text}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: EASE_OUT_QUART,
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. ParallaxSection — Section with parallax scroll effect
   ═══════════════════════════════════════════════════════════════ */

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
  offset = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset * speed * 100]);

  // Disable parallax effect when user prefers reduced motion
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. CountUp — Number that counts up with spring physics
   ═══════════════════════════════════════════════════════════════ */

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasAnimated = useRef(false);

  // Use framer-motion's spring-based motion value
  const motionValue = useSpring(from, {
    stiffness: 40,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    motionValue.set(to);
  }, [isInView, motionValue, to]);

  useEffect(() => {
    const unsubscribe = motionValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + formatNumber(latest, decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [motionValue, prefix, suffix, decimals]);

  // Always render the target value — no "0" flash
  return (
    <span
      ref={ref}
      className={className ?? 'stat-mono'}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}{formatNumber(to, decimals)}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. SmoothLink — Link with hover animation
   ═══════════════════════════════════════════════════════════════ */

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function SmoothLink({ href, children, className }: SmoothLinkProps) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1 ${className ?? ''}`}>
      <span className="relative">
        {children}
        <span
          className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full"
          aria-hidden="true"
        />
      </span>
      <motion.span
        className="inline-block"
        initial={{ x: 0, opacity: 0.5 }}
        whileHover={{ x: 4, opacity: 1 }}
        transition={{ duration: DURATION_FAST, ease: EASE_OUT_QUART }}
        aria-hidden="true"
      >
        &rarr;
      </motion.span>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. Card3D — Card with subtle 3D tilt on hover
   ═══════════════════════════════════════════════════════════════ */

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
}

export function Card3D({ children, className, glareEnabled = false }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Very subtle tilt — max 4 degrees
      const maxTilt = 4;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = -((y - centerY) / centerY) * maxTilt;

      setTilt({ rotateX, rotateY });

      if (glareEnabled) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlarePos({ x: glareX, y: glareY });
      }
    },
    [glareEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      className={`card relative overflow-hidden ${className ?? ''}`}
    >
      {children}
      {glareEnabled && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. SectionDivider — Animated horizontal line divider
   ═══════════════════════════════════════════════════════════════ */

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div
      ref={ref}
      className={`mx-auto h-[1px] bg-border ${className ?? ''}`}
    >
      <motion.div
        className="h-full bg-border"
        initial={{ width: '0%' }}
        animate={isInView ? { width: '100%' } : { width: '0%' }}
        transition={{
          duration: DURATION_SLOW,
          ease: EASE_OUT_EXPO,
        }}
      />
    </div>
  );
}
