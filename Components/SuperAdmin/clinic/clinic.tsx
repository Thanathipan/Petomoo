import React, { useState, useEffect } from "react";
import "./clinic.css";

interface Clinic {
  clinicId: string;
  clinicName: string;
  location: string;
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    _id: string;
  } | null;
}

const AddClinic: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [clinicName, setClinicName] = useState("");
  const [location, setLocation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await fetch("/api/getclinics");
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      setMessage("Failed to fetch clinics.");
    }
  };

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

      if (response.ok) {
        setMessage("Clinic and Clinic Admin added successfully!");
        resetForm();
        fetchClinics();
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

  const handleEdit = (clinic: Clinic) => {
    setClinicId(clinic.clinicId);
    setAdminId(clinic.admin?._id || null);
    setClinicName(clinic.clinicName);
    setLocation(clinic.location);
    setFirstName(clinic.admin?.firstName || "");
    setLastName(clinic.admin?.lastName || "");
    setEmail(clinic.admin?.email || "");
    setPhoneNumber(clinic.admin?.phoneNumber || "");

    // Add logs to debug
    console.log("Editing clinic:", clinic);
    console.log("clinicId:", clinic.clinicId, "adminId:", clinic.admin?._id);
  };
  const handleUpdate = async () => {
    if (!clinicId || !adminId) {
      setMessage("Select a clinic to edit.");
      console.log("clinicId or adminId is null", { clinicId, adminId });
      return;
    }
  
    setLoading(true);
    setMessage("");
  
    // Define the data structure explicitly
    const data: {
      clinicId: string;
      clinicName: string;
      location: string;
      adminId: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password?: string; // Optional field
    } = { clinicId, clinicName, location, adminId, firstName, lastName, email, phoneNumber };
  
    // Add password only if it's provided
    if (password.trim()) {
      data.password = password;
    }
  
    try {
      const response = await fetch("/api/editclinic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update clinic");
      }
  
      setMessage("Clinic and Admin updated successfully!");
      resetForm();
      fetchClinics();
    } catch (error) {
      console.error("Error updating clinic:", error);
      setMessage(`An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (clinicId: string) => {
    if (!window.confirm("Are you sure you want to delete this clinic?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/deleteclinics", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinicId }),
      });

      if (response.ok) {
        setMessage("Clinic deleted successfully!");
        fetchClinics();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while deleting the clinic.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setClinicId(null);
    setAdminId(null);
    setClinicName("");
    setLocation("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <div className="add-clinic-container">
      <div>
      <h1>{clinicId ? "Edit Clinic" : "Add Clinic"}</h1>
      <form onSubmit={clinicId ? handleUpdate : handleSubmit}>
        <input type="text" placeholder="Clinic Name" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <input type="password" placeholder="Password (optional for edit)" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" disabled={loading}>{loading ? "Processing..." : clinicId ? "Update Clinic" : "Add Clinic"}</button>
        {clinicId && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      {message && <p>{message}</p>}
      <div className="admindetails">
      </div>
        <h2>Clinics</h2>
        <ul>
          {clinics.map((clinic) => (
            <li key={clinic.clinicId}>
              <strong>{clinic.clinicName}</strong> - {clinic.location}
              <br />
              Admin: {clinic.admin ? `${clinic.admin.firstName} ${clinic.admin.lastName} (${clinic.admin.email})` : "No Admin Assigned"}
              <br />
              <button onClick={() => handleEdit(clinic)}>Edit</button>
              <button onClick={() => handleDelete(clinic.clinicId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddClinic;
