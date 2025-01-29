"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    cashAmount: '',
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your payment processing logic here
    console.log('Payment Details:', paymentDetails);
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
              <Input
                type="text"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Card Holder Name"
                value={paymentDetails.cardHolderName}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolderName: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={paymentDetails.expiryDate}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
              />
              <Input
                type="text"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              />
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
    </>
  );
}