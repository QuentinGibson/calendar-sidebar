import MenuButton from "@/app/components/MenuButton"
import {ArrowUpFromLine, Save, FileImage, RotateCcw} from "lucide-react"

interface CanvasMenuProps  {
  handleIndexReset: () => void
  handleSave: () => void
}

export default function CanvasMenu({handleIndexReset, handleSave}: CanvasMenuProps) {
  return (
    <div className="h-screen bg-slate-700 absolute">
      <div className="flex flex-col">
        <MenuButton icon={<ArrowUpFromLine />} />
        <MenuButton onClick={handleSave} icon={<Save />} />
        <MenuButton icon={<FileImage />} />
        <MenuButton onClick={handleIndexReset} icon={<RotateCcw />} />
      </div>
    </div>
  )
}