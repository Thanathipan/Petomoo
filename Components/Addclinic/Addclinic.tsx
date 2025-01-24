import { useState } from "react";
import styles from "./AddClinicPage.module.css"; // Import the CSS module

const AddClinicPage = () => {
  const [clinicName, setClinicName] = useState("");
  const [clinicPhoto, setClinicPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clinicName || !clinicPhoto || !location) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("clinicName", clinicName);
    formData.append("clinicPhoto", clinicPhoto);
    formData.append("location", location);

    try {
      const response = await fetch("/api/Addclinic/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Clinic added successfully!");
        setClinicName("");
        setClinicPhoto(null);
        setLocation("");
      } else {
        alert("Failed to add clinic.");
      }
    } catch (error) {
      console.error("Error adding clinic:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Add Clinic</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="clinicName" className={styles.label}>
              Clinic Name
            </label>
            <input
              type="text"
              id="clinicName"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="clinicPhoto" className={styles.label}>
              Clinic Photo
            </label>
            <input
              type="file"
              id="clinicPhoto"
              accept="image/*"
              onChange={(e) =>
                setClinicPhoto(e.target.files ? e.target.files[0] : null)
              }
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="location" className={styles.label}>
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Add Clinic
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClinicPage;
