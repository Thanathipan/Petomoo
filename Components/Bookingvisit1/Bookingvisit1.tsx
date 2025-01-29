import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router"; // Use 'next/navigation' for App Router
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

const Bookingvisit1: React.FC = () => {
  const router = useRouter();

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

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookingvisit1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response has JSON content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          router.push("/bookingvisit2"); // Navigate to the next step
        } else {
          alert(data.error || "Failed to submit the form.");
        }
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An unexpected error occurred. Please try again.");
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
        <button
          type="submit"
          className="continue-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default Bookingvisit1;
