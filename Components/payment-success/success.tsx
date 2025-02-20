"use client";
import './success.css';

import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="payments-container">
      <h1>Payment Successful! ✅</h1>
      <p>Your booking has been confirmed.</p>
      <button onClick={() => router.push("/landingpage")}>Go to Dashboard</button>
    </div>
  );
}
