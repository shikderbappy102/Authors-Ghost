import React from "react";
import { Link } from "wouter";
import { useCalendly } from "@/hooks/useCalendly";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { open } = useCalendly();

  return (
    <footer className="border-t border-white/4 pt-20 pb-10" style={{ background: "#050609" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Top CTA strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-16 border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400 font-medium mb-2">Limited Engagements</p>
            <h3 className="text-2xl md:text-3xl font-black text-white">Ready to engineer your authority?</h3>
          </div>
          <button
            onClick={open}
            data-testid="button-book-audit-footer"
            className="group shrink-0 inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)" }}
          >
            Book Your Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-5" data-testid="link-footer-logo">
              <Logo iconSize={32} />
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              An elite perception engineering firm for B2B founders. We build the authority that converts strangers into believers before the conversation begins.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/50 mb-5 uppercase tracking-widest">Firm</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/insights", label: "Insights" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/30 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white/50 mb-5 uppercase tracking-widest">Connect</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={open} className="text-sm text-white/30 hover:text-white transition-colors text-left" data-testid="link-footer-request-audit">
                  Request Audit
                </button>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jakir-hossain-127009292/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/30 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>&copy; {new Date().getFullYear()} Authors Ghost. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
