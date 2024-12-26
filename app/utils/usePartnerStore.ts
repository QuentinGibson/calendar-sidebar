import { create } from 'zustand'
import { useCalendarStore } from './calendarStore'
import { FabricText } from 'fabric'

type PartnerStore = {
  firstPartner: string
  getFirstPartner: () => string
  setFirstPartner: (partner: string) => void
  secondPartner: string
  getSecondPartner: () => string
  setSecondPartner: (partner: string) => void
  fabricNames: FabricText | null
  getFabricNames: () => FabricText | null
  setFabricNames: (names: FabricText) => void
}

export const usePartnerStore = create<PartnerStore>((set, get) => ({
  firstPartner: "First Partner",
  getFirstPartner: () => get().firstPartner,
  setFirstPartner: (partner: string) => {
    set({ firstPartner: partner })
    const fabricCanvas = useCalendarStore.getState().getFabricCanvas()
    const fabricNames = get().getFabricNames()
    const firstPartner = get().getFirstPartner()
    const secondPartner = get().getSecondPartner()
    if (!fabricNames || !fabricCanvas) return
    fabricNames?.set("text", firstPartner + " & " + secondPartner)
    fabricCanvas.centerObjectH(fabricNames)
    fabricCanvas.requestRenderAll()

  },
  secondPartner: "Second Partner",
  getSecondPartner: () => get().secondPartner,
  setSecondPartner: (partner: string) => {
    set({ secondPartner: partner })
    const fabricCanvas = useCalendarStore.getState().getFabricCanvas()
    const fabricNames = get().getFabricNames()
    const firstPartner = get().getFirstPartner()
    const secondPartner = get().getSecondPartner()
    if (!fabricNames || !fabricCanvas) return
    fabricNames?.set("text", firstPartner + " & " + secondPartner)
    fabricCanvas.centerObjectH(fabricNames)
    fabricCanvas.requestRenderAll()
  },
  fabricNames: null,
  getFabricNames: () => get().fabricNames,
  setFabricNames: (names: FabricText) => set({ fabricNames: names })
}))