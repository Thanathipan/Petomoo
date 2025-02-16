'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/images/logo.png';
import './Navbar.css';
import axios from 'axios';
import icon from '../../public/images/icons8-user-100.png'

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const checkIsLoggedIn = async () => {
     try {
  const cookieResponse = await axios.get('/api/cookie');

  if (cookieResponse.status === 200 && cookieResponse.data.user) {
    setIsLoggedIn(true);
  }
} catch (error: any) {
  setIsLoggedIn(false); // Ensure proper state handling
}

    }
    checkIsLoggedIn()
  }, [])
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
          <Link href="/consultation">Consultation</Link>
        </li>

        <li>
          <Link href="/clinic">Clinic</Link>
        </li>
        {isLoggedIn ? (
          <a href="Profile">
            <Image src={icon} alt="User Icon" width={50} height={50} />
          </a>
        ) : (
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
        )
        }


      </ul >
    </nav >
  );
};

export default Navbar;
