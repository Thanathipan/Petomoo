import React from 'react';
import './Contact.css';
import image from '../../Assets/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg'


const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <section className="contact">
    <div className="contact-info">
      <h2>Our experts are available for you 24/7</h2>
      <p><strong>☎️ Phone:</strong> 0771234567,  0771234321</p>
      <p><strong>Email:</strong> pet0moo@gmail.com</p>
    </div>
    <div className="contact-image">
      <img src={image} alt="Expert" />
    </div>
  </section>
  );
};

export default Contact;