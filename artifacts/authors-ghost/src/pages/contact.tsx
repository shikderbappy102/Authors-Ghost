import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCalendly } from "@/hooks/useCalendly";
import { Shield, Lock, ArrowRight, Calendar, Linkedin } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const { open } = useCalendly();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Audit Request Received",
      description: "Our team will review your application and be in touch within 24 hours.",
    });
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, rgba(37,99,235,0.08) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at bottom left, rgba(79,70,229,0.05) 0%, transparent 60%)" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">Application</p>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                Request a<br />
                <span style={{
                  background: "linear-gradient(135deg, #60a5fa, #818cf8)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>Narrative Audit.</span>
              </h1>
              <p className="text-white/40 text-lg leading-relaxed mb-12">
                We work exclusively with high-growth B2B founders, pre-IPO operators, and elite agencies.
                Complete the form to begin your authority assessment.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: <Lock className="w-4 h-4 text-blue-400" />,
                    title: "Strict Confidentiality",
                    desc: "All materials and communications are protected under immediate NDA.",
                  },
                  {
                    icon: <Shield className="w-4 h-4 text-indigo-400" />,
                    title: "Invite-Only Engagements",
                    desc: "We accept a limited number of clients per quarter to guarantee quality.",
                  },
                  {
                    icon: <Calendar className="w-4 h-4 text-cyan-400" />,
                    title: "24-Hour Response",
                    desc: "Our team reviews all applications within one business day.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/4 border border-white/8 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/jakir-hossain-127009292/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin-contact"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-blue-500/30 transition-all duration-300 mb-6 w-full"
              >
                <Linkedin className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">Connect on LinkedIn</p>
                  <p className="text-white/30 text-xs truncate">linkedin.com/in/jakir-hossain-127009292</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0" />
              </a>

              {/* Book directly */}
              <div className="p-5 rounded-2xl border border-white/6 bg-white/2">
                <p className="text-sm text-white/50 mb-4">Prefer to speak directly?</p>
                <button
                  onClick={open}
                  data-testid="button-schedule-direct-call"
                  className="group w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-semibold text-white border border-blue-500/25 bg-blue-500/8 hover:bg-blue-500/15 hover:border-blue-500/40 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    Schedule a Private Call
                  </span>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl border border-white/8 bg-white/2 p-8 backdrop-blur-sm"
                style={{ boxShadow: "0 0 60px rgba(37,99,235,0.06)" }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white/60 text-xs uppercase tracking-wider">First Name</Label>
                      <Input id="firstName" placeholder="John" required data-testid="input-first-name"
                        className="bg-white/3 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-0 rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white/60 text-xs uppercase tracking-wider">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required data-testid="input-last-name"
                        className="bg-white/3 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-0 rounded-xl h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider">Work Email</Label>
                    <Input id="email" type="email" placeholder="founder@company.com" required data-testid="input-email"
                      className="bg-white/3 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-0 rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white/60 text-xs uppercase tracking-wider">Company URL</Label>
                    <Input id="company" placeholder="https://company.com" required data-testid="input-company"
                      className="bg-white/3 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-0 rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue" className="text-white/60 text-xs uppercase tracking-wider">Annual Revenue Range</Label>
                    <select id="revenue" data-testid="select-revenue"
                      className="w-full h-12 px-4 rounded-xl bg-white/3 border border-white/8 text-white/70 text-sm focus:border-blue-500/50 focus:outline-none">
                      <option value="" className="bg-[#0a0b14]">Select range</option>
                      <option value="pre-revenue" className="bg-[#0a0b14]">Pre-revenue</option>
                      <option value="sub-1m" className="bg-[#0a0b14]">Under $1M</option>
                      <option value="1-5m" className="bg-[#0a0b14]">$1M to $5M</option>
                      <option value="5-20m" className="bg-[#0a0b14]">$5M to $20M</option>
                      <option value="20m-plus" className="bg-[#0a0b14]">$20M+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/60 text-xs uppercase tracking-wider">Current Situation</Label>
                    <Textarea id="message" required data-testid="textarea-message"
                      placeholder="Describe your current market position and what you are trying to achieve..."
                      className="min-h-[120px] bg-white/3 border-white/8 text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-0 rounded-xl resize-none" />
                  </div>
                  <div className="pt-2 flex flex-col gap-3">
                    <button type="submit" data-testid="button-submit-audit"
                      className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                      style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }} />
                      <span className="relative z-10">Request Authority Audit</span>
                      <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button type="button" onClick={open} data-testid="button-schedule-call-form"
                      className="w-full py-4 rounded-xl text-base font-medium text-white/50 border border-white/8 hover:border-white/20 hover:text-white hover:bg-white/4 transition-all duration-300">
                      Schedule a Private Call Instead
                    </button>
                  </div>
                  <p className="text-center text-xs text-white/20 uppercase tracking-wider">
                    Strictly confidential · NDA on first contact
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
