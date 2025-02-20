"use client";

import { useEffect, useState } from "react";
import "./booking.css"; // Import the updated CSS file

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
    <div className="super-admin-dashboard">
      <h1>Super Admin Dashboard - Bookings</h1>
      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
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
