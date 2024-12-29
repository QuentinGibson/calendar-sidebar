"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from './ui/input'
import { useQuoteStore } from '@/app/utils/quoteStore'
import { usePartnerStore } from '@/app/utils/usePartnerStore'
import { useBackgroundStore, backgrounds } from '@/app/utils/backgroundStore'
import { useCalendarStore } from '@/app/utils/calendarStore'


export default function CalendarSettings() {
  const { firstPartner, secondPartner, setFirstPartner, setSecondPartner } = usePartnerStore()
  const { getMonthBackground, setMonthBackground } = useBackgroundStore()
  const { text, setText } = useQuoteStore()

  const monthIndex = useCalendarStore((state) => state.getMonth)()

  const background = getMonthBackground(monthIndex)
  const backgroundColors = Object.keys(backgrounds).map((background) => background)

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="monthTheme">Month Theme</Label>
        <Select
          value={background}
          onValueChange={(value: keyof typeof backgrounds) => setMonthBackground(monthIndex, value)}
        >
          <SelectTrigger id="monthTheme">
            <SelectValue placeholder="Select month theme" />
          </SelectTrigger>
          <SelectContent>
            {backgroundColors.map((color) => (
              <SelectItem key={color} value={color} >
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="theme">First Partner</Label>
        <Input id="theme" defaultValue={firstPartner || ""} onChange={(e) => setFirstPartner(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="theme">Second Partner</Label>
        <Input id="theme" defaultValue={secondPartner || ""} onChange={(e) => setSecondPartner(e.target.value)} />
      </div>
      <div>

        <Label htmlFor="theme">Quote</Label>
        <Input id="theme" defaultValue={text || ""} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  )
}

