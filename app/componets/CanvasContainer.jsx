'use client'
import { useState } from 'react';
import CustomCanvas from './CustomCanvas';
import { Button } from './ui/button';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMonth = months[currentIndex];

  const handleNext = () => {
    if (currentIndex === 11) setCurrentIndex(0);
    setCurrentIndex((prevState) => prevState + 1)
  }

  const handlePrevious = () => {
    if (currentIndex === 0) setCurrentIndex(11);
    setCurrentIndex((prevState) => prevState - 1);
  }

  return (
    <div className="grid gap-6 w-full justify-center">
      <div className="border rounded-lg p-4 max-w-[700px]">
        <h2 className="text-xl font-semibold mb-4">{currentMonth}</h2>
        {<CustomCanvas />}
      </div>
      <div className='flex justify-between'>
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}