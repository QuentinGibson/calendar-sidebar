import Calendar from "@/app/components/CalendarPage";
import CanvasFooter from "@/app/components/CanvasFooter";
import CanvasMenu from "@/app/components/CanvasMenu";
export default async function CalendarPage() {
  return (
    <>
      <div>
        <aside>
          <CanvasMenu />
        </aside>
        <main>
          <Calendar />
        </main>
        <footer>
          <CanvasFooter />
        </footer>
      </div>
    </>
  )
}