import React, { useState } from "react";
import "./AddClinic.css";

interface Clinic {
  id: string;
  clinicName: string;
  location: string;
}

const AddClinic: React.FC = () => {
  const [clinicName, setClinicName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [clinics, setClinics] = useState<Clinic[]>([]);

  // Fetch clinics from the backend
  const fetchClinics = async () => {
    try {
      const response = await fetch("/api/Clinicpanel");
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      setMessage("Failed to fetch clinics.");
    }
  };

  // Submit form and add clinic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = { clinicName, location };

    try {
      const response = await fetch("/api/addclinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Clinic added successfully!");
        setClinicName("");
        setLocation("");
        await fetchClinics(); // Refresh the clinic list after adding
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
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
        <div className="form-group">
          <label htmlFor="clinicName">Clinic Name</label>
          <input
            type="text"
            id="clinicName"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Clinic"}
        </button>
      </form>

      {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}

      <h2>Clinic List</h2>
      <div className="clinic-list">
        {clinics.length === 0 ? (
          <p>No clinics available</p>
        ) : (
          clinics.map((clinic) => (
            <div key={clinic.id} className="clinic-card">
              <h3>{clinic.clinicName}</h3>
              <p>{clinic.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddClinic;
