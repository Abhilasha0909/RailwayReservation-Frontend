"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Importing search and cancel icons
import BackButton from '@/components/BackButton'; // Import BackButton

// Sample passenger data
const passengers = [
  { id: 'P001', firstName: 'John', lastName: 'Doe', age: 30, loginId: 'john.doe' },
  { id: 'P002', firstName: 'Jane', lastName: 'Doe', age: 28, loginId: 'jane.doe' },
  { id: 'P003', firstName: 'Alice', lastName: 'Smith', age: 35, loginId: 'alice.smith' },
  { id: 'P004', firstName: 'Alice', lastName: 'Smither', age: 67, loginId: 'alice.smither' },
  { id: 'P005', firstName: 'John', lastName: 'Doeby', age: 70, loginId: 'john.doeby' },
  // Add more passengers as needed
];

// Sample passenger bookings data
const bookings = [
  { passengerId: 'P001', trainId: 'T001', station: 'Tokyo Station', ticketsBooked: 2, spending: 20000 },
  { passengerId: 'P001', trainId: 'T002', station: 'Osaka Station', ticketsBooked: 1, spending: 10000 },
  { passengerId: 'P002', trainId: 'T003', station: 'Kyoto Station', ticketsBooked: 3, spending: 30000 },
  { passengerId: 'P003', trainId: 'T004', station: 'Hiroshima Station', ticketsBooked: 1, spending: 18000 },
  // Add more bookings as needed
];

export default function PassengerDetails() {
  const [search, setSearch] = useState('');
  const [filteredPassenger, setFilteredPassenger] = useState<{ id: string; firstName: string; lastName: string; age: number; loginId: string; } | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<{ passengerId: string; trainId: string; station: string; ticketsBooked: number; spending: number; }[]>([]);
  const [suggestions, setSuggestions] = useState<{ id: string; firstName: string; lastName: string; age: number; loginId: string; }[]>([]);

  const handleSearch = () => {
    const passenger = passengers.find((p) => p.lastName.toLowerCase() === search.toLowerCase());
    if (passenger) {
      setFilteredPassenger(passenger);
      setFilteredBookings(bookings.filter((b) => b.passengerId === passenger.id));
      setSuggestions([]);
    } else {
      setFilteredPassenger(null);
      setFilteredBookings([]);
    }
  };

  const handleCancel = () => {
    setSearch('');
    setFilteredPassenger(null);
    setFilteredBookings([]);
    setSuggestions([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    if (value.length >= 3) {
      setSuggestions(passengers.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (passenger: { id: string; firstName: string; lastName: string; age: number; loginId: string; }) => {
    setSearch(`${passenger.firstName} ${passenger.lastName}`);
    setFilteredPassenger(passenger);
    setFilteredBookings(bookings.filter((b) => b.passengerId === passenger.id));
    setSuggestions([]);
  };

  const totalSpending = filteredBookings.reduce((acc, booking) => acc + booking.spending, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl p-4">
      <BackButton /> {/* Use BackButton component */}
      <Card className="w-full max-w-5xl p-8 min-h-[600px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Passenger Details</h1>
        <div className="flex justify-center mb-4 relative">
          <input
            type="text"
            placeholder="Search by last name"
            value={search}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded ml-2"
          >
            <FaSearch />
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center justify-center p-3 bg-red-600 text-white rounded ml-2"
          >
            <FaTimes />
          </button>
          {suggestions.length > 0 && (
            <div className="absolute top-10 left-0 bg-white border border-gray-300 rounded w-full max-w-md z-10">
              {suggestions.map((passenger) => (
                <div
                  key={passenger.id}
                  onClick={() => handleSuggestionClick(passenger)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {`${passenger.firstName} ${passenger.lastName}`}
                </div>
              ))}
            </div>
          )}
        </div>
        {!filteredPassenger && (
          <table className="min-w-full bg-white mb-6">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-center">Name</th>
                <th className="py-2 px-4 border-b text-center">Age</th>
                <th className="py-2 px-4 border-b text-center">Login ID</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger) => (
                <tr
                  key={passenger.id}
                  onClick={() => handleSuggestionClick(passenger)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td className="py-2 px-4 border-b text-center">{`${passenger.firstName} ${passenger.lastName}`}</td>
                  <td className="py-2 px-4 border-b text-center">{passenger.age}</td>
                  <td className="py-2 px-4 border-b text-center">{passenger.loginId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredPassenger && (
          <>
            <table className="min-w-full bg-white mb-6">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Name</th>
                  <th className="py-2 px-4 border-b text-center">Age</th>
                  <th className="py-2 px-4 border-b text-center">Login ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b text-center">{`${filteredPassenger.firstName} ${filteredPassenger.lastName}`}</td>
                  <td className="py-2 px-4 border-b text-center">{filteredPassenger.age}</td>
                  <td className="py-2 px-4 border-b text-center">{filteredPassenger.loginId}</td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-xl font-bold mb-4">My Bookings</h2>
            <table className="min-w-full bg-white mb-6">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-center">Train ID</th>
                  <th className="py-2 px-4 border-b text-center">Station</th>
                  <th className="py-2 px-4 border-b text-center">Tickets Booked</th>
                  <th className="py-2 px-4 border-b text-center">Money Spent (JPY)</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b text-center">{booking.trainId}</td>
                    <td className="py-2 px-4 border-b text-center">{booking.station}</td>
                    <td className="py-2 px-4 border-b text-center">{booking.ticketsBooked}</td>
                    <td className="py-2 px-4 border-b text-center">{booking.spending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <span className="font-bold">Total Spending: {totalSpending} JPY</span>
            </div>
          </>
        )}
      </Card>
      </div>
    </div>
  );
}