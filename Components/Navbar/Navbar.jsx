import React from 'react';
import './Navbar.css'
import Link from 'next/link';
import caio from '../../public/images/pexels-caio-69371.jpg';
// import { Link } from 'react-router-dom';
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className="navbar">
    <image className="logo" src= {caio} alt="Logo" />
    <ul>
      <li><Link href='#consutation' >Consultation</Link></li>
      <li><a href="#">Pet Shop</a></li>
      <li><a href="#">Sign Up</a></li>
      <li><a href="#">Cart</a></li>
      <li><a href="#">Book Now</a></li>
    </ul>
  </nav>
    )
}

export default Navbar