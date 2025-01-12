import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Bookingvisit1.css";

// Define the type for the form data
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

// Props type for the component
interface Bookingvisit1Props {
  onContinue: (formData: FormData) => void;
}

const Bookingvisit1: React.FC<Bookingvisit1Props> = ({ onContinue }) => {
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

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.petName || !formData.problem) {
      alert("Please fill in all required fields.");
      return;
    }

    // Pass data to the parent component or next step
    onContinue(formData);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Booking Visit Form</h1>
        <button className="close-button" aria-label="Close">&times;</button>
      </div>
      <div className="progress-bar">
        <div className="step active">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Personal Information</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Budi"
            value={formData.firstName}
            onChange={handleChange}
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
          />
        </div>
        <button type="submit" className="continue-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Bookingvisit1;
