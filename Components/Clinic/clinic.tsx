import React from "react";
import "./clinic.css";
import Image from 'next/image';

import image from "../../public/images/pexels-tima-miroshnichenko-6235111.jpg";

const Clinic: React.FC = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="clinic-hero">
        <div className="hero-overlay">
          <h1>Convenient online and offline veterinary services.</h1>
        </div>
      </section>

      {/* Clinic Section */}
      <section className="clinic-section">
        <div className="clinic-content">
          <Image
            src={image}
            alt="Visit Our Clinic"
            className="clinic-image"
          />
          <div className="clinic-details">
            <h2>Visit Our Clinic</h2>
            <p>
              Visit our clinic for comprehensive veterinary care. Our experienced
              team provides thorough physical examinations, advanced diagnostics, and
              personalized treatments to ensure your pet’s health and well-being.
              Schedule your in-clinic appointment today for the best in pet care.
            </p>
            <a href="#" className="schedule-btn">
              Schedule a visit →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Clinic;
