import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useCalendly } from "@/hooks/useCalendly";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const { open } = useCalendly();

  return (
    <Layout>
      {/* ── HEADER ── */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(37,99,235,0.07) 0%, transparent 60%)" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">
              Firm Philosophy
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white mb-8 max-w-4xl">
              This is not branding.
              <br />
              <span style={{
                background: "linear-gradient(135deg, #60a5fa, #818cf8 50%, #a78bfa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                This is perception engineering.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-white/40 max-w-2xl leading-relaxed">
              Authors Ghost is the firm that elite B2B founders come to when they realize that talent, product, and execution are no longer enough. Market perception is the new competitive moat.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-24 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-4">The Reality</p>
                <h2 className="text-2xl font-black text-white">Why the best founders aren't always winning.</h2>
              </div>
            </div>
            <div className="md:col-span-8 space-y-8">
              {[
                "In the modern B2B landscape, the best product rarely wins. The product that is perceived as the best wins. And that perception is inextricably linked to the founder.",
                "Authors Ghost was founded to close the gap between absolute operational competence and market perception. We watched brilliant founders lose deals to inferior competitors, simply because the competitor looked more authoritative on the internet.",
                "We observed fundraising rounds fall apart because an investor couldn't find a compelling narrative about the founder online. We saw top talent turn down offers because the founder's LinkedIn looked like a ghost town.",
                "Authority is no longer a soft metric. It is a hard, measurable lever that directly affects deal velocity, hiring success, fundraising terms, and pricing power.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className="text-lg text-white/50 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="py-24 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-4">Operating Principles</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">How we think.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                n: "01",
                title: "Precision over volume",
                desc: "We reject spray-and-pray content strategies. Every signal we engineer is deliberate, targeted, and calibrated to your specific market context.",
                color: "#3b82f6",
              },
              {
                n: "02",
                title: "Architecture before execution",
                desc: "We never begin execution until the narrative architecture is complete. Strategy without structure produces noise. Structure without narrative produces boredom.",
                color: "#818cf8",
              },
              {
                n: "03",
                title: "Founders, not brands",
                desc: "We work with the human at the centre of the company, not the logo. People buy from people. Trust attaches to individuals first, institutions second.",
                color: "#06b6d4",
              },
              {
                n: "04",
                title: "Outcomes, not activity",
                desc: "We are not a content factory. We are not a LinkedIn growth agency. We are a firm that engineers measurable outcomes: shorter sales cycles, stronger deal terms, better hires.",
                color: "#a78bfa",
              },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.65 }}
                className="group p-8 rounded-2xl border border-white/6 bg-white/2 hover:bg-white/4 hover:border-white/12 transition-all duration-400 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left, ${p.color}07 0%, transparent 60%)` }}
                />
                <div className="text-5xl font-black mb-6 leading-none" style={{ color: `${p.color}18` }}>{p.n}</div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm">{p.desc}</p>
                <div className="mt-6 w-8 h-0.5" style={{ background: p.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ── */}
      <section className="py-24 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">Clientele</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                We are selective.<br />
                <span className="text-white/30">By design.</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-8">
                We limit our engagements to ensure every client receives the undivided focus of our senior team. We do not scale through volume. We scale through depth.
              </p>
              <button
                onClick={open}
                data-testid="button-apply-about"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}
              >
                Apply for Engagement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-3"
            >
              {[
                { label: "Series A–C founders", note: "Scaling with institutional capital" },
                { label: "Pre-IPO operators", note: "Preparing for public market narrative" },
                { label: "VC-backed startups", note: "Building trust with enterprise buyers" },
                { label: "Elite boutique agencies", note: "Competing for premium positioning" },
                { label: "Private equity executives", note: "Establishing personal authority" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/2 group hover:border-white/10 hover:bg-white/4 transition-all duration-300">
                  <span className="text-white font-medium text-sm">{item.label}</span>
                  <span className="text-white/30 text-xs">{item.note}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
