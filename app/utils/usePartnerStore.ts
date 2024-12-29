import { create } from 'zustand'
import { useCalendarStore } from './calendarStore'
import { FabricText } from 'fabric'

const refreshNames = (get: () => PartnerStore) => {
  const fabricCanvas = useCalendarStore.getState().getFabricCanvas()
  const fabricNames = get().getFabricNames()
  const firstPartner = get().getFirstPartner()
  const secondPartner = get().getSecondPartner()
  if (!fabricNames || !fabricCanvas) return
  fabricNames?.set("text", firstPartner + " & " + secondPartner)
  fabricCanvas.centerObjectH(fabricNames)
  fabricCanvas.requestRenderAll()
}

export const usePartnerStore = create<PartnerStore>((set, get) => ({

  // Initial state for firstPartner, getter and setter functions
  firstPartner: "First Partner",
  getFirstPartner: () => get().firstPartner,
  setFirstPartner: (partner: string) => {
    set({ firstPartner: partner })
    refreshNames(get)
  },

  // Initial state for secondPartner, getter and setter functions
  secondPartner: "Second Partner",
  getSecondPartner: () => get().secondPartner,
  setSecondPartner: (partner: string) => {
    set({ secondPartner: partner })
    refreshNames(get)
  },

  // Initial state for fabricNames, getter and setter functions
  fabricNames: null,
  getFabricNames: () => get().fabricNames,
  setFabricNames: (names: FabricText) => set({ fabricNames: names })
}))