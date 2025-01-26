import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
import './Navbar2.css';
// import icon from '../../public/images/icons8-user-100.png'
const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link href="/" passHref>
        <Image className="logo" src={Logo} alt="Logo" width={120} height={60} />
      </Link>
      <ul>
      <li>
          <Link href="/landingpage">Home</Link>
        </li>
        <li>
          <Link href="/booking">Consultation</Link>
        </li>
        
        <li>
          <Link href="/clinic">Clinic</Link>
        </li>
        <a href="Profile">
          <Image src="/public/images/Contactimg.jpg" alt="User Icon" width={50} height={50} />
        </a>
        
      </ul>
    </nav>
  );
};

export default Navbar;
