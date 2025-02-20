"use client";

import React, { useEffect, useState } from "react";
import styles from "./PaymentsList.module.css"; // Import CSS module

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
}

const PaymentsList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/payments");
        const data = await response.json();
        setPayments(data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Recent Payments</h2>
        {loading ? (
          <p className={styles.loading}>Loading payments...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>₹{payment.amount / 100}</td>
                    <td>{payment.currency.toUpperCase()}</td>
                    <td>{payment.status}</td>
                    <td>{new Date(payment.created * 1000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsList;
