interface YearlyCalendarSettings {
  coverTheme: string;
  firstPartnerName: string;
  secondPartnerName: string;
}

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

interface QuoteStore {
  text: string;
  fabricQuote: FabricText | null;
  getFabricQuote: () => FabricText | null;
  setFabricQuote: (quote: FabricText) => void;
  getText: () => string;
  setText: (text: string) => void;
}

interface BackgroundStore {
  monthBackgrounds: Record<number, string>
  setMonthBackground: (month: number, background: string) => void
  getMonthBackground: (month: number) => string 
  resetMonthBackgrounds: () => void
}
