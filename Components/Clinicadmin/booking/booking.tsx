import axios from "axios";
import React, { useEffect, useState } from "react";
import "./booking.css";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userResponse = await axios.get('/api/cookie');
        if (userResponse.status === 200 && userResponse.data?.user?.id) {
          const { id } = userResponse.data.user;
          const bookingsResponse = await axios.post('/api/booking/getbyclinicid', { userId: id });
          setBookings(bookingsResponse.data.bookings);
        }
      } catch (error) {
        setError("Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, status: "accepted" | "declined") => {
    setUpdating(bookingId);
    try {
      const response = await axios.put("/api/booking/status", { bookingId, status });

      if (response.status === 200) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId ? { ...booking, status } : booking
          )
        );
      }
    } catch (error) {
      setError("Error updating booking status.");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="admin-page">
      <h1>Clinic Admin Page</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
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
                    <div>
                      <button 
                        className="accept-button"
                        onClick={() => handleStatusChange(booking._id, "accepted")}
                        disabled={updating === booking._id}
                      >
                        {updating === booking._id ? "Updating..." : "Accept"}
                      </button>
                      <button 
                        className="decline-button"
                        onClick={() => handleStatusChange(booking._id, "declined")}
                        disabled={updating === booking._id}
                      >
                        {updating === booking._id ? "Updating..." : "Decline"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClinicAdminPage;
