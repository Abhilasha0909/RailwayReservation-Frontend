"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import PaymentPage from "@/components/booking/PaymentPage";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
} from "@radix-ui/react-hover-card";

interface PassengerDetails {
  name: string;
  age: string;
  gender: string;
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([
    { name: "", age: "", gender: "" },
  ]);
  const [trainDetails, setTrainDetails] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const trainDetailsParam = searchParams.get("trainDetails");
    const sourceParam = searchParams.get("source");
    const destinationParam = searchParams.get("destination");
    const dateParam = searchParams.get("date");

    if (trainDetailsParam) {
      setTrainDetails(JSON.parse(decodeURIComponent(trainDetailsParam)));
    }
    if (sourceParam) {
      setSource(sourceParam);
    }
    if (destinationParam) {
      setDestination(destinationParam);
    }
    if (dateParam) {
      setDate(dateParam);
    }
  }, [searchParams]);

  const [errors, setErrors] = useState({
    passengers: [{ name: "", age: "", gender: "" }],
  });

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

    const updatedErrors = [...errors.passengers];
    updatedErrors[index] = { ...updatedErrors[index], [field]: "" };
    setErrors({ ...errors, passengers: updatedErrors });
  };

  const validatePassengerDetails = () => {
    const updatedErrors = passengers.map((passenger) => ({
      name: !passenger.name ? "Name is required" : "",
      age: !passenger.age ? "Age is required" : "",
      gender: !passenger.gender ? "Gender is required" : "",
    }));

    setErrors({ passengers: updatedErrors });

    return updatedErrors.every(
      (error) => error.name === "" && error.age === "" && error.gender === ""
    );
  };

  const handleSubmitPassengerDetails = () => {
    if (validatePassengerDetails()) {
      // save passenger details now. Post it to backend after payment.
      setStep(2);
    }
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
                <span className="ml-2">Passenger Details</span>
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
                <span className="ml-2">Payment</span>
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
                <span className="ml-2">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {step === 1 && (
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
                          {errors.passengers[index]?.name && (
                            <p className="text-red-500 text-sm">
                              {errors.passengers[index].name}
                            </p>
                          )}
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
                          {errors.passengers[index]?.age && (
                            <p className="text-red-500 text-sm">
                              {errors.passengers[index].age}
                            </p>
                          )}
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
                          {errors.passengers[index]?.gender && (
                            <p className="text-red-500 text-sm">
                              {errors.passengers[index].gender}
                            </p>
                          )}
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
                    onClick={handleSubmitPassengerDetails}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <PaymentPage
                setStep={setStep}
                trainDetails={trainDetails}
                passengerDetails={passengers}
                source={source}
                destination={destination}
                date={date}
              />
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Ticket Confirmation</h2>
                <Card className="mb-8 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Your Ticket Details
                  </h3>
                  <div className="space-y-4">
                    {passengers.map((passenger, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p>
                          <strong>Passenger {index + 1}</strong>
                        </p>
                        <p>Name: {passenger.name}</p>
                        <p>Age: {passenger.age}</p>
                        <p>Gender: {passenger.gender}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => router.push("/booking/confirmation")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}