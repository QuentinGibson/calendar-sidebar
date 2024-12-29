"use client"

import FooterButton from "@/app/components/FooterButton";
import { useCalendarStore } from "../utils/calendarStore";

interface CanvasFooter {
  handleReset: () => void
}

export default function CanvasFooter({handleReset}: CanvasFooter) {
  const month = useCalendarStore(state => state.getMonth)()
  const setMonth = useCalendarStore(state => state.setMonth)

  const handlePreviousClick = () => {
    if (month === 0) {
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  const handleNextClick = () => {
    if (month === 11) {
      setMonth(0)
    } else {
      setMonth(month + 1);
    }
  }


  const handleSubmit = () => {
    console.log("Submit")
  }
  return (
    <div className="bg-slate-700 py-2 flex justify-end pr-10 gap-8 grid-footer">
      <FooterButton onClick={handlePreviousClick}>
        Previous
      </FooterButton>
      <FooterButton onClick={handleNextClick}>
        Next
      </FooterButton>
      <FooterButton onClick={() => handleReset()}>Reset All</FooterButton>
      <FooterButton disabled={true} onClick={() => handleSubmit()}>Submit</FooterButton>
    </div>
  )
}