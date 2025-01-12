import React from "react";
import "./Signup.css";
import Image from "next/image";
import image from "../../public/images/pexels-tima-miroshnichenko-6235111.jpg";

const Signup: React.FC = () => {
  return (
    <div className="signup-container">
      {/* Image Section */}
      <div className="image-section">
        <Image
          src={image}
          alt="Happy Dog"
          className="signup-image"
          layout="responsive"
          width={500} // Replace with actual width of the image
          height={750} // Replace with actual height of the image
          priority
        />
      </div>

      {/* Form Section */}
      <div className="form-section">
        <h1>Let’s get started with your 30 day free trial</h1>
        <form>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              minLength={8}
              required
            />
            <small>Must be at least 8 characters</small>
          </div>

          {/* Submit Button */}
          <button type="submit">Create An Account</button>
        </form>

        {/* Footer Text */}
        <p className="footer-text">
          Already a member? <a href="#login">Sign in to your account</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
