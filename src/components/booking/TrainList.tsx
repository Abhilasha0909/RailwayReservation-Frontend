"use client";

import { useRouter } from "next/navigation";
import { Train } from "@/types";

interface TrainListProps {
  trains: Train[];
  passengers: number;
  source: string;
  destination: string;
  date: string;
}

export default function TrainList({
  trains,
  passengers,
  source,
  destination,
  date,
}: TrainListProps) {
  const router = useRouter();

  const handleBooking = (train: Train) => {
    const trainDetails = encodeURIComponent(JSON.stringify(train));
    router.push(
      `/booking/${train.trainNumber}?trainDetails=${trainDetails}&source=${source}&destination=${destination}&date=${date}`
    );
  };

  return (
    <div className="space-y-6">
      {trains.map((train) => (
        <div
          key={train.trainNumber}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
        >
          {/* Flexbox Container with Two Rows */}
          <div className="flex flex-col md:flex-row md:space-x-28">
            {/* Train Info Section (Left Side) */}
            <div className="flex-1 space-y-4 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-blue-600">
                {train.trainName}
              </h3>
              <p className="text-gray-600">Train No: {train.trainNumber}</p>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/chair.png"
                  alt="Seat image"
                  className="w-4 h-4"
                />
                <p className="text-xs text-green-600">
                  {train.availableSeats} seats available
                </p>
              </div>

              {/* Time Info */}
              <div className="flex flex-col justify-between border-t border-gray-200 py-4 md:flex-row md:space-x-4 space-y-2 md:space-y-0">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xl font-bold text-gray-800">
                    {train.departureTimeFromSource}
                  </p>
                  <p className="text-sm font-semibold text-gray-500">
                    Departure
                  </p>
                  <p className="text-sm text-purple-600">({source})</p>
                </div>

                <div className="flex-1 flex justify-center items-center">
                  <div className="border-t-2 border-gray-300 flex-grow"></div>
                  <span className="text-sm text-gray-500">
                    {train.totalDistance} km
                  </span>
                  <div className="border-t-2 border-gray-300 flex-grow"></div>
                </div>

                <div className="flex-1 text-center md:text-right">
                  <p className="text-xl font-bold text-gray-800">
                    {train.arrivalTimeAtDestination}
                  </p>
                  <p className="text-sm font-semibold text-gray-500">Arrival</p>
                  <p className="text-sm text-purple-600">({destination})</p>
                </div>
              </div>
            </div>

            {/* Price & Seats Section (Right Side) */}
            <div className="flex-2 flex flex-col justify-around space-y-4 md:space-y-6 md:items-end">
              <div className="text-center md:text-right space-y-2">
                <p className="text-sm text-gray-600">Price per passenger</p>
                <p className="text-md font-semibold text-green-600">
                  ₹{train.farePrice.toLocaleString()}
                </p>
              </div>

              <div className="text-right space-y-2">
                <p className="text-sm text-gray-600">
                  Total for {passengers}{" "}
                  {passengers === 1 ? "passenger" : "passengers"}
                </p>
                <p className="text-lg font-bold text-gray-800">
                  ₹{(train.farePrice * passengers).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleBooking(train)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}