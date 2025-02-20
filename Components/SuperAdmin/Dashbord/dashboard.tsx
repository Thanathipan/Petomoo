'use client';

import React, { useState, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../../../public/images/logo.png"; // Ensure this path is correct
import "./dashboard.css"; // Ensure the CSS file exists
import Users from "../User/user";
import Bookings from "../booking/booking";
import Payments from "../Paymentlist/paymentlist";
import Addclinic from "../clinic/clinic";
import Profile from "../Profile/Profile";



const Dashboard: React.FC = () => {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState('Profile');
  const buttons = ['Addclinic','Users', 'Bookings', 'Payments',"Profile"];

  const panelComponents: Record<string, JSX.Element> = {
    Users: <Users />,
    Addclinic: <Addclinic />,
    Bookings: <Bookings />,
    Payments: <Payments />,
    Profile: <Profile />,

  };

  const onPanelClick = (panel: string) => {
    setActivePanel(panel);
  };



  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
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
      </nav>

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

export default Dashboard;
