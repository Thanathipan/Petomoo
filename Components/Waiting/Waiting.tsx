import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

        if (data.status === "accepted") {
          router.push("/payment");
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
      {bookingStatus === "pending" && <p>Your booking is pending. Please wait...</p>}
      {bookingStatus === "declined" && <p>Your booking has been declined.</p>}
    </div>
  );
};

export default WaitingPage;