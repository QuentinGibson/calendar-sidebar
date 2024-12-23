import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import PhotoUpload from './PhotoUpload'
import CalendarSettings from './CalendarSettings'

interface OptionsMenuProps {
  onImageUpload: (imageUrl: string) => void
  calendarSettings: {
    startMonth: string
    theme: string
    paperSize: string
  }
  onSettingsChange: (newSettings: Partial<typeof calendarSettings>) => void
}

export default function OptionsMenu({
  onImageUpload,
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

