import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import "./Bookingvisit.css";

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string;
  petName: string;
  type: string;
  breed: string;
  age: string;
  illnessPeriod: string;
  problem: string;
}

interface Clinic {
  _id: string;
  clinicName: string;
}

const Bookingvisit1: React.FC = () => {
  const router = useRouter();
  const [isFirstVisitOpen, setIsFirstVisitOpen] = useState(true);
  const [isSecondVisitOpen, setIsSecondVisitOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: "",
    petName: "",
    type: "Dog",
    breed: "",
    age: "",
    illnessPeriod: "3 days",
    problem: "",
  });

  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("16:00");
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch("/api/Clinicpanel");
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid clinic data received");
        }

        setClinics(data);
        if (data.length > 0) {
          setSelectedClinic(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch clinics:", error);
        setError("Failed to fetch clinics. Please try again later.");
      }
    };

    fetchClinics();
  }, []);

  
  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day).toISOString().split("T")[0];
    setSelectedDate(date);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNextVisit = () => {
    setIsFirstVisitOpen(false);
    setIsSecondVisitOpen(true);
  };

  const handlePreviousVisit = () => {
    setIsFirstVisitOpen(true);
    setIsSecondVisitOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/bookingvisit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedDate,
          selectedTime,
          selectedClinic,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          router.push("/payment");
        } else {
          setError(data.error || "Failed to submit the form.");
        }
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="step active">1</div>
        <div className="step ">2</div>
        <div className="step">3</div>
      </div>
      <form onSubmit={handleSubmit}>
        {isFirstVisitOpen && (
          <div>
            <h2>Personal Information</h2>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Budi"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Similikiwaw"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="077-1234567"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="similikiwaw@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Nanas Rd Bikini Bottom"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <h2>Pet Information</h2>
              <div className="form-group">
                <label htmlFor="petName">Pet Name</label>
                <input
                  type="text"
                  id="petName"
                  placeholder="Lucy"
                  value={formData.petName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select id="type" value={formData.type} onChange={handleChange}>
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                  type="text"
                  id="breed"
                  placeholder="Golden Retriever"
                  value={formData.breed}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  id="age"
                  placeholder="5 years old"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="illnessPeriod">Period of Illness</label>
                <select
                  id="illnessPeriod"
                  value={formData.illnessPeriod}
                  onChange={handleChange}
                >
                  <option>1 day</option>
                  <option>2 days</option>
                  <option>3 days</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="problem">Problem</label>
                <input
                  type="text"
                  id="problem"
                  placeholder="Swollen in leg for 3 days"
                  value={formData.problem}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="nextbutton" type="button" onClick={handleNextVisit}>Next</button>
            </div>
          </div>
        )}
            {isSecondVisitOpen && (
              
              <div className="form-content">
                <h2>Schedule Date & Time</h2>
                <div className="calendar">
                  <div className="calendar-header">
                    <button type="button" onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}>&lt;</button>
                    <span>{`${months[currentMonth]} ${currentYear}`}</span>
                    <button type="button" onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}>&gt;</button>
                  </div>
                  <div className="calendar-grid">
                    {Array(new Date(currentYear, currentMonth, 1).getDay())
                      .fill(null)
                      .map((_, index) => (
                        <div key={`empty-${index}`} />
                      ))}
                    {Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, day) => (
                      <div
                        key={day + 1}
                        className={`clickable-day ${selectedDate === new Date(currentYear, currentMonth, day + 1).toISOString().split("T")[0] ? "active" : ""}`}
                        onClick={() => handleDateSelect(day + 1)}
                      >
                        {day + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
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
                <button className="nextbutton1" type="button" onClick={handlePreviousVisit}>Previous</button>
                <button className="nextbutton1" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </form>
    </div>
  );
};

export default Bookingvisit1;