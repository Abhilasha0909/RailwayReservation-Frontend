"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import BackButton from '@/components/BackButton'; // Import BackButton

const initialData = [
  { stationId: 1, station: 'Kashmere Gate', earnings: 100000, passengers: 500, date: '2025-01-01' },
  { stationId: 2, station: 'Lal Quila', earnings: 80000, passengers: 400, date: '2025-01-02' },
  { stationId: 3, station: 'Jama Masjid', earnings: 60000, passengers: 300, date: '2025-01-03' },
  { stationId: 4, station: 'Delhi Gate', earnings: 70000, passengers: 350, date: '2025-01-04' },
  { stationId: 5, station: 'ITO', earnings: 90000, passengers: 450, date: '2025-01-05' },
  { stationId: 6, station: 'Mandi House', earnings: 50000, passengers: 250, date: '2025-01-06' },
  { stationId: 7, station: 'Janpath', earnings: 110000, passengers: 550, date: '2025-01-07' },
  { stationId: 8, station: 'Central Secretariat', earnings: 120000, passengers: 600, date: '2025-01-08' },
  { stationId: 9, station: 'Khan Market', earnings: 130000, passengers: 650, date: '2025-01-09' },
  { stationId: 10, station: 'Jawaharlal Nehru Stadium', earnings: 140000, passengers: 700, date: '2025-01-10' },
  { stationId: 11, station: 'Jangpura', earnings: 150000, passengers: 750, date: '2025-01-11' },
  { stationId: 12, station: 'Lajpat Nagar', earnings: 160000, passengers: 800, date: '2025-01-12' },
  { stationId: 13, station: 'Moolchand', earnings: 170000, passengers: 850, date: '2025-01-13' },
  { stationId: 14, station: 'Kailash Colony', earnings: 180000, passengers: 900, date: '2025-01-14' },
  { stationId: 15, station: 'Nehru Place', earnings: 190000, passengers: 950, date: '2025-01-15' },
  { stationId: 16, station: 'Kalkaji Mandir', earnings: 200000, passengers: 1000, date: '2025-01-16' },
  { stationId: 17, station: 'Govind Puri', earnings: 210000, passengers: 1050, date: '2025-01-17' },
  { stationId: 18, station: 'Okhla', earnings: 220000, passengers: 1100, date: '2025-01-18' },
  { stationId: 19, station: 'Jasola', earnings: 230000, passengers: 1150, date: '2025-01-19' },
  { stationId: 20, station: 'Sarita Vihar', earnings: 240000, passengers: 1200, date: '2025-01-20' },
  { stationId: 21, station: 'Mohan Estate', earnings: 250000, passengers: 1250, date: '2025-01-21' },
  { stationId: 22, station: 'Tughlakabad', earnings: 260000, passengers: 1300, date: '2025-01-22' },
  { stationId: 23, station: 'Badarpur Border', earnings: 270000, passengers: 1350, date: '2025-01-23' },
  { stationId: 24, station: 'Sarai', earnings: 280000, passengers: 1400, date: '2025-01-24' },
  { stationId: 25, station: 'NHPC Chowk', earnings: 290000, passengers: 1450, date: '2025-01-25' },
  { stationId: 26, station: 'Mewala Maharajpur', earnings: 300000, passengers: 1500, date: '2025-01-26' },
  { stationId: 27, station: 'Sector 28 Faridabad', earnings: 310000, passengers: 1550, date: '2025-01-27' },
  { stationId: 28, station: 'Badkal Mor', earnings: 320000, passengers: 1600, date: '2025-01-28' },
  { stationId: 29, station: 'Old Faridabad', earnings: 330000, passengers: 1650, date: '2025-01-29' },
  { stationId: 30, station: 'Neelam Chowk Ajronda', earnings: 340000, passengers: 1700, date: '2025-01-30' },
  { stationId: 31, station: 'Bata Chowk', earnings: 350000, passengers: 1750, date: '2025-01-31' },
  { stationId: 32, station: 'Escorts Mujesar', earnings: 360000, passengers: 1800, date: '2025-02-01' },
  // Add more data as needed
];

export default function FinancialReport() {
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
    (item.stationId.toString().includes(search) ||
    item.station.toLowerCase().includes(search.toLowerCase())) && 
    (!date || item.date === date)
  );

  const displayedData = filter
    ? filteredData.filter((item) => item.station === filter)
    : filteredData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl p-4">
        <BackButton /> {/* Use BackButton component */}
        <Card className="w-full p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Financial Report</h1>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search by station ID or station name"
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
              <option value="Kashmere Gate">Kashmere Gate</option>
              <option value="Lal Quila">Lal Quila</option>
              <option value="Jama Masjid">Jama Masjid</option>
              <option value="Delhi Gate">Delhi Gate</option>
              <option value="ITO">ITO</option>
              <option value="Mandi House">Mandi House</option>
              <option value="Janpath">Janpath</option>
              <option value="Central Secretariat">Central Secretariat</option>
              <option value="Khan Market">Khan Market</option>
              <option value="Jawaharlal Nehru Stadium">Jawaharlal Nehru Stadium</option>
              <option value="Jangpura">Jangpura</option>
              <option value="Lajpat Nagar">Lajpat Nagar</option>
              <option value="Moolchand">Moolchand</option>
              <option value="Kailash Colony">Kailash Colony</option>
              <option value="Nehru Place">Nehru Place</option>
              <option value="Kalkaji Mandir">Kalkaji Mandir</option>
              <option value="Govind Puri">Govind Puri</option>
              <option value="Okhla">Okhla</option>
              <option value="Jasola">Jasola</option>
              <option value="Sarita Vihar">Sarita Vihar</option>
              <option value="Mohan Estate">Mohan Estate</option>
              <option value="Tughlakabad">Tughlakabad</option>
              <option value="Badarpur Border">Badarpur Border</option>
              <option value="Sarai">Sarai</option>
              <option value="NHPC Chowk">NHPC Chowk</option>
              <option value="Mewala Maharajpur">Mewala Maharajpur</option>
              <option value="Sector 28 Faridabad">Sector 28 Faridabad</option>
              <option value="Badkal Mor">Badkal Mor</option>
              <option value="Old Faridabad">Old Faridabad</option>
              <option value="Neelam Chowk Ajronda">Neelam Chowk Ajronda</option>
              <option value="Bata Chowk">Bata Chowk</option>
              <option value="Escorts Mujesar">Escorts Mujesar</option>
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
                <th className="py-2 px-4 border-b">Station</th>
                <th className="py-2 px-4 border-b">Earnings (JPY)</th>
                <th className="py-2 px-4 border-b">Total Passengers</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">{item.stationId}</td>
                  <td className="py-2 px-4 border-b text-center">{item.station}</td>
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