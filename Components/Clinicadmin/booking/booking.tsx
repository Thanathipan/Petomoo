import React, { useEffect, useState } from "react";

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  petName: string;
  problem: string;
  status: string;
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then(setBookings)
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const updateBookingStatus = (bookingId: string, status: "accepted" | "declined") => {
    fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, status }),
    })
      .then((res) => res.json())
      .then(() => setBookings((prev) => prev.filter((b) => b._id !== bookingId)))
      .catch((error) => console.error("Error updating booking:", error));
  };

  return (
    <div>
      <h1>Pending Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>{booking.firstName} {booking.lastName} - {booking.petName} - {booking.problem}</p>
          <button onClick={() => updateBookingStatus(booking._id, "accepted")}>Accept</button>
          <button onClick={() => updateBookingStatus(booking._id, "declined")}>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default AdminBookings;
