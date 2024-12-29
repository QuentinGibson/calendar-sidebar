import { create } from "zustand";
import { FabricText } from "fabric";
import { useCalendarStore } from "./calendarStore";

export const useQuoteStore = create<QuoteStore>((set, get) => ({

  // Initial state for text, getter and setter functions
  text: "Forever & Longer",
  getText: () => get().text,
  setText: (text: string) => {
    const fabricCanvas = useCalendarStore.getState().getFabricCanvas();
    const fabricQuote = get().getFabricQuote();
    if (!fabricQuote || !fabricCanvas) return;
    set({ text });
    fabricQuote.set("text", text);
    fabricCanvas.centerObjectH(fabricQuote);
    fabricCanvas.requestRenderAll();
  },

  // Initial state for fabricQuote, getter and setter functions
  fabricQuote: null,
  getFabricQuote: () => get().fabricQuote,
  setFabricQuote: (fabricQuote: FabricText) => set({ fabricQuote: fabricQuote }),
}));
