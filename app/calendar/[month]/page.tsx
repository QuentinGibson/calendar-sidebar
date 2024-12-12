import Calendar from "@/app/components/CalendarPage";
interface CalendarPageProps {
  params: {
    month: string
  }
}
export default async function CalendarPage({params}: CalendarPageProps) {
  const month = parseInt((await params).month)
  if (month < 0 || month > 11) {
    return <div>Invalid month</div>
  }
  return (
    <>
      <Calendar />
    </>
  )
}