"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

interface CalendarSettingsProps {
  settings: MonthlyCalendarSettings
  onSettingsChange: (newSettings: any) => void
  
}

export default function CalendarSettings({ settings, onSettingsChange }: CalendarSettingsProps) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const themes = ['Classic', 'Modern', 'Minimalist', 'Colorful']

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="startMonth">Start Month</Label>
        <Select
          value={settings.monthTheme}
          onValueChange={(value) => onSettingsChange({ startMonth: value })}
        >
          <SelectTrigger id="startMonth">
            <SelectValue placeholder="Select start month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="theme">Monthly Quote</Label>
        <Select
          value={settings.customQuote || ""}
          onValueChange={(value) => onSettingsChange({ theme: value })}
        >
          <SelectTrigger id="theme">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

