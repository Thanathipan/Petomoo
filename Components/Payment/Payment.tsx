"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const Payments: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe checkout
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-container">
      <h1>Payment Details</h1>
      <p>Amount to be paid: <strong>Rs. 600</strong></p>

      <button onClick={handlePayment} className="pay-button" disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payments;
