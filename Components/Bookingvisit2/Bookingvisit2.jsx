import React, { useState } from "react";
import "./Bookingvisit2.css";

const Bookingvisit2 = () => {
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

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day) => {
    setSelectedDate(`${day} ${months[currentMonth]} ${currentYear}`);
    alert(`Selected Date: ${day} ${months[currentMonth]} ${currentYear}`);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Booking Visit Form</h1>
        <button className="close-button">&times;</button>
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
              {Array(daysInMonth)
                .fill(null)
                .map((_, day) => (
                  <div
                    key={day + 1}
                    className={`clickable-day ${
                      selectedDate ===
                      `${day + 1} ${months[currentMonth]} ${currentYear}`
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
            <input type="text" id="time" placeholder="16:00" />
          </div>
          <div className="form-group">
            <label htmlFor="clinic">Clinic</label>
            <select id="clinic">
              <option selected>Pawcare Barktown</option>
              <option>Clinic 2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="consultation">Consultation with</label>
            <select id="consultation">
              <option selected>Jasmine Miller</option>
              <option>Consultant 2</option>
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
      <button className="continue-button">Continue</button>
    </div>
  );
};

export default Bookingvisit2;
