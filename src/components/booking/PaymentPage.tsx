"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/src/styles.scss";
import cardValidator from "card-validator";

export default function PaymentPage({
  setStep,
  trainDetails,
  passengerDetails,
}: {
  setStep: (step: number) => void;
  trainDetails: any;
  passengerDetails: any[];
}) {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
    cashAmount: "",
    focus: "",
  });
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));

    // Validate input as user types
    if (paymentMethod === "credit_card") {
      switch (name) {
        case "cardNumber":
          validateCardNumber(value);
          break;
        case "expiryDate":
          validateExpiryDate(value);
          break;
        case "cvv":
          validateCVV(value);
          break;
        default:
          break;
      }
    }
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setPaymentDetails((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateCardNumber = (value: string) => {
    const validation = cardValidator.number(value);
    setErrors((prev) => ({
      ...prev,
      cardNumber: validation.isValid ? "" : "Invalid card number",
    }));
  };

  const validateExpiryDate = (value: string) => {
    const validation = cardValidator.expirationDate(value);
    setErrors((prev) => ({
      ...prev,
      expiryDate: validation.isValid ? "" : "Invalid expiry date",
    }));
  };

  const validateCVV = (value: string) => {
    const validation = cardValidator.cvv(value);
    setErrors((prev) => ({
      ...prev,
      cvv: validation.isValid ? "" : "Invalid CVV",
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "credit_card") {
      // Final validation before submitting
      validateCardNumber(paymentDetails.cardNumber);
      validateExpiryDate(paymentDetails.expiryDate);
      validateCVV(paymentDetails.cvv);

      if (!errors.cardNumber && !errors.expiryDate && !errors.cvv) {
        // do payment
        console.log("Train Details:", trainDetails);
        console.log("Passenger Details:", passengerDetails);
        console.log("Payment Details:", paymentDetails);

        setStep(3);
      } else {
        alert("Validation errors");
      }
    } else {
      console.log("Train Details:", trainDetails);
      console.log("Passenger Details:", passengerDetails);
      console.log("Payment Details:", paymentDetails);

      setStep(3);
    }
  };

  return (
    <>
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
                checked={paymentMethod === "credit_card"}
                onChange={() => setPaymentMethod("credit_card")}
                className="mr-2"
              />
                            <label htmlFor="credit_card" className="mr-4 cursor-pointer">
                Credit Card
              </label>
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="mr-2"
              />
              <label htmlFor="cash" className="cursor-pointer">
                Cash
              </label>
            </div>
          </div>

          {paymentMethod === "credit_card" && (
            <>
              <div className="mb-4">
                <Cards
                  number={paymentDetails.cardNumber}
                  name={paymentDetails.cardHolderName}
                  expiry={paymentDetails.expiryDate}
                  cvc={paymentDetails.cvv}
                  focused={paymentDetails.focus}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className=" placeholder-gray-400 focus:ring-blue-500 focus:border-gray-500"
                />
                {errors.cardNumber && (
                  <div className="text-red-500 text-sm">
                    {errors.cardNumber}
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="cardHolderName"
                  placeholder="Card Holder Name"
                  value={paymentDetails.cardHolderName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className=" placeholder-gray-400 focus:ring-blue-500 focus:border-gray-500"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className=" placeholder-gray-400 focus:ring-blue-500 focus:border-gray-500"
                />
                {errors.expiryDate && (
                  <div className="text-red-500 text-sm">
                    {errors.expiryDate}
                  </div>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className=" placeholder-gray-400 focus:ring-blue-500 focus:border-gray-500"
                />
                {errors.cvv && (
                  <div className="text-red-500 text-sm">{errors.cvv}</div>
                )}
              </div>
            </>
          )}

          {paymentMethod === "cash" && (
            <Input
              type="text"
              placeholder="Cash Amount"
              value={paymentDetails.cashAmount}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cashAmount: e.target.value,
                })
              }
              className=" placeholder-gray-400 focus:ring-blue-500 focus:border-gray-500"
            />
          )}

          <div className="mt-6 flex justify-between">
            <Button
              onClick={() => setStep(1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </Button>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Pay Now
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}