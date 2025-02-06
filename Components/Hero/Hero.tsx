import React from 'react';
import Image from 'next/image';
import Heroimg from '../../public/images/Funny-Dog-Wallpaper-HD.jpg';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <header className="hero1">
      <div className="hero-content">
        <Image 
          src={Heroimg} 
          alt="Puppies" 
          className="hero-image" 
          layout="responsive" 
          priority 
        />
      </div>
    </header>
  );
};

export default Hero;
