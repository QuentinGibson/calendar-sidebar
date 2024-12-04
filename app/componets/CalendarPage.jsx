"use client"
import {useState} from 'react';
import {ImageUploader} from './ImageUploader';
import {Button} from './ui/button';

export default function Calendar() {
  const [calendarData, setCalendarData] = useState({});
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

  const handleImageSelect = (imageData) => {
    if (imageData) {
      setCalendarData((prev) => ({
        ...prev,
        [imageData.month]: imageData,
      }));
    }
  };

  const handleSubmit = () => {
    // Here you can handle the submission of all images
    console.warn('Calendar Data:', calendarData);
    // You can send this data to your backend or process it further
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create Your Calendar
      </h1>

      <div className="grid gap-6 w-full justify-center">
        {months.map((month) => (
          <div key={month} className="border rounded-lg p-4 max-w-[700px]">
            <h2 className="text-xl font-semibold mb-4">{month}</h2>
            <ImageUploader
              handleImageSelect={handleImageSelect}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-8 py-3"
          disabled={Object.keys(calendarData).length === 0}
        >
          Create Calendar
        </Button>
      </div>
    </div>
  );
}
