import React, { useState } from 'react';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import '../../styles/layout.css';

const FooterAccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="footer-accordion-section">
      <button
        className="footer-accordion-header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={title.replace(/\s/g, '')}
      >
        {title}
        <span className="footer-accordion-icon">{open ? '-' : '+'}</span>
      </button>
      <div
        className={`footer-accordion-content${open ? ' open' : ''}`}
        id={title.replace(/\s/g, '')}
        style={{ display: open ? 'block' : 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="milano-footer">
    <div className="footer-brand-section">
      <div className="footer-logo">Fashionhub</div>
      <p>
        We only carry designs we believe in ethically and aesthetically – original, authentic pieces that are made to last. <a href="#">Learn more</a>
      </p>
      <div className="footer-contact">
        <div><MdLocationOn /> Bhubaneswar 751024</div>
        <div><MdPhone /> +91 (973) 435-3638</div>
        <div><MdEmail /> info@fashionhub.com</div>
      </div>
    </div>
    <FooterAccordionSection title="Our Company">
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Our Store</a></li>
        <li><a href="#">Store Location</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </FooterAccordionSection>
    <FooterAccordionSection title="Quick links">
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms & Conditions</a></li>
        <li><a href="#">Sale</a></li>
        <li><a href="#">Size guide</a></li>
        <li><a href="#">Wishlist</a></li>
        <li><a href="#">Compare</a></li>
      </ul>
    </FooterAccordionSection>
    <FooterAccordionSection title="Sign Up to Newsletter">
      <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Enter your email..." required />
        <button type="submit">Sign Up</button>
      </form>
      <small>
        ***By entering the e-mail you accept the <a href="#">terms and conditions</a> and the <a href="#">privacy policy</a>.
      </small>
    </FooterAccordionSection>
    <div className="footer-bottom">
      <span>
        <img src="/images/flag-ind.webp" alt="IND" style={{ width: 20, verticalAlign: 'middle' }} /> INDIA (RUPEE ₹)
      </span>
      <span>© 2025 Fashionhub store. All rights reserved.</span>
      <span>
        <img src="/images/visa.webp" alt="Visa" />
        <img src="/images/mastercard.webp" alt="Mastercard" />
        <img src="/images/paypal.webp" alt="Paypal" />
        <img src="/images/amex.webp" alt="Amex" />
      </span>
    </div>
  </footer>
);

export default Footer;
