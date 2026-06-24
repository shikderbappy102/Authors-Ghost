import { createContext, useContext } from "react";

export interface CalendlyContextType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const CalendlyContext = createContext<CalendlyContextType>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useCalendly() {
  return useContext(CalendlyContext);
}
