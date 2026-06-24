import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CalendlyModal } from "@/components/CalendlyModal";
import { CalendlyContext } from "@/hooks/useCalendly";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CalendlyContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
      <div className="min-h-[100dvh] flex flex-col bg-[#070810] text-white selection:bg-blue-500/30 selection:text-blue-200">
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
        <CalendlyModal open={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </CalendlyContext.Provider>
  );
}
