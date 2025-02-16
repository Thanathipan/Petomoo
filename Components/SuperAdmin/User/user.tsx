import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/images/logo.png";
import "./user.css";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete user");
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


      <div className="content-area">
        <div className="header">
        </div>
        <div className="user-cards-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="user-card" key={user._id}>
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <p><strong>ID:</strong> {user._id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
                
                <p><strong>Role:</strong> {user.role}</p>
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
