import React from "react";
import "./Signup.css";
import image from '../../Assets/pexels-tima-miroshnichenko-6235111.jpg'


const Signup = () => {
  return (
    <div className="signup-container">
      <div className="image-section">
        <img
          src={image}
          alt="Happy Dog"
          className="signup-image"
        />
      </div>
      <div className="form-section">
        <h1>Let’s get started with your 30 day free trial</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            <small>Must be at least 8 characters</small>
          </div>
          <button type="submit">Create An Account</button>
        </form>
        <p className="footer-text">
          Already a member? <a href="#login">Sign in to your account</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
