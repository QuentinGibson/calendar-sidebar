"use client"

import FooterButton from "@/components/FooterButton";
import { useCalendarStore } from "../app/utils/calendarStore";
import { useBackgroundStore } from "../app/utils/backgroundStore";

export default function CanvasFooter() {
  const {monthIndex, setMonthIndex} = useCalendarStore()
  const {resetMonthBackgrounds} = useBackgroundStore()

  const handlePreviousClick = () => {
    if (monthIndex === 0) {
      setMonthIndex(11)
    } else {
      setMonthIndex(monthIndex - 1)
    }
  }

  const handleNextClick = () => {
    if (monthIndex === 11) {
      setMonthIndex(0)
    } else {
      setMonthIndex(monthIndex + 1);
    }
  }

  const handleSubmit = () => {
    console.log("Too be implemented")
  }
  return (
    <div className="bg-slate-700 py-2 flex justify-end pr-10 gap-8 grid-footer">
      <FooterButton onClick={handlePreviousClick}>
        Previous
      </FooterButton>
      <FooterButton onClick={handleNextClick}>
        Next
      </FooterButton>
      <FooterButton onClick={() => resetMonthBackgrounds()}>Reset All</FooterButton>
      <FooterButton disabled={true} onClick={() => handleSubmit()}>Submit</FooterButton>
    </div>
  )
}