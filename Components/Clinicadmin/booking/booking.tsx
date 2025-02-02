import React, { useState, useEffect } from "react";

interface Booking {
  _id: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  petName?: string;
  type?: string;
  breed?: string;
  age?: string;
  illnessPeriod?: string;
  problem?: string;
  date?: string;
  time?: string;
  clinicId?: string;
  status: "pending" | "accepted" | "declined";
  source: "bookingvisit1" | "bookingvisit2";
}

const ClinicDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // Ensure it's an array
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookingvisit2");
      const data = await response.json();

      if (Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else {
        setBookings([]); // Fallback in case of invalid data
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]); // Ensure it's an array even in case of an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const updateBookingStatus = async (bookingId: string, status: "accepted" | "declined", source: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookingvisits/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status, source }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        fetchBookings(); // Refresh bookings after update
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Clinic Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Client Name</th>
              <th>Details</th>
              <th>Time</th>
              <th>Status</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.firstName ? `${booking.firstName} ${booking.lastName}` : "N/A"}</td>
                  <td>
                    {booking.source === "bookingvisit1"
                      ? `Pet: ${booking.petName}, Type: ${booking.type}, Problem: ${booking.problem}`
                      : `Date: ${booking.date}, Time: ${booking.time}, Clinic ID: ${booking.clinicId}`}
                  </td>
                  <td>
                    {booking.source === "bookingvisit1"
                      ? new Date(parseInt(booking._id.toString().substring(0, 8), 16) * 1000).toLocaleString()
                      : `${booking.date} at ${booking.time}`}
                  </td>
                  <td>{booking.status}</td>
                  <td>{booking.source === "bookingvisit1" ? "Visit 1" : "Visit 2"}</td>
                  <td>
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "accepted", booking.source)}
                          disabled={loading}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking._id, "declined", booking.source)}
                          disabled={loading}
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClinicDashboard;
