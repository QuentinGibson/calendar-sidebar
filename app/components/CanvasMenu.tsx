import MenuButton from "@/app/components/MenuButton"
import { Save, RotateCcw, ImageOff, ImageUp } from "lucide-react"
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
    <div className=" bg-slate-700 grid-menu p-4">
      <div className="flex flex-col">
        <UploadButton
          endpoint="imageUploader"
          className="py-2 ut-button:w-full ut-allowed-content:hidden"
          content={{ button: <ImageUp /> }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            handleFileUpload(res)
            console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log(error, "error");
          }}
        />
        <MenuButton onClick={handleSave} icon={<Save />} />
        <MenuButton onClick={handleImageRemove} icon={<ImageOff /> } />
        <MenuButton onClick={handleIndexReset} icon={<RotateCcw />} />
      </div>
    </div>
  )
}