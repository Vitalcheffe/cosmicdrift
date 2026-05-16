'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

/* ═══════════════════════════════════════════════════════════════
   GUIDED TOUR — Palantir-style progressive onboarding
   Shows A, B, C lettered badges on elements
   Progressive: more hints appear with each visit
   ═══════════════════════════════════════════════════════════════ */

export interface TourStep {
  targetId: string;
  label: string;          // A, B, C, D...
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface GuidedTourProps {
  steps: TourStep[];
  storageKey: string;
  accent?: string;
}

export function GuidedTour({ steps, storageKey, accent = '#8B9DAF' }: GuidedTourProps) {
  const t = useTranslations('guidedTour');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visited, setVisited] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [badgePositions, setBadgePositions] = useState<Record<string, DOMRect>>({});
  const popoverRef = useRef<HTMLDivElement>(null);

  // Track visits in localStorage — show more badges each time
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const count = raw ? parseInt(raw, 10) : 0;
      localStorage.setItem(storageKey, String(count + 1));
      setVisited(count >= 0);
      // Auto-show first step on first 3 visits
      if (count < 3 && steps.length > 0) {
        setTimeout(() => setActiveStep(0), 1500 + count * 500);
      }
    } catch {}
  }, [storageKey, steps.length]);

  // Calculate badge positions from target elements
  const updatePositions = useCallback(() => {
    const positions: Record<string, DOMRect> = {};
    steps.forEach(step => {
      const el = document.getElementById(step.targetId);
      if (el) {
        positions[step.targetId] = el.getBoundingClientRect();
      }
    });
    setBadgePositions(positions);
  }, [steps]);

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions, true);
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions, true);
    };
  }, [updatePositions]);

  const goToNext = useCallback(() => {
    if (activeStep !== null && activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(null);
    }
  }, [activeStep, steps.length]);

  const dismiss = useCallback(() => {
    setActiveStep(null);
    setDismissed(true);
  }, []);

  if (dismissed) return null;

  const currentStep = activeStep !== null ? steps[activeStep] : null;
  const currentRect = currentStep ? badgePositions[currentStep.targetId] : null;

  return (
    <>
      {/* Lettered badges on target elements */}
      {steps.map((step, i) => {
        const rect = badgePositions[step.targetId];
        if (!rect) return null;

        const isActive = activeStep === i;
        // Show badges progressively: visit 1 → first 2, visit 2 → first 4, visit 3+ → all
        const visitCount = (() => {
          try { return parseInt(localStorage.getItem(storageKey) || '1', 10); } catch { return 1; }
        })();
        const maxVisible = Math.min(steps.length, 2 + (visitCount - 1) * 2);
        if (i >= maxVisible && !isActive) return null;

        return (
          <div
            key={step.targetId}
            className="fixed z-[60] pointer-events-auto"
            style={{
              top: rect.top - 14,
              left: rect.left + rect.width / 2 - 14,
            }}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => setActiveStep(i)}
              className="relative group"
            >
              {/* Pulse ring */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: `${accent}20`, border: `1.5px solid ${accent}` }}
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {/* Badge circle */}
              <div
                className="relative w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-200"
                style={{
                  backgroundColor: isActive ? accent : `${accent}15`,
                  color: isActive ? '#000' : accent,
                  border: `1.5px solid ${isActive ? accent : `${accent}40`}`,
                }}
              >
                {step.label}
              </div>
            </motion.button>
          </div>
        );
      })}

      {/* Popover tooltip */}
      <AnimatePresence>
        {currentStep && currentRect && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[70] w-[280px] max-w-[calc(100vw-24px)]"
            style={{
              top: currentStep.position === 'bottom'
                ? Math.min(currentRect.bottom + 12, window.innerHeight - 200)
                : currentStep.position === 'top'
                  ? Math.max(12, currentRect.top - 160)
                  : currentRect.top,
              left: currentStep.position === 'left'
                ? Math.max(12, currentRect.left - 292)
                : currentStep.position === 'right'
                  ? Math.min(currentRect.right + 12, window.innerWidth - 292)
                  : Math.max(12, Math.min(currentRect.left + currentRect.width / 2 - 140, window.innerWidth - 292)),
            }}
          >
            <div className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ backgroundColor: accent, color: '#000' }}
                  >
                    {currentStep.label}
                  </div>
                  <span className="text-[12px] font-bold text-white">{currentStep.title}</span>
                </div>
                <button onClick={dismiss} className="text-[rgba(255,255,255,0.25)] hover:text-white transition-colors">
                  <X size={12} />
                </button>
              </div>
              {/* Description */}
              <p className="text-[13px] sm:text-[12px] text-[rgba(255,255,255,0.55)] leading-[1.6] mb-3">
                {currentStep.description}
              </p>
              {/* Navigation */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-[rgba(255,255,255,0.25)] font-[family-name:var(--font-space-mono)]">
                  {(activeStep ?? 0) + 1} / {steps.length}
                </span>
                <button
                  onClick={goToNext}
                  className="flex items-center gap-1 text-[10px] font-bold tracking-[0.1em] uppercase transition-colors"
                  style={{ color: accent }}
                >
                  {activeStep === steps.length - 1 ? t('done') : t('next')}
                  <ChevronRight size={10} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
