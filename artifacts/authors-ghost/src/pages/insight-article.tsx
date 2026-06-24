import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { useCalendly } from "@/hooks/useCalendly";
import { articles, categoryColors } from "@/data/articles";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";

function parseContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) { elements.push(<div key={key++} className="h-4" />); continue; }

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-8 mt-2">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-14 mb-5 border-t border-white/5 pt-10">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="text-white font-semibold text-lg mb-3 mt-6">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.match(/^\*\*(.+?)\*\*/)) {
      const formatted = line.replace(/\*\*(.+?)\*\*/g, (_, t) => `<strong class="text-white font-semibold">${t}</strong>`);
      elements.push(
        <p key={key++} className="text-white/60 text-lg leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-white/60 text-lg leading-relaxed mb-2 ml-4">
          {line.slice(2)}
        </li>
      );
    } else {
      elements.push(
        <p key={key++} className="text-white/60 text-lg leading-[1.9] mb-5">
          {line}
        </p>
      );
    }
  }
  return elements;
}

interface InsightArticleProps {
  params?: { id?: string };
}

export default function InsightArticle({ params }: InsightArticleProps) {
  const { open } = useCalendly();
  const article = articles.find((a) => a.id === params?.id);

  if (!article) {
    return (
      <Layout>
        <div className="pt-40 pb-24 max-w-3xl mx-auto px-6 text-center">
          <p className="text-white/40 mb-6">Article not found.</p>
          <Link href="/insights" className="text-blue-400 hover:text-blue-300 transition-colors">
            Back to Insights
          </Link>
        </div>
      </Layout>
    );
  }

  const color = categoryColors[article.category] || "#3b82f6";
  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <Layout>
      <article>
        {/* Hero image header */}
        <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover opacity-45"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070810]/30 via-[#070810]/40 to-[#070810]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070810] via-transparent to-transparent" />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-end max-w-3xl mx-auto px-6 pb-12 w-full left-0 right-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8 group"
                data-testid="link-back-insights"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Insights
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                  style={{ background: `${color}18`, color: `${color}cc`, border: `1px solid ${color}30` }}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/50">
                  <Clock className="w-3 h-3" />{article.readTime} read
                </span>
                <span className="text-xs text-white/30">{article.date}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article body */}
        <section className="pb-24">
          <div className="max-w-3xl mx-auto px-6 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {parseContent(article.content)}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-white/4 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-4">Apply These Insights</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to engineer your own authority?
              </h2>
              <p className="text-white/40 mb-8">
                A Narrative Audit identifies exactly where your authority gaps are and what they are costing you.
              </p>
              <button
                onClick={open}
                data-testid="button-book-audit-article"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}
              >
                Book a Narrative Audit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Related articles */}
        {otherArticles.length > 0 && (
          <section className="py-16 border-t border-white/4">
            <div className="max-w-6xl mx-auto px-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/30 font-medium mb-8">More Insights</p>
              <div className="grid md:grid-cols-3 gap-5">
                {otherArticles.map((a) => {
                  const c = categoryColors[a.category] || "#3b82f6";
                  return (
                    <Link key={a.id} href={`/insights/${a.id}`}
                      className="group rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 block overflow-hidden"
                      data-testid={`link-related-article-${a.id}`}>
                      <div className="h-28 overflow-hidden">
                        <img src={a.image} alt={a.imageAlt}
                          className="w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                          loading="lazy" />
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] uppercase tracking-wide font-medium mb-2 block" style={{ color: c }}>
                          {a.category}
                        </span>
                        <h3 className="text-white font-bold leading-snug text-sm group-hover:text-blue-200 transition-colors">
                          {a.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
