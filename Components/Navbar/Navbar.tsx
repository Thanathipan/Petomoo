import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link href="/" passHref>
        <Image className="logo" src={Logo} alt="Logo" width={120} height={60} />
      </Link>
      <ul>
      <li>
          <Link href="/Landingpage">Home</Link>
        </li>
        <li>
          <Link href="/Booking">Consultation</Link>
        </li>
        
        <li>
          <Link href="/clinic">Clinic</Link>
        </li>
        <li>
          <Link href="/Signup">Sign Up</Link>
        </li>
        
        <li>
          <Link href="/Bookingvisit1
          ">Book Now</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
