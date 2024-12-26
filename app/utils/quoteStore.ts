import { create } from "zustand";
import { Canvas, FabricText } from "fabric";
import { useCalendarStore } from "./calendarStore";

interface QuoteStore {
  text: string;
  fabricQuote: FabricText | null;
  getFabricQuote: () => FabricText | null;
  setFabricQuote: (quote: FabricText) => void;
  getText: () => string;
  setText: (text: string) => void;
}

export const useQuoteStore = create<QuoteStore>((set, get) => ({
  text: "Forever & Longer",
  getText: () => get().text,
  setText: (text: string) => {
    const fabricCanvas = useCalendarStore.getState().getFabricCanvas()
    const fabricQuote = get().getFabricQuote()
    if (!fabricQuote || !fabricCanvas) return
    set({ text })
    fabricQuote.set("text", text)
    fabricCanvas.centerObjectH(fabricQuote)
    fabricCanvas.requestRenderAll()
  },
  fabricQuote: null,
  getFabricQuote: () => get().fabricQuote,
  setFabricQuote: (fabricQuote: FabricText) => set({ fabricQuote: fabricQuote }),
}));
