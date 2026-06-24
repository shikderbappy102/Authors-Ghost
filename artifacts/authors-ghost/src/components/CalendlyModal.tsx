import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

interface CalendlyModalProps {
  open: boolean;
  onClose: () => void;
}

export function CalendlyModal({ open, onClose }: CalendlyModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-lg"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border border-blue-500/20"
            style={{
              background: "#08090f",
              boxShadow: "0 0 100px rgba(37,99,235,0.18), 0 40px 80px rgba(0,0,0,0.6)",
            }}
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#4338ca)" }}>
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-medium">Authors Ghost</p>
                  <h3 className="text-sm font-bold text-white leading-none mt-0.5">Book Your Narrative Audit</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                data-testid="button-close-calendly"
              >
                <X size={16} />
              </button>
            </div>

            {/* Calendly iframe - direct embed, no script dependency */}
            <iframe
              src="https://calendly.com/alaminshikderbappy/30min?embed_type=Inline&hide_event_type_details=0&hide_gdpr_banner=1"
              width="100%"
              height="660"
              frameBorder="0"
              title="Book a Narrative Audit with Authors Ghost"
              data-testid="iframe-calendly"
              style={{ display: "block", border: "none" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
