"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import BackButton from '@/components/BackButton'; // Import BackButton

const initialData = [
  { stationId: 'S001', stationName: 'Tokyo Station', earnings: 100000, passengers: 500, date: '2023-01-01' },
  { stationId: 'S002', stationName: 'Osaka Station', earnings: 80000, passengers: 400, date: '2023-01-02' },
  { stationId: 'S003', stationName: 'Kyoto Station', earnings: 60000, passengers: 300, date: '2023-01-03' },
  // Add more data as needed
];

export default function FinancialReportByStation() {
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
    (item.stationName.toLowerCase().includes(search.toLowerCase()) ||
    item.stationId.toLowerCase().includes(search.toLowerCase())) && 
    (!date || item.date === date)
  );

  const displayedData = filter
    ? filteredData.filter((item) => item.stationName === filter)
    : filteredData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-5xl p-4">
       <BackButton /> {/* Use BackButton component */}
      <Card className="w-full max-w-5xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Financial Report by Station</h1>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by station ID "
            value={search}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            value={filter}
            onChange={handleFilter}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by station</option>
            <option value="Tokyo Station">Tokyo Station</option>
            <option value="Osaka Station">Osaka Station</option>
            <option value="Kyoto Station">Kyoto Station</option>
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
              <th className="py-2 px-4 border-b">Station ID</th>
              <th className="py-2 px-4 border-b">Station Name</th>
              <th className="py-2 px-4 border-b">Earnings (JPY)</th>
              <th className="py-2 px-4 border-b">Total Passengers</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{item.stationId}</td>
                <td className="py-2 px-4 border-b text-center">{item.stationName}</td>
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