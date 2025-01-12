import React from 'react';
import './Contact.css';
import Image from 'next/image';

// Contact Component
const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <section className="contact">
      <div className="contact-info">
        <h2>Our experts are available for you 24/7</h2>
        <p>
          <strong>☎️ Phone:</strong> 0771234567, 0771234321
        </p>
        <p>
          <strong>Email:</strong> pet0moo@gmail.com
        </p>
      </div>
      <div className="contact-image">
        <Image 
          src="/images/Contactimg.jpg" 
          alt="Expert" 
          width={500} // Adjust the width based on your image dimensions
          height={400} // Adjust the height based on your image dimensions
        />
      </div>
    </section>
  );
};

export default Contact;
