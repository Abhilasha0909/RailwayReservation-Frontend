'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Train } from '@/types';
import TrainList from '@/components/booking/TrainList';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTrains([
        {
          id: '1',
          number: 'N700-1',
          name: 'Nozomi Shinkansen',
          type: 'express',
          availableSeats: 120,
          departureTime: '08:00',
          arrivalTime: '10:30',
          duration: '2h 30m',
          price: 13320,
        },
        {
          id: '2',
          number: 'N700-2',
          name: 'Hikari Shinkansen',
          type: 'express',
          availableSeats: 85,
          departureTime: '09:00',
          arrivalTime: '11:45',
          duration: '2h 45m',
          price: 12100,
        },
        // Add more sample trains
      ]);
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Search Results</h1>
        
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-semibold">{searchParams.get('from')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">To</p>
              <p className="font-semibold">{searchParams.get('to')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{searchParams.get('date')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="font-semibold">{searchParams.get('passengers')}</p>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Sort by Departure Time</option>
              <option>Sort by Price</option>
              <option>Sort by Duration</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>All Types</option>
              <option>Express</option>
              <option>Local</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>All Classes</option>
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <TrainList trains={trains} passengers={parseInt(searchParams.get('passengers') || '1')} />
        )}
      </div>
    </div>
  );
}