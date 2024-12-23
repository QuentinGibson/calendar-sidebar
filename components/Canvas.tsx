import Image from 'next/image'

interface CanvasProps {
  uploadedImage: string | null
  calendarSettings: {
    startMonth: string
    theme: string
    paperSize: string
  }
}

export default function Canvas({ uploadedImage, calendarSettings }: CanvasProps) {
  return (
    <div className="flex-1 bg-gray-100 p-4">
      <div className="bg-white aspect-[3/4] shadow-lg rounded-lg overflow-hidden">
        {uploadedImage ? (
          <Image src={uploadedImage} alt="Uploaded image" layout="fill" objectFit="cover" />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Upload an image to start
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          <h3 className="font-bold">Calendar Preview</h3>
          <p>Start Month: {calendarSettings.startMonth}</p>
          <p>Theme: {calendarSettings.theme}</p>
          <p>Paper Size: {calendarSettings.paperSize}</p>
        </div>
      </div>
    </div>
  )
}

