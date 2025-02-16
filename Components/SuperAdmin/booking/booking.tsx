"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  petName: string;
  type: string;
  problem: string;
  selectedDate: string;
  selectedTime: string;
  clinicName: string;
  status: string;
}

export default function SuperAdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking/all");
        const data = await response.json();
        if (data.success) {
          setBookings(data.bookings);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (err) {
        setError("Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Super Admin Dashboard - Bookings</h1>
      {loading && <p>Loading bookings...</p>}
      {error && <p>{error}</p>}
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Pet Name</th>
            <th>Type</th>
            <th>Problem</th>
            <th>Date</th>
            <th>Time</th>
            <th>Clinic</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.firstName} {booking.lastName}</td>
              <td>{booking.mobile}</td>
              <td>{booking.email}</td>
              <td>{booking.petName}</td>
              <td>{booking.type}</td>
              <td>{booking.problem}</td>
              <td>{booking.selectedDate}</td>
              <td>{booking.selectedTime}</td>
              <td>{booking.clinicName}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
