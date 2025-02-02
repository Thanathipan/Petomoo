import React, { useState, useEffect } from "react";
import "./AddClinic.css";

interface Clinic {
  id: string;
  clinicName: string;
  location: string;
}

const AddClinic: React.FC = () => {
  const [clinicName, setClinicName] = useState("");
  const [location, setLocation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [clinics, setClinics] = useState<Clinic[]>([]);

  const fetchClinics = async () => {
    try {
      const response = await fetch("/api/Clinicpanel");
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      setMessage("Failed to fetch clinics.");
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = { clinicName, location, firstName, lastName, email, phoneNumber, password };

    try {
      const response = await fetch("/api/addclinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage(result.message);
        setClinicName("");
        setLocation("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        await fetchClinics();
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while adding the clinic.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-clinic-container">
      <h1>Add Clinic</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Clinic Name" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Clinic"}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddClinic;
