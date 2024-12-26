import { create } from "zustand";
import { Canvas } from "fabric";

interface FabricStore {
  fabricCanvas: Canvas;
  setFabricCanvas: (canvas: Canvas) => void;
}

export const useFabricStore = create<FabricStore>((set) => ({
  fabricCanvas: new Canvas(),
  setFabricCanvas: (canvas: Canvas) => set({ fabricCanvas: canvas }),
}));
