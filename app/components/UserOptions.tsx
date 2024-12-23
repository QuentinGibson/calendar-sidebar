import OptionsMenu from "@/components/OptionsMenu"


export default function UserOptions() {
  return (
      <OptionsMenu onSettingsChange={(newSettings) => { console.log(newSettings) } } calendarSettings={{
        customQuote: "",
        monthTheme: "",
      }}/>
  )
}