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
          <Link href="#consultation">Consultation</Link>
        </li>
        <li>
          <Link href="#pet-shop">Pet Shop</Link>
        </li>
        <li>
          <Link href="#sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="#cart">Cart</Link>
        </li>
        <li>
          <Link href="#book-now">Book Now</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
