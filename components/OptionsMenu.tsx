"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import CalendarSettings from './CalendarSettings'

interface OptionsMenuProps {
  calendarSettings: MonthlyCalendarSettings
  onSettingsChange: (newSettings: Partial<MonthlyCalendarSettings>) => void
}

export default function OptionsMenu({
  calendarSettings,
  onSettingsChange,
}: OptionsMenuProps) {

  return (
    <div className="text-white bg-slate-700 grid-options p-4 overflow-y-auto">
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between mt-4 pl-2">
            Calendar Settings
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CalendarSettings settings={calendarSettings} onSettingsChange={onSettingsChange} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

