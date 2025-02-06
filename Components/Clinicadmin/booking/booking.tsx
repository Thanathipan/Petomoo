import React, { useEffect, useState } from "react";

interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  petName: string;
  selectedDate: string;
  selectedTime: string;
  status: "pending" | "accepted" | "declined";
}

const ClinicAdminPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking/admin");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, status: "accepted" | "declined") => {
    try {
      const response = await fetch(`/api/booking/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, status }),
      });

      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId ? { ...booking, status } : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Clinic Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pet Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{`${booking.firstName} ${booking.lastName}`}</td>
              <td>{booking.petName}</td>
              <td>{booking.selectedDate}</td>
              <td>{booking.selectedTime}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === "pending" && (
                  <>
                    <button onClick={() => handleStatusChange(booking._id, "accepted")}>Accept</button>
                    <button onClick={() => handleStatusChange(booking._id, "declined")}>Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicAdminPage;