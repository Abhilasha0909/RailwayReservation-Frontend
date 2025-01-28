'use client';

import { useRouter } from 'next/navigation';
import { Train } from '@/types';

interface TrainListProps {
  trains: Train[];
  passengers: number;
}

export default function TrainList({ trains, passengers }: TrainListProps) {
  const router = useRouter();

  const handleBooking = (trainId: string) => {
    router.push(`/booking/${trainId}`);
  };

  return (
    <div className="space-y-4">
      {trains.map((train) => (
        <div
          key={train.id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Train Info */}
            <div>
              <h3 className="text-xl font-semibold text-blue-600">{train.name}</h3>
              <p className="text-gray-600">{train.number}</p>
              <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold text-white bg-blue-600 rounded">
                {train.type.toUpperCase()}
              </span>
            </div>

            {/* Time Info */}
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-2xl font-bold">{train.departureTime}</p>
                <p className="text-sm text-gray-600">Departure</p>
              </div>
              <div className="flex-1 border-t-2 border-gray-300 relative">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                  {train.duration}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">{train.arrivalTime}</p>
                <p className="text-sm text-gray-600">Arrival</p>
              </div>
            </div>

            {/* Price & Seats */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Price per person</p>
              <p className="text-2xl font-bold">¥{train.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-2">
                {train.availableSeats} seats available
              </p>
            </div>

            {/* Booking Button */}
            <div className="flex items-center justify-end">
              <div className="text-right">
                <p className="text-lg font-bold mb-2">
                  ¥{(train.price * passengers).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Total for {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
                </p>
                <button
                  onClick={() => handleBooking(train.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  Select Seats
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}