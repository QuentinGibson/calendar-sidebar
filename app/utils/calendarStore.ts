import { Canvas } from "fabric";
import { create } from "zustand";
interface CalendarStore {
  coverTheme: string;
  getCoverTheme: () => string;
  setCoverTheme: (coverTheme: string) => void;
  monthIndex: number;
  setMonthIndex: (monthIndex: number) => void;
  getMonthIndex: () => number;
  backgroundImageElement: HTMLImageElement | null;
  getBackgroundImageElement: () => HTMLImageElement | null;
  setBackgroundImageElement: (backgroundImageElement: HTMLImageElement) => void;
  fabricCanvas: Canvas | null;
  setFabricCanvas: (fabricCanvas: Canvas) => void;
  getFabricCanvas: () => Canvas | null;
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  // Initial state for fabricCanvas, setter and getter functions
  fabricCanvas: null,
  setFabricCanvas: (fabricCanvas: Canvas) => set({ fabricCanvas }),
  getFabricCanvas: () => get().fabricCanvas,

  // Initial state for backgroundImageElement, setter and getter functions
  backgroundImageElement: null,
  setBackgroundImageElement: (backgroundImageElement: HTMLImageElement) => set({ backgroundImageElement }),
  getBackgroundImageElement: () => get().backgroundImageElement,

  // Initial state for month, setter and getter functions
  monthIndex: 0,
  setMonthIndex: (monthIndex: number) => set({ monthIndex }),
  getMonthIndex: () => get().monthIndex,

  // Initial state for coverTheme, getter and setter functions
  coverTheme: "default",
  setCoverTheme: (coverTheme: string) => set({ coverTheme }),
  getCoverTheme: () => get().coverTheme,
}));
