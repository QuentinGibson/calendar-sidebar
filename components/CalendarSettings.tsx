"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useCalendarStore } from '@/app/utils/calendarStore'
import { Input } from './ui/input'
import { useParams } from 'next/navigation'
import { useQuoteStore } from '@/app/utils/quoteStore'


export default function CalendarSettings() {
  const params = useParams()
  const monthStr = params.month as string
  const monthIndex = parseInt(monthStr)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[monthIndex]

  const backgroundColors: (keyof typeof BackgroundTemplates)[] = [
    'Blossom',
    'Blue',
    'Brown',
    'Candy',
    'Clover',
    'Copper',
    'Cyan',
    'DarkBlue',
    'DarkGreen',
    'Grey',
    'Lavendar',
    'Green',
    'Lime',
    'Orange',
    'Peach',
    'Red',
    'Rose',
    'Sky',
   ]

  const settings = useCalendarStore((state) => state.monthlySettings)
  const currentTheme = useCalendarStore((state) => state.monthlySettings[month].monthTheme)
  const customQuote = useCalendarStore((state) => state.customQuote)

  const onThemeChange = useCalendarStore((state) => state.setMonthlyTheme)
  const setText = useQuoteStore((state) => state.setText)
  const quoteText = useQuoteStore((state) => state.text)

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="startMonth">Month Theme</Label>
        <Select
          value={currentTheme}
          onValueChange={(value: (keyof typeof BackgroundTemplates)) => onThemeChange(value, months[monthIndex])}
        >
          <SelectTrigger id="startMonth">
            <SelectValue placeholder="Select month theme" defaultValue={settings[months[monthIndex]].monthTheme} />
          </SelectTrigger>
          <SelectContent>
            {backgroundColors.map((color) => (
              <SelectItem key={color} value={color} onChange={() => onThemeChange(color, months[monthIndex])}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="theme">Quote</Label>
        <Input id="theme" defaultValue={quoteText || ""}  onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  )
}

