"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

import styles from "./Profile.module.css";
import ProfileImage from "../../../public/images/pexels-tima-miroshnichenko-6235661.jpg";

const SuperAdminProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]); // List of all users

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined" || user === "null") {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role !== "superadmin") {
        toast.error("Unauthorized Access!");
        router.push("/");
        return;
      }

      setUserData(parsedUser);
      fetchUsers(); // Load all users
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    }
  };

  // Delete a user
  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      toast.success("User deleted successfully!");
      setUsers(users.filter(user => user._id !== id)); // Update UI
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <ToastContainer />
      <div className={styles.headerprofile}>
        <button className={styles.logoutButton} onClick={() => {
          localStorage.removeItem("user");
          router.push("/login");
        }}>
          Logout
        </button>
      </div>

      <div className={styles.contentprofile}>
        <div className={styles.imageprofile}>
          <Image src={ProfileImage} alt="Profile Image" width={150} height={150} />
        </div>

        <div className={styles.infoprofile}>
          <h1>Super Admin Profile</h1>
          <p>Email: {userData?.email || "N/A"}</p>
        </div>

        <h2>Manage Users</h2>
        <div className={styles.usersList}>
          {users.length === 0 ? <p>No users found.</p> : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => deleteUser(user._id)} className={styles.deleteButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile;
