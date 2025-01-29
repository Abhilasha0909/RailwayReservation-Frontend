"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';

const initialData = [
  { id: 'T001', station: 'Tokyo', earnings: 100000, passengers: 500 },
  { id: 'T002', station: 'Osaka', earnings: 80000, passengers: 400 },
  { id: 'T003', station: 'Kyoto', earnings: 60000, passengers: 300 },
  // Add more data as needed
];


export default function FinancialReport() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.station.toLowerCase().includes(search.toLowerCase())
  );

  const displayedData = filter
    ? filteredData.filter((item) => item.station === filter)
    : filteredData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-5xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Financial Report</h1>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by train ID "
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
            <option value="Tokyo">Tokyo</option>
            <option value="Osaka">Osaka</option>
            <option value="Kyoto">Kyoto</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Train ID</th>
              <th className="py-2 px-4 border-b">Station</th>
              <th className="py-2 px-4 border-b">Earnings (JPY)</th>
              <th className="py-2 px-4 border-b">Total Passengers</th>
            </tr>
          </thead>
          <tbody>
          {displayedData.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">{item.id}</td>
                <td className="py-2 px-4 border-b text-center">{item.station}</td>
                <td className="py-2 px-4 border-b text-center">{item.earnings}</td>
                <td className="py-2 px-4 border-b text-center">{item.passengers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}