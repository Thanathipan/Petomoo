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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<string>("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const dateString = `${day} ${months[currentMonth]} ${currentYear}`;
    setSelectedDate(dateString);
    alert(`Selected Date: ${dateString}`);
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedClinic) {
      alert("Please select a date and a clinic before continuing.");
      return;
    }

    router.push("/payment");
  };

  // Fetch clinics from the backend
  const fetchClinics = async () => {
    try {
      const response = await fetch("/api/Clinicpanel");
      const data = await response.json();
      setClinics(data);
      setSelectedClinic(data[0]?._id || ""); // Set default clinic
    } catch (error) {
      console.error("Failed to fetch clinics:", error);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Booking Visit Form</h1>
        <button className="close-button" aria-label="Close">
          &times;
        </button>
      </div>
      <div className="progress-bar">
        <div className="step">1</div>
        <div className="step active">2</div>
        <div className="step">3</div>
      </div>
      <div className="form-content">
        <div className="left">
          <h2>Schedule Date & Time</h2>
          <div className="calendar">
            <div className="calendar-header">
              <button className="prev" onClick={handlePrevMonth}>
                &lt;
              </button>
              <span>{`${months[currentMonth]} ${currentYear}`}</span>
              <button className="next" onClick={handleNextMonth}>
                &gt;
              </button>
            </div>
            <div className="calendar-grid">
              {Array(firstDay)
                .fill(null)
                .map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}
              {Array.from({ length: daysInMonth }, (_, day) => (
                <div
                  key={day + 1}
                  className={`clickable-day ${
                    selectedDate === `${day + 1} ${months[currentMonth]} ${currentYear}`
                      ? "active"
                      : ""
                  }`}
                  onClick={() => handleDateSelect(day + 1)}
                >
                  {day + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input type="time" id="time" defaultValue="16:00" />
          </div>
          <div className="form-group">
            <label htmlFor="clinic">Clinic</label>
            <select
              id="clinic"
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
            >
              {clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>
                  {clinic.clinicName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="right">
          <div className="pet-info">
            {/* <img src="dog.jpg" alt="Pet" className="pet-image" /> */}
            <h3>Lucy</h3>
            <p className="pet-breed">Golden Retriever</p>
          </div>
        </div>
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default Bookingvisit2;
