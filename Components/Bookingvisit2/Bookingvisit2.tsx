import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "./Bookingvisit2.css";

type SelectedDate = string | null;

interface Clinic {
  _id: string;
  clinicName: string;
}

const Bookingvisit2: React.FC = () => {
  const router = useRouter();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);
  const [selectedTime, setSelectedTime] = useState<string>("16:00");
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<string>("");

  const fetchClinics = async () => {
    try {
      const response = await fetch("/api/Clinicpanel");
      const data = await response.json();
      setClinics(data);
      setSelectedClinic(data[0]?._id || "");
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleDateSelect = (day: number) => {
    setSelectedDate(`${day} ${months[currentMonth]} ${currentYear}`);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedClinic) {
      alert("Please select a date, time, and clinic.");
      return;
    }

    try {
      const response = await fetch("/api/bookingvisit2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, time: selectedTime, clinicId: selectedClinic }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking successful!");
        router.push("/payment");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to make booking.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Booking Visit Form</h1>
      </div>
      <div className="form-content">
        <div className="left">
          <h2>Schedule Date & Time</h2>
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}>&lt;</button>
              <span>{`${months[currentMonth]} ${currentYear}`}</span>
              <button onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}>&gt;</button>
            </div>
            <div className="calendar-grid">
              {Array(new Date(currentYear, currentMonth, 1).getDay()).fill(null).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
              {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, day) => (
                <div
                  key={day + 1}
                  className={`clickable-day ${selectedDate === `${day + 1} ${months[currentMonth]} ${currentYear}` ? "active" : ""}`}
                  onClick={() => handleDateSelect(day + 1)}
                >
                  {day + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="clinic">Clinic</label>
            <select id="clinic" value={selectedClinic} onChange={(e) => setSelectedClinic(e.target.value)}>
              {clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>
                  {clinic.clinicName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="continue-button" onClick={handleBooking}>Continue</button>
    </div>
  );
};

export default Bookingvisit2;
