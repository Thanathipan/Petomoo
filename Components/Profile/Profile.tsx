import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Profile.module.css";
import Profile from "../../public/images/AdobeStock_465514906_Preview.jpeg";
import axios from "axios";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "", // Added role field to verify access
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/cookie");

        if (!response.data.user) {
          router.push("/login");
          return;
        }

        const user = await axios.get(`/api/Profile?id=${response.data.user.id}`);

        // Allow only "user" and "superadmin"
        if (user.data.role !== "user" && user.data.role !== "superadmin") {
          router.push("/login");
          return;
        }

        setUserData(user.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const handleEditClick = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
    setIsModified(true);
  };

  const handleSave = async () => {
    if (isModified) {
      try {
        const response = await fetch(`/api/Profile?id=${userData._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to update user.");
        }

        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser.updatedUser)); // Save updated data
        setUserData(updatedUser.updatedUser);

        toast.success("Profile updated successfully!", { theme: "dark" });
      } catch (error: any) {
        console.error("Error updating profile:", error.message);
        toast.error(`Error: ${error.message}`, { theme: "dark" });
      } finally {
        setIsModified(false);
      }
    } else {
      toast.info("No changes were made.", { theme: "dark" });
    }

    setIsEditing({
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
    });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        localStorage.removeItem("user"); 
        toast.success("Logout successful!", { theme: "dark" });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging out.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <ToastContainer />
      <div className={styles.headerprofile}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.contentprofile}>
        <div className={styles.imageprofile}>
          <Image src={Profile} alt="profile Image" width={150} height={150} />
        </div>

        <div className={styles.infoprofile}>
          <h1>Edit Profile</h1>
          <p className={styles.userEmail}>{userData.email || "No email available"}</p>
        </div>

        <div className={styles.formInputs}>
          {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
            <div key={field} className={styles.formGroup}>
              <input
                type={field === "email" ? "email" : field === "phoneNumber" ? "tel" : "text"}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={userData[field as keyof typeof userData]}
                onChange={(e) => handleChange(e, field)}
                readOnly={!isEditing[field as keyof typeof isEditing]}
              />
              <span
                className={styles.editSymbol}
                onClick={() => handleEditClick(field)}
                role="button"
                tabIndex={0}
              >
                ✎ᝰ
              </span>
            </div>
          ))}
        </div>

        <button className={styles.buttonSave} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
