"use client"
import { useRouter } from 'next/router';
import CustomCanvas from './CustomCanvas';
import Link from 'next/link';
import { Button } from './ui/button';
import { useParams } from 'next/navigation';

interface CanvasContainerProps {
  month: number;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function CanvasContainer() {
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

  return (
    <div className="grid gap-6 w-full justify-center items-center h-full">
      {<CustomCanvas index={month} />}
      {/* <div className='flex justify-between'>
        <Button><Link href={previousLink()}>Previous</Link></Button>
        <Button><Link href={nextLink()}>Next</Link></Button>
      </div> */}
    </div>
  )
}