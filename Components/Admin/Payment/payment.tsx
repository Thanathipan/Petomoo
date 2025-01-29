import React from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import "./payment.css";
import Link from "next/link";

const Payments: React.FC = () => {
  return (
    <div className="payments-container">
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
            <Link href="/admin/booking" style={{ color: "#4C394F" }}>
              Booking
            </Link>
          </li>
          <li>
            <Link href="/admin/payment" style={{ color: "#4C394F" }}>
              Payments
            </Link>
          </li>
        </ul>
        <input type="search" placeholder="Search..." className="navbar-search" />
      </nav>

      {/* Payment Details Section */}
      <div className="main-content">
        <h1 className="section-title">Payments Overview</h1>
        <div className="cards-container">
          <div className="card">
            <h2>Total Payments</h2>
            <p>$50,000</p>
          </div>
          <div className="card">
            <h2>Pending Payments</h2>
            <p>$5,000</p>
          </div>
          <div className="card">
            <h2>Successful Payments</h2>
            <p>$45,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
