import React, { useState } from "react";
import { useRouter } from "next/router"; // Use 'next/navigation' for App Router
import "./Bookingvisit2.css";

// Define the type for the selected date
type SelectedDate = string | null;

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
    if (!selectedDate) {
      alert("Please select a date before continuing.");
      return;
    }

    router.push("/Payment");
  };

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
            <select id="clinic" defaultValue="Pawcare Barktown">
              <option value="Pawcare Barktown">Pawcare Barktown</option>
              <option value="Clinic 2">Clinic 2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="consultation">Consultation with</label>
            <select id="consultation" defaultValue="Jasmine Miller">
              <option value="Jasmine Miller">Jasmine Miller</option>
              <option value="Consultant 2">Consultant 2</option>
            </select>
          </div>
        </div>
        <div className="right">
          <div className="pet-info">
            <img src="dog.jpg" alt="Pet" className="pet-image" />
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
