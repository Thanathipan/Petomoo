// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./PaymentsList.module.css"; // Import CSS module

// interface Payment {
//   id: string;
//   amount: number;
//   currency: string;
//   status: string;
//   created: number;
// }

// const PaymentsList: React.FC = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await fetch("/api/payments");
//         const data = await response.json();
//         setPayments(data.data);
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <h2 className={styles.heading}>Recent Payments</h2>
//         {loading ? (
//           <p className={styles.loading}>Loading payments...</p>
//         ) : (
//           <div className={styles.tableWrapper}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Amount</th>
//                   <th>Currency</th>
//                   <th>Status</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments.map((payment) => (
//                   <tr key={payment.id}>
//                     <td>₹{payment.amount / 100}</td>
//                     <td>{payment.currency.toUpperCase()}</td>
//                     <td>{payment.status}</td>
//                     <td>{new Date(payment.created * 1000).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentsList;


import axios from "axios";
import { useEffect, useState } from "react";

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/api/payment");
        const data = await response.data.payments;
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  console.log(payments)
  return (
    <div>
      <h2>Admin Payment Records</h2>

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <h1>Admin - Payment Records</h1>
            <tr>
              <th style={{ padding: "8px" }}>Payment ID</th>
              <th style={{ padding: "8px" }}>User ID</th>
              <th style={{ padding: "8px" }}>User Name</th>
              <th style={{ padding: "8px" }}>User Email</th>
              <th style={{ padding: "8px" }}>Price ($)</th>
              <th style={{ padding: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td style={{ padding: "8px" }}>{payment.paymentId}</td>
                  <td style={{ padding: "8px" }}>{payment.userId}</td>
                  <td style={{ padding: "8px" }}>{payment.userName}</td>
                  <td style={{ padding: "8px" }}>{payment.userEmail}</td>
                  <td style={{ padding: "8px" }}>{payment.price}</td>
                  <td style={{ padding: "8px" }}>{payment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "8px" }}>
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPayments;
