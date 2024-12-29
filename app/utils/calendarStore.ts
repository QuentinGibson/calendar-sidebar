import { Canvas } from "fabric";
import { create } from "zustand";


interface CalendarStore {
  coverTheme: string;
  month: number;
  setMonth: (month: number) => void;
  getMonth: () => number;
  backgroundImageElement: HTMLImageElement | null;
  getBackgroundImageElement: () => HTMLImageElement | null;
  setBackgroundImageElement: (image: HTMLImageElement) => void;
  fabricCanvas: Canvas | null;
  setFabricCanvas: (canvas: Canvas) => void;
  getFabricCanvas: () => Canvas | null;
}



export const useCalendarStore = create<CalendarStore>((set, get) => ({
  customQuote: "I Love You",
  fabricCanvas: null,
  backgroundImageElement: null,
  month: 0,
  setMonth: (month: number) => set({month}),
  getMonth: () => get().month,
  setBackgroundImageElement: (image: HTMLImageElement) => set({ backgroundImageElement: image }),
  getBackgroundImageElement: () => get().backgroundImageElement,
  setFabricCanvas: (fabricCanvas: Canvas) => set({ fabricCanvas: fabricCanvas }),
  getFabricCanvas: () => get().fabricCanvas,
  coverTheme: "default",
  firstPartnerName: "First Partner",
  secondPartnerName: "Second Partner",
}));
