import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./PaymentsList.module.css"; // Import external CSS module

interface PaymentData {
  _id: string;
  amount: number;
  bookingId: string;
  paymentId: string;
  userId: string;
  status: string;
  createdAt: Date;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
  };
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/api/payment");
        setPayments(response.data.payments);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Payment Records</h2>

      {loading ? (
        <p className={styles.loading}>Loading payments...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>User</th>
                <th>Paid At</th>
                <th>Price (LKR)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.paymentId}>
                    <td>{payment.paymentId}</td>
                    <td>
                      <p>{payment.user.firstName} {payment.user.lastName}</p>
                      <p className={styles.email}>{payment.user.email}</p>
                    </td>
                    <td>{new Date(payment.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}</td>
                    <td>₹{payment.amount}</td>
                    <td className={payment.status === "Completed" ? styles.completed : styles.pending}>
                      {payment.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noData}>No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
