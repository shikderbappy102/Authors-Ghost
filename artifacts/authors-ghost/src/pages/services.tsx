import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useCalendly } from "@/hooks/useCalendly";
import { ArrowRight, Target, Award, Shield, Globe } from "lucide-react";

const services = [
  {
    icon: <Target className="w-6 h-6" />,
    number: "01",
    title: "Founder Narrative Clarity",
    tagline: "Every touchpoint tells a story. Make sure yours is the right one.",
    problem: { label: "The Problem", text: "Most founders can explain what their company does in a pitch deck. Almost none can articulate who they are as a leader, why their specific background is uniquely qualified for this problem, and why the market should trust them specifically, not just their product." },
    solution: { label: "The Solution", text: "We architect your complete Founder Narrative: a precise, multi-layered story that explains not just what you do, but why you specifically are the inevitable authority in this space. We synchronize this narrative across every touchpoint." },
    outcome: { label: "The Outcome", text: "Consistent narrative precision that removes cognitive dissonance from your buyer's research process. When they search your name, they find a coherent, compelling story that pre-answers the question: Is this person worth trusting?" },
    color: "#3b82f6",
    deliverables: ["Narrative Architecture Document", "Positioning Statement Suite", "Bio Variants (long/short/LinkedIn)", "Messaging Matrix"],
  },
  {
    icon: <Award className="w-6 h-6" />,
    number: "02",
    title: "Authority Positioning System",
    tagline: "Be the first name they think of. Then the only name they consider.",
    problem: { label: "The Problem", text: "In saturated B2B markets, being competent is table stakes. Buyers don't have time to evaluate every qualified provider. They rely on perceived authority to shortlist. If you're not positioned as the authority in your category, you're competing on price and luck." },
    solution: { label: "The Solution", text: "We build your Authority Positioning System: a strategic architecture that places you at the recognized apex of your category. This includes thought leadership framework development, POV articulation, content positioning strategy, and speaking/media placement architecture." },
    outcome: { label: "The Outcome", text: "Top-of-mind positioning in your target buyer's consideration set. Inbound from ideal clients who already see you as the authority. The ability to charge premium pricing because you are perceived as the obvious best choice." },
    color: "#818cf8",
    deliverables: ["Category Authority Map", "Thought Leadership Framework", "Point-of-View Architecture", "Authority Distribution Strategy"],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    number: "03",
    title: "Market Trust Engineering",
    tagline: "Warm every conversation before it begins.",
    problem: { label: "The Problem", text: "Cold outreach fails not because of bad copy. It fails because of missing trust infrastructure. When a prospect receives a message from a founder they've never encountered, they make a 3-second Google judgment call. If that search returns nothing compelling, the message is dead on arrival." },
    solution: { label: "The Solution", text: "We engineer your complete trust signal ecosystem: the combination of digital presence elements that work together to create an immediate sense of credibility, competence, and safety. This is systematic, not tactical." },
    outcome: { label: "The Outcome", text: "Cold outreach becomes warm. Prospects who've never met you feel like they know you. Deal cycles compress because trust is pre-established. Investors respond to pitch decks. Enterprise buyers accelerate procurement timelines." },
    color: "#06b6d4",
    deliverables: ["Digital Trust Audit", "Trust Signal Architecture", "Social Proof Engineering", "Credibility Asset Development"],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    number: "04",
    title: "LinkedIn Authority Control",
    tagline: "The most visited page in your sales process. Treat it like one.",
    problem: { label: "The Problem", text: "LinkedIn is the first place every serious B2B buyer, investor, and executive candidate looks when evaluating a founder. Most founder LinkedIn profiles are either ghost towns or undifferentiated resumes. Neither conveys authority. Both cost deals." },
    solution: { label: "The Solution", text: "We execute a complete LinkedIn authority overhaul: profile reconstruction, headline and summary engineering, featured section architecture, content strategy and editorial calendar development, and engagement position design." },
    outcome: { label: "The Outcome", text: "Inbound connection requests from ideal buyers, investors, and strategic partners. Profile visits that convert to meeting requests. A LinkedIn presence that works as a 24/7 authority signal, compounding in value over time." },
    color: "#a78bfa",
    deliverables: ["Complete Profile Reconstruction", "Content Strategy & Calendar", "Engagement Architecture", "Authority Analytics Dashboard"],
  },
];

export default function Services() {
  const { open } = useCalendly();

  return (
    <Layout>
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top left, rgba(37,99,235,0.07) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">Capabilities</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95] mb-6 max-w-4xl">
              Four systems.<br />
              <span className="text-white/25">Zero compromise.</span>
            </h1>
            <p className="text-xl text-white/40 max-w-xl leading-relaxed">
              Each engagement is custom-architected. Each outcome is measurable. Each system is built to compound in value over time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 border-t border-white/4">
        <div className="max-w-6xl mx-auto px-6">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8 }}
              className="py-20 border-b border-white/4 last:border-0"
            >
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}>
                    {svc.icon}
                  </div>
                  <span className="text-4xl font-black md:mt-3 leading-none" style={{ color: `${svc.color}20` }}>{svc.number}</span>
                </div>
                <div className="md:col-span-11">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{svc.title}</h2>
                  <p className="text-white/35 italic mb-10">{svc.tagline}</p>
                  <div className="grid md:grid-cols-3 gap-5 mb-10">
                    {[svc.problem, svc.solution, svc.outcome].map((block, bi) => (
                      <div key={bi} className="p-6 rounded-xl border border-white/5 bg-white/2">
                        <p className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: svc.color }}>{block.label}</p>
                        <p className="text-white/45 text-sm leading-relaxed">{block.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="text-xs uppercase tracking-wider text-white/20 mr-1">Deliverables:</span>
                    {svc.deliverables.map((d, di) => (
                      <span key={di} className="px-3 py-1 rounded-full text-xs font-medium border"
                        style={{ borderColor: `${svc.color}25`, color: `${svc.color}90`, background: `${svc.color}08` }}>
                        {d}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={open}
                    data-testid={`button-request-audit-${i}`}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${svc.color}cc, ${svc.color}88)` }}
                  >
                    Request Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-white/4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Not sure which system you need?</h2>
            <p className="text-white/40 text-lg mb-10">Start with a Narrative Audit. We'll diagnose the gaps and prescribe the right architecture for your situation.</p>
            <button onClick={open} data-testid="button-book-audit-services"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}>
              Book a Narrative Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
