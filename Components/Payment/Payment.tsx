'use client'

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import ConvertToSubcurrency from "../../Lib/ConvertToSubcurrency";
import "./Payment.css"; // Import external CSS

const Checkout = ({ finalAmount, bookingId, userId }: { finalAmount: number, bookingId: string, userId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = Number((finalAmount / 296.73).toFixed(2));

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/payment/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: ConvertToSubcurrency(amount) })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://petomoo.vercel.app/success?amount=${finalAmount}&bookingId=${bookingId}&userId=${userId}`
      }
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <span className="loading-container">
        <svg className="loading-spinner" viewBox="0 0 24 24">
          <circle className="loading-circle" cx="12" cy="12" r="10" />
          <path className="loading-path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading...
      </span>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="payments-container">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? "Processing..." : `Pay LKR ${finalAmount}`}
      </button>
    </form>
  );
};

export default Checkout;
