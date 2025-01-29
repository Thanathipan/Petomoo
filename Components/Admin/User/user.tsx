import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo.png";
import "./user.css";
interface User {
  _id: string; // MongoDB uses `_id`
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete user");
      }

      alert("User deleted successfully");
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main-content">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </div>
        <div className="nav-links">
          <Link href="/admin/user">Users</Link>
          <Link href="/admin/booking">Booking</Link>
          <Link href="/admin/payment">Payments</Link>
        </div>
        <input type="search" placeholder="Search..." />
      </div>

      {/* Users Section */}
      <div className="content-area">
        <div className="header">
          <h1>Users</h1>
        </div>
        <div className="user-cards-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="user-card" key={user._id}>
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <p><strong>ID:</strong> {user._id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
                <button onClick={() => deleteUser(user._id)} className="delete-button">Delete</button>
              </div>
            ))
          ) : (
            <p className="no-users">No users available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
