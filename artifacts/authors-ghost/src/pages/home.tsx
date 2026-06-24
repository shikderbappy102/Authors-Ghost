import React, { useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useCalendly } from "@/hooks/useCalendly";
import {
  ArrowRight, ChevronDown, Shield, Target, Zap, Globe,
  TrendingUp, Award, Users, Clock, Linkedin, FileText, Star, MessageSquare,
} from "lucide-react";

// ── Counter ────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Marquee ────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Narrative Architecture", "Authority Positioning", "Trust Engineering",
  "Perception Control", "B2B Credibility", "Founder Narrative",
  "LinkedIn Authority", "Deal Velocity", "Investor Readiness", "Market Dominance",
];
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden py-4 border-y border-white/5 relative">
      <div className="absolute left-0 inset-y-0 w-24 z-10 bg-gradient-to-r from-[#070810] to-transparent" />
      <div className="absolute right-0 inset-y-0 w-24 z-10 bg-gradient-to-l from-[#070810] to-transparent" />
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-xs uppercase tracking-[0.25em] font-medium text-white/25">
            {item}
            <span className="text-blue-500/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── 3D tilt ────────────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);
  return { ref, onMove, onLeave };
}

// ── Authority Network Hero ─────────────────────────────────────────────────
const SIGNAL_NODES = [
  { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn", angle: 0, color: "#60a5fa", dist: 118 },
  { icon: <FileText className="w-3.5 h-3.5" />, label: "Press", angle: 72, color: "#818cf8", dist: 118 },
  { icon: <Star className="w-3.5 h-3.5" />, label: "Trust", angle: 144, color: "#a78bfa", dist: 118 },
  { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Deals", angle: 216, color: "#34d399", dist: 118 },
  { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Growth", angle: 288, color: "#06b6d4", dist: 118 },
];

function AuthorityNetwork() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>
      {/* Outer slow pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.04, 0.12] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full border border-blue-400/30"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
      />

      {/* Orbit ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{
          width: 260, height: 260, borderRadius: "50%",
          border: "1px solid rgba(96,165,250,0.15)",
          transform: "rotateX(60deg)",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400"
          style={{ boxShadow: "0 0 8px rgba(96,165,250,0.9)" }} />
      </motion.div>

      {/* Orbit ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute"
        style={{
          width: 180, height: 180, borderRadius: "50%",
          border: "1px dashed rgba(167,139,250,0.18)",
        }}
      >
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-violet-400"
          style={{ boxShadow: "0 0 6px rgba(167,139,250,0.9)" }} />
      </motion.div>

      {/* Signal nodes orbiting */}
      {SIGNAL_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * node.dist;
        const y = Math.sin(rad) * node.dist;
        return (
          <motion.div
            key={i}
            style={{ position: "absolute", left: "50%", top: "50%" }}
            animate={{ x: x, y: y, rotate: [0, 5, 0, -5, 0] }}
            initial={{ x: x, y: y }}
            transition={{ rotate: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.08, 0.9] }}
              transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
              className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${node.color}18`, border: `1px solid ${node.color}35`, color: node.color, boxShadow: `0 0 12px ${node.color}30` }}
              >
                {node.icon}
              </div>
              <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color: `${node.color}80` }}>{node.label}</span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Connection lines from center to nodes (SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" fill="none">
        {SIGNAL_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x2 = 170 + Math.cos(rad) * node.dist;
          const y2 = 170 + Math.sin(rad) * node.dist;
          return (
            <motion.line
              key={i}
              x1={170} y1={170} x2={x2} y2={y2}
              stroke={node.color}
              strokeWidth="0.7"
              animate={{ opacity: [0.08, 0.28, 0.08] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          );
        })}
      </svg>

      {/* Central ghost — floating */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.55) 0%, transparent 70%)",
            filter: "blur(18px)",
            transform: "scale(1.8)",
          }}
        />
        <svg width="80" height="80" viewBox="0 0 88 88" fill="none">
          <defs>
            <linearGradient id="ghostGradHero" x1="44" y1="8" x2="44" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path
            d="M44 8C29.1 8 17 20.1 17 35V72L23 66L29 72L35 66L41 72L44 69L47 72L53 66L59 72L65 66L71 72V35C71 20.1 58.9 8 44 8Z"
            fill="url(#ghostGradHero)" opacity="0.92"
          />
          <circle cx="34" cy="36" r="6" fill="#0a0b14" />
          <circle cx="34" cy="36" r="3.5" fill="white" opacity="0.95" />
          <circle cx="36" cy="34" r="1.5" fill="white" />
          <circle cx="54" cy="36" r="6" fill="#0a0b14" />
          <circle cx="54" cy="36" r="3.5" fill="white" opacity="0.95" />
          <circle cx="56" cy="34" r="1.5" fill="white" />
        </svg>
      </motion.div>

      {/* "Authority Engineered" label */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] text-blue-400/60 font-medium whitespace-nowrap"
      >
        Authority Engineered
      </motion.div>
    </div>
  );
}

// ── Floating badge ─────────────────────────────────────────────────────────
function FloatingBadge({ children, delay, x, y }: { children: React.ReactNode; delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3.5 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.4 },
      }}
      className="absolute pointer-events-none hidden lg:block"
      style={{ left: x, top: y }}
    >
      {children}
    </motion.div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: <Target className="w-5 h-5" />, num: "01", title: "Founder Narrative Clarity", desc: "We architect a precise, compelling story that works across every touchpoint: investor decks, LinkedIn, cold intros, and stage talks.", accent: "#3b82f6" },
  { icon: <Award className="w-5 h-5" />, num: "02", title: "Authority Positioning System", desc: "Systematic thought leadership infrastructure that makes you the first name buyers think of in your category.", accent: "#818cf8" },
  { icon: <Shield className="w-5 h-5" />, num: "03", title: "Market Trust Engineering", desc: "Pre-build the trust signals that convert cold outreach into warm conversations before a single email is sent.", accent: "#06b6d4" },
  { icon: <Globe className="w-5 h-5" />, num: "04", title: "LinkedIn Authority Control", desc: "Complete perception redesign of your LinkedIn presence. Transform from unknown founder to inbound deal magnet.", accent: "#a78bfa" },
];
const STATS = [
  { icon: <TrendingUp className="w-5 h-5 text-blue-400" />, val: 3, suf: "x", label: "Faster Deal Velocity" },
  { icon: <Users className="w-5 h-5 text-indigo-400" />, val: 94, suf: "%", label: "Inbound Conversion Rate" },
  { icon: <Clock className="w-5 h-5 text-cyan-400" />, val: 21, suf: "d", label: "Average Time to Authority" },
  { icon: <Zap className="w-5 h-5 text-violet-400" />, val: 0, suf: " Cold Calls", label: "Required After Engagement" },
];
const PROCESS = [
  { step: "01", title: "Narrative Audit", desc: "We analyse every touchpoint where your market forms opinions about you. We find the gaps, contradictions, and missed authority signals.", color: "#3b82f6" },
  { step: "02", title: "Architecture", desc: "We build your Authority Architecture: a precise, coherent narrative system that works across every platform and context.", color: "#818cf8" },
  { step: "03", title: "Deployment", desc: "We deploy across LinkedIn, digital presence, outreach, and thought leadership, then measure trust signal formation.", color: "#06b6d4" },
];

// ── Service card ───────────────────────────────────────────────────────────
function ServiceCard({ svc, index }: { svc: typeof SERVICES[number]; index: number }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <div
        ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        className="group relative p-8 rounded-2xl border border-white/6 bg-white/[0.025] cursor-pointer h-full"
        style={{ transition: "transform 0.12s ease, border-color 0.3s ease" }}
      >
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${svc.accent}80, transparent)` }} />
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at top left, ${svc.accent}10 0%, transparent 65%)` }} />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ background: `${svc.accent}18`, border: `1px solid ${svc.accent}30` }}
            >
              {svc.icon}
            </motion.div>
            <span className="text-xs text-white/12 font-mono">{svc.num}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">{svc.title}</h3>
          <p className="text-white/38 leading-relaxed text-sm">{svc.desc}</p>
          <Link href="/services">
            <div className="mt-6 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ color: svc.accent }}>
              Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Process card ───────────────────────────────────────────────────────────
function ProcessCard({ item, index }: { item: typeof PROCESS[number]; index: number }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      whileHover={{ y: -6 }}
    >
      <div
        ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        className="group relative p-8 rounded-2xl border border-white/6 bg-white/[0.025] h-full"
        style={{ transition: "transform 0.12s ease" }}
      >
        <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }} />
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at top, ${item.color}09 0%, transparent 65%)` }} />
        <div className="relative z-10">
          <motion.div
            animate={{ opacity: [0.15, 0.32, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            className="text-6xl font-black mb-6 leading-none"
            style={{ color: item.color }}
          >
            {item.step}
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-white/38 leading-relaxed text-sm">{item.desc}</p>
          <div className="mt-6 w-8 h-0.5 rounded-full" style={{ background: item.color }} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const { ref, onMove, onLeave } = useTilt();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
      transition={{ delay: index * 0.1, duration: 0.65, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div
        ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
        className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] cursor-default"
        style={{ transition: "transform 0.12s ease" }}
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-3"
        >
          {stat.icon}
        </motion.div>
        <div className="text-4xl md:text-5xl font-black text-white mb-2">
          <Counter to={stat.val} suffix={stat.suf} />
        </div>
        <div className="text-xs text-white/28 uppercase tracking-wider">{stat.label}</div>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const { open } = useCalendly();

  return (
    <Layout>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center">
        {/* Static dot grid */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Static background orbs */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-[5%] left-[5%] w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(23,37,90,0.35) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(49,46,129,0.25) 0%, transparent 70%)", filter: "blur(70px)" }} />
        </div>
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#070810]/60 via-transparent to-[#070810]" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#070810]/50 via-transparent to-[#070810]/50" />

        {/* Floating metric badges */}
        <FloatingBadge delay={1.4} x="3%" y="28%">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] text-blue-300 font-medium uppercase tracking-wider">94% Conversion</span>
          </div>
        </FloatingBadge>
        <FloatingBadge delay={1.7} x="80%" y="20%">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[10px] text-violet-300 font-medium uppercase tracking-wider">3x Deal Velocity</span>
          </div>
        </FloatingBadge>
        <FloatingBadge delay={2.0} x="78%" y="72%">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] text-cyan-300 font-medium uppercase tracking-wider">21 Days to Authority</span>
          </div>
        </FloatingBadge>
        <FloatingBadge delay={1.9} x="2%" y="72%">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
            <span className="text-[10px] text-white/50 font-medium uppercase tracking-wider">0 Cold Calls</span>
          </div>
        </FloatingBadge>

        <div className="relative z-[3] w-full max-w-7xl mx-auto px-6 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/22 bg-blue-500/6 px-4 py-1.5 text-xs font-medium text-blue-300 mb-10 backdrop-blur-sm tracking-wider uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Perception Engineering for Elite B2B Founders
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 36, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.6rem,5vw,5.2rem)] font-black leading-[0.93] tracking-tight mb-8"
              >
                <span className="block text-white">Authority Is Built</span>
                <span className="block text-white/80 mt-2">Before The</span>
                <motion.span
                  className="block mt-2"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc, #60a5fa)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Conversation Begins.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="text-lg text-white/45 max-w-xl mb-12 leading-relaxed font-light"
              >
                We help B2B founders control perception, trust, and credibility before sales, hiring, or fundraising ever happens.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <motion.button
                  onClick={open}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }} />
                  <span className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_55px_rgba(59,130,246,0.6)] transition-shadow duration-300" />
                  <span className="relative z-10">Book a Narrative Audit</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium text-white/60 border border-white/10 bg-white/3 hover:text-white hover:border-white/20 transition-colors duration-300"
                  >
                    See How It Works <ChevronDown className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex flex-wrap items-center gap-6 mt-12"
              >
                {["Series A Founders", "Pre-IPO Operators", "VC-Backed Startups"].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/25 uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-blue-500/50" />
                    {label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: authority network graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <AuthorityNetwork />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/18">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4 text-white/18" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══ MARQUEE ═════════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ══ PROBLEM ═════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/4 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(239,68,68,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.05, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">The Problem</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-8">
                Most founders lose deals<br />
                <span className="text-white/35">before the call begins.</span>
              </h2>
              <p className="text-white/45 text-lg leading-relaxed mb-5">
                In high-stakes B2B markets, your buyer has already formed a complete picture of you before they accept the calendar invite.
              </p>
              <p className="text-white/45 text-lg leading-relaxed">
                They've searched your name. They've assessed your digital footprint. They've unconsciously assigned your credibility score, placing you in either the "worth talking to" or "not quite there" column.
              </p>
            </motion.div>

            <div className="space-y-3">
              {[
                { label: "Buyer Googles founder name", state: "bad", note: "Disconnected narrative" },
                { label: "Checks LinkedIn profile", state: "bad", note: "Generic. No authority signals" },
                { label: "Scans company digital presence", state: "bad", note: "Looks like 1,000 others" },
                { label: "Decision made before the call", state: "result", note: "Deal lost. No second chance." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
                  transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-default ${
                    item.state === "result" ? "border-red-500/20 bg-red-500/5" : "border-white/5 bg-white/[0.025]"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    item.state === "result" ? "bg-red-500/20 text-red-400" : "bg-white/5 text-white/30"
                  }`}>{i + 1}</div>
                  <div>
                    <p className="text-white/80 font-medium text-sm">{item.label}</p>
                    <p className={`text-xs mt-0.5 ${item.state === "result" ? "text-red-400" : "text-white/28"}`}>{item.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SOLUTION ════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/4 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.06) 0%, transparent 65%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.85 }}
            className="text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">The Methodology</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
              We engineer founder authority.
            </h2>
            <p className="text-white/38 text-xl max-w-2xl mx-auto leading-relaxed">
              Not PR. Not content marketing. Not LinkedIn growth hacks.
              This is strategic perception architecture, built from first principles.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {PROCESS.map((item, i) => <ProcessCard key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/4 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(79,70,229,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-4">Capabilities</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Four systems.<br />
                <span className="text-white/28">One outcome: market dominance.</span>
              </h2>
            </div>
            <Link href="/services">
              <motion.button
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm text-white/38 hover:text-white transition-colors group whitespace-nowrap"
              >
                View all services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => <ServiceCard key={i} svc={svc} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ STATS ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-white/4 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ QUOTE ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/4 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 65%)" }} />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.95 }}
          >
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl text-blue-500 font-black leading-none mb-6 select-none"
            >
              "
            </motion.div>
            <blockquote className="text-3xl md:text-4xl lg:text-[3.2rem] font-black text-white leading-[1.1] tracking-tight mb-8">
              The difference between a 3-month sales cycle and a 3-week sales cycle is{" "}
              <span style={{
                background: "linear-gradient(135deg, #60a5fa, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                pre-established trust.
              </span>
            </blockquote>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400/70 font-medium">The Authority Axiom</p>
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/4 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.95 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">Limited Engagements</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Ready to become the authority your market can't ignore?
            </h2>
            <p className="text-white/38 text-lg mb-10 leading-relaxed">
              We take on a limited number of engagements per quarter to ensure the highest quality of work. Apply now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={open}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-semibold text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }} />
                <span className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_70px_rgba(59,130,246,0.55)] transition-shadow" />
                <span className="relative z-10">Begin Your Narrative Audit</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={open}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl text-base font-medium text-white/55 border border-white/8 hover:border-white/20 hover:text-white hover:bg-white/4 transition-all duration-300"
              >
                Schedule a Private Call
              </motion.button>
            </div>
            <p className="mt-8 text-xs text-white/18 uppercase tracking-wider">
              Strictly confidential · NDA on first contact · Invite only
            </p>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
