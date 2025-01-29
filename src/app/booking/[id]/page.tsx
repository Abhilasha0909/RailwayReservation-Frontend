"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface PassengerDetails {
  name: string;
  age: string;
  gender: string;
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([
    { name: "", age: "", gender: "" },
  ]);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    cashAmount: '',
  });

  const [errors, setErrors] = useState({
    passengers: [{ name: '', age: '', gender: '' }],
    cardNumber: '',
    expiryDate: '',
    cvv: '',
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
    updatedErrors[index] = { ...updatedErrors[index], [field]: '' };
    setErrors({ ...errors, passengers: updatedErrors });
  };

  const validatePassengerDetails = () => {
    const updatedErrors = passengers.map((passenger) => ({
      name: !passenger.name ? 'Name is required' : '',
      age: !passenger.age ? 'Age is required' : '',
      gender: !passenger.gender ? 'Gender is required' : '',
    }));

    setErrors({ ...errors, passengers: updatedErrors });

    return updatedErrors.every(
      (error) => error.name === '' && error.age === '' && error.gender === ''
    );
  };

  const validateCardNumber = (number: string) => {
    const sanitized = number.replace(/[^0-9]/g, '');
    
    let sum = 0;
    let shouldDouble = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const validateExpiryDate = (date: string) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // MM/YY format
    return regex.test(date);
  };

  const validateCVV = (cvv: string) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!validateCardNumber(paymentDetails.cardNumber)) {
      setErrors(prev => ({ ...prev, cardNumber: 'Invalid card number' }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }

    if (!validateExpiryDate(paymentDetails.expiryDate)) {
      setErrors(prev => ({ ...prev, expiryDate: 'Invalid expiry date' }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, expiryDate: '' }));
    }

    if (!validateCVV(paymentDetails.cvv)) {
      setErrors(prev => ({ ...prev, cvv: 'Invalid CVV' }));
      valid = false;
    } else {
      setErrors(prev => ({ ...prev, cvv: '' }));
    }

    if (valid) {
      setStep(3);
    }
  };

  const handleSubmitPassengerDetails = () => {
    if (validatePassengerDetails()) {
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
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment</h2>
                <Card className="mb-8 p-6">
                  <form onSubmit={handlePayment} className="grid grid-cols-1 gap-4">
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700">
                        Payment Method
                      </label>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit_card"
                          name="paymentMethod"
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => setPaymentMethod('credit_card')}
                          className="mr-2"
                        />
                        <label htmlFor="credit_card" className="mr-4">
                          Credit Card
                        </label>
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="mr-2"
                        />
                        <label htmlFor="cash">
                          Cash
                        </label>
                      </div>
                    </div>

                    {paymentMethod === 'credit_card' && (
                      <>
                        <div>
                          <Input
                            type="text"
                            placeholder="Card Number"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                        </div>
                        <Input
                          type="text"
                          placeholder="Card Holder Name"
                          value={paymentDetails.cardHolderName}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolderName: e.target.value })}
                        />
                        <div>
                          <Input
                            type="text"
                            placeholder="Expiry Date (MM/YY)"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <Input
                            type="text"
                            placeholder="CVV"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                        </div>
                      </>
                    )}

                    {paymentMethod === 'cash' && (
                      <Input
                        type="text"
                        placeholder="Cash Amount"
                        value={paymentDetails.cashAmount}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, cashAmount: e.target.value })}
                      />
                    )}

                    <Button type="submit">Pay Now</Button>
                  </form>
                </Card>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Ticket Confirmation</h2>
                <Card className="mb-8 p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Ticket Details</h3>
                  <div className="space-y-4">
                    {passengers.map((passenger, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p><strong>Passenger {index + 1}</strong></p>
                        <p>Name: {passenger.name}</p>
                        <p>Age: {passenger.age}</p>
                        <p>Gender: {passenger.gender}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg"
                  >
                    Back
                  </button>
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