import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* TOP */}
      <div className="footer-top">
        {/* Column 1 */}
        <div className="footer-column">
          <h3>FreshCart</h3>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>

        {/* Column 2 (CATEGORIES) */}
        <div className="footer-column">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/products?category=Vegetables">Vegetables</Link>
            </li>
            <li>
              <Link to="/products?category=Fruits">Fruits</Link>
            </li>
            <li>
              <Link to="/products?category=Beverages">Drinks</Link>
            </li>
            <li>
              <Link to="/products?category=Dairy">Dairy Products</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3>Useful Links</h3>
          <ul>
            <li>
              <Link to="/profile">My Account</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-column">
          <h3>Customer Service</h3>
          <ul>
            <li>Payment Methods</li>
            <li>Money-back Guarantee</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div className="footer-column support">
          <h3>24/7 Customer Support</h3>
          <p className="phone">+1 987 654 3210</p>

          <h3 className="newsletter-title">Newsletter</h3>
          <div className="newsletter">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <hr />

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 FreshCart. All rights reserved.</p>

        <div className="socials">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>

        <div className="payments">
          <span>VISA</span>
          <span>MC</span>
          <span>AMEX</span>
          <span>PP</span>
        </div>
      </div>
    </footer>
  );
}
