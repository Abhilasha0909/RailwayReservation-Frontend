"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SeatMap from "@/components/booking/SeatMap";

interface PassengerDetails {
  name: string;
  age: string;
  gender: string;
  seatNumber: string;
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([
    { name: "", age: "", gender: "", seatNumber: "" },
  ]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handlePassengerDetailsChange = (
    index: number,
    field: keyof PassengerDetails,
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);
  };

  const handleSeatSelection = (seatNumber: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }
      if (prev.length < passengers.length) {
        return [...prev, seatNumber];
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    router.push("/booking/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="ml-2">Select Seats</span>
              </div>
              <div
                className={`flex-1 border-t-2 mx-4 ${
                  step >= 2 ? "border-blue-600" : "border-gray-300"
                }`}
              />
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="ml-2">Passenger Details</span>
              </div>
              <div
                className={`flex-1 border-t-2 mx-4 ${
                  step >= 3 ? "border-blue-600" : "border-gray-300"
                }`}
              />
              <div
                className={`flex items-center ${
                  step >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="ml-2">Payment</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>
                <SeatMap
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelection}
                  maxSeats={passengers.length}
                />
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={selectedSeats.length !== passengers.length}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
                <form className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">
                        Passenger {index + 1}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={passenger.name}
                            onChange={(e) =>
                              handlePassengerDetailsChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            value={passenger.age}
                            onChange={(e) =>
                              handlePassengerDetailsChange(
                                index,
                                "age",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <select
                            value={passenger.gender}
                            onChange={(e) =>
                              handlePassengerDetailsChange(
                                index,
                                "gender",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seat Number
                          </label>
                          <input
                            type="text"
                            value={selectedSeats[index]}
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </form>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment</h2>
                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Details Here */}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
