import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void
}

export default function PhotoUpload({ onImageUpload }: PhotoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile)
      onImageUpload(imageUrl)
    }
  }

  return (
    <div className="space-y-4">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!selectedFile}>
        Upload Photo
      </Button>
    </div>
  )
}

