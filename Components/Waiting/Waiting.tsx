import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "./Waiting.css";
import axios from "axios";

const WaitingPage: React.FC = () => {
  const router = useRouter();
  const [bookingStatus, setBookingStatus] = useState<"pending" | "accepted" | "declined">("pending");

  useEffect(() => {
    const checkBookingStatus = async () => {
      const bookingId = router.query.bookingId;
      if (!bookingId) return;

      try {
        const response = await fetch(`/api/booking/status?bookingId=${bookingId}`);
        const data = await response.json();

        const cookieResponse = await axios.get('/api/cookie') 

        if (data.status === "accepted") {
          router.push(`/payment?b=${bookingId}&u=${cookieResponse.data.user.id}`);
        } else if (data.status === "declined") {
          setBookingStatus("declined");
        }
      } catch (error) {
        console.error("Error checking booking status:", error);
      }
    };

    const interval = setInterval(checkBookingStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="waiting-page">
      {bookingStatus === "pending" && (
        <p className="waiting-text">
          Your booking is pending. Please wait
          <span className="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      )}
      {bookingStatus === "declined" && <p className="waiting-text">Your booking has been declined.</p>}
    </div>
  );
};

export default WaitingPage;
