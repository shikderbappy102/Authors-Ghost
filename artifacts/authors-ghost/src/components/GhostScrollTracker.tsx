import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";

// ── Stage icons ────────────────────────────────────────────────────────────
const STAGES = [
  {
    key: "ghost",
    color: "#60a5fa",
    shadow: "0 0 18px rgba(96,165,250,0.7)",
    label: "Narrative",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C9.03 3 5 7.03 5 12v11l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V12C23 7.03 18.97 3 14 3Z"
          fill="rgba(96,165,250,0.18)" stroke="#60a5fa" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="10.5" cy="12" r="2" fill="#60a5fa" opacity="0.9" />
        <circle cx="17.5" cy="12" r="2" fill="#60a5fa" opacity="0.9" />
        <circle cx="11" cy="11.5" r="0.8" fill="white" opacity="0.7" />
        <circle cx="18" cy="11.5" r="0.8" fill="white" opacity="0.7" />
      </svg>
    ),
    anim: { y: [0, -5, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } },
  },
  {
    key: "eye",
    color: "#22d3ee",
    shadow: "0 0 18px rgba(34,211,238,0.7)",
    label: "Perception",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M3 14s4-7 11-7 11 7 11 7-4 7-11 7S3 14 3 14Z"
          stroke="#22d3ee" strokeWidth="1.4" fill="rgba(34,211,238,0.06)" strokeLinecap="round" />
        <circle cx="14" cy="14" r="4" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" strokeWidth="1.2" />
        <circle cx="14" cy="14" r="2" fill="#22d3ee" opacity="0.9" />
        <circle cx="15" cy="13" r="0.8" fill="white" opacity="0.7" />
      </svg>
    ),
    anim: { rotate: [0, 360], transition: { duration: 7, repeat: Infinity, ease: "linear" } },
  },
  {
    key: "shield",
    color: "#a78bfa",
    shadow: "0 0 18px rgba(167,139,250,0.7)",
    label: "Trust",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L5 7v7c0 5.5 3.9 10.7 9 12 5.1-1.3 9-6.5 9-12V7L14 3Z"
          fill="rgba(167,139,250,0.12)" stroke="#a78bfa" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10 14l3 3 5-5" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    anim: { scale: [1, 1.1, 1], transition: { duration: 1.9, repeat: Infinity, ease: "easeInOut" } },
  },
  {
    key: "crown",
    color: "#fbbf24",
    shadow: "0 0 18px rgba(251,191,36,0.7)",
    label: "Authority",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20h20v3H4zM4 20l3-10 7 6 7-6 3 10H4Z"
          fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="4" cy="10" r="1.5" fill="#fbbf24" />
        <circle cx="14" cy="7" r="1.5" fill="#fbbf24" />
        <circle cx="24" cy="10" r="1.5" fill="#fbbf24" />
      </svg>
    ),
    anim: { y: [0, -4, 0], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  },
];

// ── Particle ───────────────────────────────────────────────────────────────
function Particle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.55, scale: 1 }}
      animate={{ opacity: 0, scale: 0, y: -6 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{
        position: "fixed",
        left: x - 3,
        top: y - 3,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        pointerEvents: "none",
        zIndex: 98,
        filter: "blur(1.5px)",
      }}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function GhostScrollTracker() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const particleId = useRef(0);
  const frameRef = useRef(0);
  const lastStage = useRef(0);

  const motionY = useMotionValue(200);
  const springY = useSpring(motionY, { stiffness: 60, damping: 16 });

  useEffect(() => {
    const ELEM_H = 44;
    const MARGIN = 80;
    const MAX_Y = window.innerHeight - ELEM_H - MARGIN;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = scrollY / maxScroll;

      // Y oscillates smoothly as you scroll
      const targetY = MARGIN + Math.abs(Math.sin(scrollY * 0.0035)) * MAX_Y;
      motionY.set(targetY);

      // Morph stage
      const newStage = Math.min(3, Math.floor(progress * 4));
      if (newStage !== lastStage.current) {
        lastStage.current = newStage;
        setStage(newStage);
      }

      // Particles
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const id = particleId.current++;
        const xPos = window.innerWidth - 52;
        setParticles((p) => [...p.slice(-5), { id, x: xPos + 14, y: targetY + 14, color: STAGES[newStage].color }]);
      });

      setVisible(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        setParticles([]);
      }, 650);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };
  }, [motionY]);

  const s = STAGES[stage];

  return (
    <>
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      <AnimatePresence>
        {visible && (
          <motion.div
            key={`ghost-tracker-${stage}`}
            initial={{ opacity: 0, scale: 0.3, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.8, filter: "blur(10px)" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              right: 18,
              top: 0,
              y: springY,
              zIndex: 100,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Outer pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                border: `1px solid ${s.color}`,
                pointerEvents: "none",
              }}
            />

            {/* Icon container */}
            <motion.div
              animate={s.anim as object}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `radial-gradient(circle, ${s.color}14 0%, transparent 70%)`,
                border: `1px solid ${s.color}40`,
                boxShadow: s.shadow,
              }}
            >
              {s.icon}
            </motion.div>

            {/* Label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              style={{
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: s.color,
                whiteSpace: "nowrap",
              }}
            >
              {s.label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
