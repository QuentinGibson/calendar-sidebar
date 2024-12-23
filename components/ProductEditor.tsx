'use client'

import { useState } from 'react'
import OptionsMenu from './OptionsMenu'

export default function ProductEditor() {
  const [calendarSettings, setCalendarSettings] = useState<MonthlyCalendarSettings>({
    customQuote: "Custom",
    monthTheme: 'Classic',
  })

  const [yearlyCalendarSettings, setYearlyCalendarSettings] = useState<YearlyCalendarSettings>({
    coverTheme: 'Classic',
    firstPartnerName: 'Person 1 name',
    secondPartnerName: 'Person 2 name',
    quote: 'Custom',
  })

  const handleSettingsChange = (newSettings: Partial<MonthlyCalendarSettings>) => {
    setCalendarSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }

  const handleYearlySettingsChange = (newSettings: Partial<YearlyCalendarSettings>) => {
    setYearlyCalendarSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }

  return (
    <div className="flex h-screen">
      <OptionsMenu
        calendarSettings={calendarSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  )
}

