import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Define the available backgrounds
export const backgrounds: Record<string, string> = {
  "Cool Blue": "/background/Couple Calendar Background Template Cool Blue.png",
  "Blossom": "/background/Couple Calendar Background Template Blossom.png",
  "Blue": "/background/Couple Calendar Background Template Blue.png",
  "Green": "/background/Couple Calendar Background Template Green.png",
  "Rose": "/background/Couple Calendar Background Template Rose.png",
  "Candy": "/background/Couple Calendar Background Template Candy.png",
  "Brown": "/background/Couple Calendar Background Template Brown.png",
  "Clover": "/background/Couple Calendar Background Template Clover.png",
  "Copper": "/background/Couple Calendar Background Template Copper.png",
  "Cyan": "/background/Couple Calendar Background Template Cyan.png",
  "Dark Green": "/background/Couple Calendar Background Template Dark Green.png",
  "Grey": "/background/Couple Calendar Background Template Grey.png",
  "Lavendar": "/background/Couple Calendar Background Template Lavendar.png",
  "Lime": "/background/Couple Calendar Background Template Lime.png",
  "Orange": "/background/Couple Calendar Background Template Orange.png"
}

// Define the default backgrounds for each month
const defaultBackgrounds: Record<number, string> = {
  0: "Cool Blue",
  1: "Blossom",
  2: "Blue",
  3: "Green",
  4: "Rose",
  5: "Candy",
  6: "Brown",
  7: "Clover",
  8: "Copper",
  9: "Cyan",
  10: "Dark Green",
  11: "Grey",
}

// Create the useBackgroundStore store using Zustand
export const useBackgroundStore = create<BackgroundStore>()(
  persist((set, get) => ({
    // Initial state for monthBackgrounds, setter and getter functions
    monthBackgrounds: defaultBackgrounds,
    setMonthBackground: (month: number, background: keyof typeof backgrounds) =>
      set(state => {
        const newState = Object.assign({}, state)
        newState.monthBackgrounds[month] = background
        return { monthBackgrounds: newState.monthBackgrounds }
      }),
    getMonthBackground: month => get().monthBackgrounds[month],
    // Reset all month backgrounds to default
    resetMonthBackgrounds: () => set({ monthBackgrounds: defaultBackgrounds }),
  }),
    // Persist the monthBackgrounds state in localStorage
    { name: 'backgrounds' }
  )
)

