import { Button } from "./ui/button";

export default function CanvasFooter() {
  return (
    <div className="absolute w-screen bg-slate-700 bottom-0 py-2 flex justify-end pr-10 gap-8">
      <Button>Previous</Button>
      <Button>Next</Button>
      <Button>Save</Button>
      <Button>Submit</Button>
    </div>
  )
}