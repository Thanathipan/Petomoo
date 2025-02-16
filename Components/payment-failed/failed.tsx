"use client";

import { useRouter } from "next/navigation";

export default function PaymentFailed() {
  const router = useRouter();

  return (
    <div className="payments-container">
      <h1>Payment Failed ❌</h1>
      <p>Please try again.</p>
      <button onClick={() => router.push("/payments")}>Retry Payment</button>
    </div>
  );
}
