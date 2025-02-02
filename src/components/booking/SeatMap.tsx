"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Seat {
  id: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
}

interface SeatMapProps {
  selectedSeats: string[];
  onSeatSelect: (seatNumber: string) => void;
  maxSeats: number;
}

const initialSeats: Seat[] = [
  { id: "1A", number: 1, isAvailable: true, isSelected: false },
  { id: "1B", number: 2, isAvailable: true, isSelected: false },
  // Add more seats as needed
];

export default function SeatMap({ selectedSeats, onSeatSelect, maxSeats }: SeatMapProps) {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);

  const handleSeatClick = (seatId: string) => {
    setSeats(
      seats.map((seat) =>
        seat.id === seatId ? { ...seat, isSelected: !seat.isSelected } : seat
      )
    );
    onSeatSelect(seatId);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {seats.map((seat) => (
          <Button
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            disabled={!seat.isAvailable || (selectedSeats.includes(seat.id) && !seat.isSelected)}
            className={`
              p-4 rounded
              ${seat.isSelected ? "bg-blue-500 text-white" : ""}
              ${!seat.isAvailable ? "bg-gray-200" : ""}
            `}
          >
            {seat.number}
          </Button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}