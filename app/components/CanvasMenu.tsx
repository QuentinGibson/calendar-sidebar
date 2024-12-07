import MenuButton from "@/app/components/MenuButton"
import {ArrowUpFromLine, Save, FileImage, RotateCcw} from "lucide-react"

export default function CanvasMenu() {
  return (
    <div className="h-screen bg-slate-700 absolute">
      <div className="flex flex-col">
        <MenuButton icon={<ArrowUpFromLine />} />
        <MenuButton icon={<Save />} />
        <MenuButton icon={<FileImage />} />
        <MenuButton icon={<RotateCcw />} />
      </div>
    </div>
  )
}