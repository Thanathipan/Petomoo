import './Footer.css'

const Footer = () => {
    return (
        <footer class="footer">
        <div class="footer-column">
            <h3>Petomoo</h3>
            <ul>
                <li><a href="#">Consultation</a></li>
                <li><a href="#">Pet Products</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">About Us</a></li>
            </ul>
        </div>
        <div class="footer-column">
            <h3>Stay Connected</h3>
            <div class="social-icons">
                <i class="fab fa-facebook"></i>
                <i class="fab fa-instagram"></i>
            </div>
        </div>
        <div class="footer-column">
            <h3>Join as pawfamily and get 10% OFF</h3>
            <p>Our services are wide open for you</p>
            <button class="promo-button">Be Pawfamily</button>
        </div>
    </footer>
    )
}

export default Footer