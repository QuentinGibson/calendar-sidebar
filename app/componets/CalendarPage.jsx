"use client"
import CustomCanvas from './CustomCanvas';

export default function Calendar() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Create Your Calendar
      </h1>

      <div className="grid gap-6 w-full justify-center">
        {months.map((month) => (
          <div key={month} className="border rounded-lg p-4 max-w-[700px]">
            <h2 className="text-xl font-semibold mb-4">{month}</h2>
            <CustomCanvas />
          </div>
        ))}
      </div>
    </div>
  );
}
