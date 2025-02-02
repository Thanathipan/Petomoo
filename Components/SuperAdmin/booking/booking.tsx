import Logo from '../../../public/images/pexels-charlesdeluvio-1851164.jpg';
import "./booking.css";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Orders: React.FC = () => {
  return (
    <div className="main-content">
      {/* Navbar */}
 

      {/* Main Content */}
      <div className="home">
        <div className="background-products">
          <h1>Welcome, Admin</h1>
          <p>
            This is your admin dashboard. Use the navigation bar above to manage
            users, bookings, and payments.
          </p>
       
        </div>
      </div>
    </div>
  );
};

export default Orders;
