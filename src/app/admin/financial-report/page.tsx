"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import BackButton from '@/components/BackButton'; // Import BackButton

const initialData = [
  { trainNumber: 'T001', trainName: 'Express 1', earnings: 100000, passengers: 500, date: '2025-01-01' },
  { trainNumber: 'T002', trainName: 'Express 2', earnings: 80000, passengers: 400, date: '2025-01-02' },
  { trainNumber: 'T003', trainName: 'Local 1', earnings: 60000, passengers: 300, date: '2025-01-03' },
  { trainNumber: 'T004', trainName: 'Local 2', earnings: 70000, passengers: 350, date: '2025-01-04' },
  { trainNumber: 'T005', trainName: 'Express 3', earnings: 90000, passengers: 450, date: '2025-01-05' },
  { trainNumber: 'T001', trainName: 'Express 1', earnings: 50000, passengers: 250, date: '2025-01-06' },
  { trainNumber: 'T002', trainName: 'Express 2', earnings: 110000, passengers: 550, date: '2025-01-07' },
  { trainNumber: 'T003', trainName: 'Local 1', earnings: 120000, passengers: 600, date: '2025-01-08' },
  { trainNumber: 'T004', trainName: 'Local 2', earnings: 130000, passengers: 650, date: '2025-01-09' },
  { trainNumber: 'T005', trainName: 'Express 3', earnings: 140000, passengers: 700, date: '2025-01-10' },
  // Add more data as needed
];

export default function FinancialReportByTrain() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const filteredData = data.filter((item) =>
    (item.trainNumber.toLowerCase().includes(search.toLowerCase()) ||
    item.trainName.toLowerCase().includes(search.toLowerCase())) && 
    (!date || item.date === date)
  );

  const displayedData = filter
    ? filteredData.filter((item) => item.trainName === filter)
    : filteredData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl p-4">
        <BackButton /> {/* Use BackButton component */}
        <Card className="w-full p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Financial Report by Train</h1>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by train ID or train name"
              value={search}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded"
            />
            <select
              value={filter}
              onChange={handleFilter}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Filter by train name</option>
              <option value="Express 1">Express 1</option>
              <option value="Express 2">Express 2</option>
              <option value="Local 1">Local 1</option>
              <option value="Local 2">Local 2</option>
              <option value="Express 3">Express 3</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              max={currentDate} // Set max to current date
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Train ID</th>
                <th className="py-2 px-4 border-b">Train Name</th>
                <th className="py-2 px-4 border-b">Earnings (JPY)</th>
                <th className="py-2 px-4 border-b">Total Passengers</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">{item.trainNumber}</td>
                  <td className="py-2 px-4 border-b text-center">{item.trainName}</td>
                  <td className="py-2 px-4 border-b text-center">{item.earnings}</td>
                  <td className="py-2 px-4 border-b text-center">{item.passengers}</td>
                  <td className="py-2 px-4 border-b text-center">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}