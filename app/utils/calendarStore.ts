import { Canvas } from "fabric";
import { create } from "zustand";


interface CalendarStore {
  coverTheme: string;
  monthlySettings: { [key: string]: MonthlyCalendarSettings };
  fabricCanvas: Canvas | null;
  setFabricCanvas: (canvas: Canvas) => void;
  getFabricCanvas: () => Canvas | null;
  setMonthlyTheme: (value: (keyof typeof BackgroundTemplates), month: string) => void;
}

export enum BackgroundTemplates {
  Blossom = "/background/Couple Calendar Background Template Blossom.png",
  Blue = "/background/Couple Calendar Background Template Blossom.png",
  Brown = "/background/Couple Calendar Background Template Brown.png",
  Candy = "/background/Couple Calendar Background Template Candy.png",
  Clover = "/background/Couple Calendar Background Template Clover.png",
  Copper = "/background/Couple Calendar Background Template Copper.png",
  Cyan = "/background/Couple Calendar Background Template Cyan.png",
  DarkBlue = "/background/Couple Calendar Background Template Dark Blue.png",
  DarkGreen = "/background/Couple Calendar Background Template Dark Green.png",
  Grey = "/background/Couple Calendar Background Template Grey.png",
  Lavendar = "/background/Couple Calendar Background Template Lavendar.png",
  Green = "/background/Couple Calendar Background Template Green.png",
  Lime = "/background/Couple Calendar Background Template Lime.png",
  Orange = "/background/Couple Calendar Background Template Orange.png",
  Peach = "/background/Couple Calendar Background Template Peach.png",
  Red = "/background/Couple Calendar Background Template Red.png",
  Rose = "/background/Couple Calendar Background Template Rose.png",
  Sky = "/background/Couple Calendar Background Template Sky.png",
}


export const useCalendarStore = create<CalendarStore>((set, get) => ({
  customQuote: "I Love You",
  fabricCanvas: null,
  setFabricCanvas: (fabricCanvas: Canvas) => set({ fabricCanvas: fabricCanvas }),
  getFabricCanvas: () => get().fabricCanvas,
  coverTheme: "default",
  firstPartnerName: "First Partner",
  secondPartnerName: "Second Partner",
  monthlySettings: {
    'January': {
      monthTheme: BackgroundTemplates.Blue,
    },
    "February": {
      monthTheme: BackgroundTemplates.Red,
    },
    "March": {
      monthTheme: BackgroundTemplates.Green,
    },
    "April": {
      monthTheme: BackgroundTemplates.Peach,
    },
    "May": {
      monthTheme: BackgroundTemplates.Copper,
    },
    "June": {
      monthTheme: BackgroundTemplates.Cyan,
    },
    "July": {
      monthTheme: BackgroundTemplates.Lavendar,
    },
    "August": {
      monthTheme: BackgroundTemplates.Clover,
    },
    "September": {
      monthTheme: BackgroundTemplates.Candy,
    },
    "October": {
      monthTheme: BackgroundTemplates.Orange,
    },
    "November": {
      monthTheme: BackgroundTemplates.Brown,
    },
    "December": {
      monthTheme: BackgroundTemplates.DarkBlue,
    },
  },
  setMonthlyTheme: (value: (keyof typeof BackgroundTemplates), month: string) => set((state) => ({
    monthlySettings: Object.assign({}, state.monthlySettings, { [month]: { monthTheme: BackgroundTemplates[value] } })
  }))
}));
