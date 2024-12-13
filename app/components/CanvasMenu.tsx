import MenuButton from "@/app/components/MenuButton"
import { Save, RotateCcw, ImageOff } from "lucide-react"
import { UploadButton } from "../utils/uploadthings"
import { ClientUploadedFileData } from "uploadthing/types"

interface CanvasMenuProps {
  handleIndexReset: () => void
  handleSave: () => void
  handleFileUpload: (res: ClientUploadedFileData<{ uploadedBy: string }>[]) => void
  handleImageRemove: () => void
}

export default function CanvasMenu({ handleIndexReset, handleSave, handleFileUpload, handleImageRemove }: CanvasMenuProps) {
  return (
    <div className="h-screen bg-slate-700 absolute left-0 z-20">
      <div className="flex flex-col">
        {/* <MenuButton icon={<ArrowUpFromLine />} /> */}
        <UploadButton
          endpoint="imageUploader"
          className="py-8"
          onClientUploadComplete={(res) => {
            // Do something with the response
            handleFileUpload(res)
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <MenuButton onClick={handleSave} icon={<Save />} />
        <MenuButton onClick={handleImageRemove} icon={<ImageOff /> } />
        <MenuButton onClick={handleIndexReset} icon={<RotateCcw />} />
      </div>
    </div>
  )
}