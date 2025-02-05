'use client'

import Logo from '../../../public/images/logo.png';
import "./clinicDashboard.css";
import React, { useState, JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Payment from "../Payment/payment";
import Bookings from "../booking/booking"; 
import Profile from "../Profile/Profile";


const Orders: React.FC = () => {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState('Users');
  const buttons = [ 'Payment', 'Booking',"Profile"];

  const panelComponents: Record<string, JSX.Element> = {
    Payments: <Payment />,
    Booking: <Bookings />,
    Profile: <Profile />,


  };

  const onPanelClick = (panel: string) => {
    setActivePanel(panel);
  };


  return (
    <div className="main-content">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-logo">
          <Image src={Logo} alt="Logo" width={50} height={50} />
        </div>
        <ul className="navbar-links">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="nav-button"
              onClick={() => onPanelClick(button)}
            >
              {button}
            </button>
          ))}
        </ul>
       
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="analytics-section">
          <div className="analytics-cards">
            {panelComponents[activePanel]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
