import OptionsMenu from "@/components/OptionsMenu"


export default function UserOptions() {
  return (
      <OptionsMenu onImageUpload={(image) => console.log("Image updated")} onSettingsChange={(newSettings) => { console.log(newSettings) } } calendarSettings={{
        startMonth: "Janurary",
        theme: "",
        paperSize: ""
      }}/>
  )
}