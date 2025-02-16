import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <h3>Petomoo</h3>
                <ul>
                    <li><a href="#">Consultation</a></li>
                    <li><a href="#">Pet Products</a></li>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Stay Connected</h3>
                <div className="social-icons">
                    <i className="fab fa-facebook" aria-label="Facebook"></i>
                    <i className="fab fa-instagram" aria-label="Instagram"></i>
                </div>
            </div>
            <div className="footer-column">
                <h3>Join as petofamily !!</h3>
                <p>Our services are wide open for you</p>
                <button className="promo-button">Be with petomoo</button>
            </div>
        </footer>
    );
};

export default Footer;
