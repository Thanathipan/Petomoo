import Logo from '../../../public/images/pexels-charlesdeluvio-1851164.jpg';
import "./booking.css";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Orders: React.FC = () => {
  return (
    <div className="main-content">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-logo">
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </div>
        <div className="navbar-links">
          <Link href="/admin/user" className="nav-link">Users</Link>
          <Link href="/admin/booking" className="nav-link">Bookings</Link>
          <Link href="/admin/payment" className="nav-link">Payments</Link>
        </div>
        <div className="navbar-search">
          <input type="search" placeholder="Search..." />
        </div>
      </div>

      {/* Main Content */}
      <div className="home">
        <div className="background-products">
          <h1>Welcome, Admin</h1>
          <p>
            This is your admin dashboard. Use the navigation bar above to manage
            users, bookings, and payments.
          </p>
          <div className="cta-container">
            <Link href="/admin/user" className="cta-button">Manage Users</Link>
            <Link href="/admin/booking" className="cta-button">View Bookings</Link>
            <Link href="/admin/payment" className="cta-button">Payment Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
