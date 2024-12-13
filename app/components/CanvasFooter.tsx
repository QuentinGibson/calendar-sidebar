"use client"

import FooterButton from "@/app/components/FooterButton";
import Link from "next/link";
import { useParams } from "next/navigation";

interface CanvasFooter {
  handleReset: () => void
}

export default function CanvasFooter({handleReset}: CanvasFooter) {
  const params = useParams()
  const monthStr = params.month as string
  const month = parseInt(monthStr)

  const previousLink = () => {
    const baseLink = `/calendar/`;
    if (month === 0) return baseLink + '11';
    return baseLink + (month - 1);
  }

  const nextLink = () => {
    const baseLink = `/calendar/`;
    if (month === 11) return baseLink + '0';
    return baseLink + (month + 1);
  }


  const handleSubmit = () => {
    console.log("Submit")
  }
  return (
    <div className="absolute w-screen bg-slate-700 bottom-0 py-2 flex justify-end pr-10 gap-8 z-20">
      <FooterButton>
        <Link href={previousLink()}>Previous</Link>
      </FooterButton>
      <FooterButton>
        <Link href={nextLink()}>Next</Link>
      </FooterButton>
      <FooterButton onClick={() => handleReset()}>Reset All</FooterButton>
      <FooterButton disabled={true} onClick={() => handleSubmit()}>Submit</FooterButton>
    </div>
  )
}