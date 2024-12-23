'use client'

import { useState } from 'react'
import Canvas from './Canvas'
import OptionsMenu from './OptionsMenu'

export default function ProductEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [calendarSettings, setCalendarSettings] = useState({
    startMonth: 'January',
    theme: 'Classic',
    paperSize: 'A4',
  })

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
  }

  const handleSettingsChange = (newSettings: Partial<typeof calendarSettings>) => {
    setCalendarSettings((prevSettings) => ({ ...prevSettings, ...newSettings }))
  }

  return (
    <div className="flex h-screen">
      <Canvas uploadedImage={uploadedImage} calendarSettings={calendarSettings} />
      <OptionsMenu
        onImageUpload={handleImageUpload}
        calendarSettings={calendarSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  )
}

