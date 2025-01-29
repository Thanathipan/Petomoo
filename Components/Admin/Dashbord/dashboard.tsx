import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import "./dashboard.css";
import Link from "next/link";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </div>
        <ul className="navbar-links">
          <li>
            <Link href="/admin/user" style={{ color: "#4C394F" }}>
              Users
            </Link>
          </li>
          <li>
            <Link href="/admin/order" style={{ color: "#4C394F" }}>
              Bookings
            </Link>
          </li>
          <li>
            <Link href="/admin/payment" style={{ color: "#4C394F" }}>
              Payments
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="analytics-section">
          <h1>Analytics</h1>
          <div className="analytics-cards">
            <div className="analytics-card">Products</div>
            <div className="analytics-card">Users</div>
            <div className="analytics-card">Bookings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
