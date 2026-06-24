import React from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useCalendly } from "@/hooks/useCalendly";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { articles, categoryColors } from "@/data/articles";

export default function Insights() {
  const { open } = useCalendly();
  const [featured, ...rest] = articles;

  return (
    <Layout>
      {/* Header */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(79,70,229,0.07) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-6">Insights</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95] mb-6">
              Thought leadership<br />
              <span className="text-white/25">from the authority firm.</span>
            </h1>
            <p className="text-xl text-white/40 max-w-xl leading-relaxed">
              Research, frameworks, and analysis on founder authority, perception engineering, and trust economics in B2B markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured article */}
      <section className="border-t border-white/4 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <Link href={`/insights/${featured.id}`} data-testid={`link-featured-article-${featured.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8 }}
              className="group relative mt-12 rounded-2xl border border-white/8 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/10 hover:border-white/15 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Featured image */}
              <div className="relative h-72 overflow-hidden rounded-t-2xl">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070810]/30 to-[#070810]" />
                {/* Badges on image */}
                <div className="absolute bottom-6 left-8 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                    style={{ background: "#3b82f618", color: "#60a5fa", border: "1px solid #3b82f630" }}>
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                    style={{ background: `${categoryColors[featured.category]}18`, color: `${categoryColors[featured.category]}cc`, border: `1px solid ${categoryColors[featured.category]}30` }}>
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/50 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />{featured.readTime} read
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse at top left, rgba(37,99,235,0.05) 0%, transparent 60%)" }} />
              <div className="relative z-10 p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-blue-100 transition-colors max-w-3xl">
                  {featured.title}
                </h2>
                <p className="text-white/45 text-base leading-relaxed max-w-2xl mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/25 uppercase tracking-wider">{featured.date}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:gap-3 transition-all">
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article, i) => {
              const color = categoryColors[article.category] || "#3b82f6";
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.65 }}
                >
                  <Link href={`/insights/${article.id}`} data-testid={`link-article-${article.id}`}>
                    <div className="group relative rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-400 cursor-pointer overflow-hidden h-full flex flex-col">
                      {/* Card image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.imageAlt}
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-600"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070810]" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(ellipse at top, ${color}10 0%, transparent 70%)` }} />
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide"
                            style={{ background: `${color}12`, color: `${color}cc`, border: `1px solid ${color}22` }}>
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-white/25">
                            <Clock className="w-3 h-3" />{article.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-3 group-hover:text-blue-100 transition-colors leading-snug flex-1">
                          {article.title}
                        </h3>
                        <p className="text-white/30 text-xs leading-relaxed mb-5 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-[10px] text-white/20 uppercase tracking-wider">{article.date}</span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
                            Read <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Ready to apply these frameworks?
            </h2>
            <p className="text-white/40 mb-8">
              Book a Narrative Audit and we will diagnose exactly where your authority gaps are costing you deals.
            </p>
            <button
              onClick={open}
              data-testid="button-book-audit-insights"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}
            >
              Book a Narrative Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
