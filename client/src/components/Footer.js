import React from 'react';
import '../styles/Footer.css';
import screenerLogo from '../assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="brand">
          <img src={screenerLogo} alt="logo" />
          <p className="subtitle">Stock analysis and screening tool</p>
        </div>
        <div className="company-info">
          <p>Mittal Analytics Private Ltd © 2009-2024</p>
          <p>Made with ❤️ in India.</p>
          <br/>
          <p>Data provided by C-MOTS Internet Technologies Pvt Ltd</p>
          <br/>
          <p className="links">
            <a href="/results">Terms</a> & <a href="/results">Privacy</a>
          </p>
        </div>
      </div>
      
      <div className="footer-right">
        <div className="footer-column">
          <h3>Product</h3>
          <ul>
            <li><a href="/results">Premium</a></li>
            <li><a href="/results">What's new?</a></li>
            <li><a href="/results">Learn</a></li>
            <li><button className="install-button">⚡INSTALL</button></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Team</h3>
          <ul>
            <li><a href="/results">About us</a></li>
            <li><a href="/results">Support</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Theme</h3>
          <ul>
            <li><a href="/results" className="theme-option">☀️ Light</a></li>
            <li><a href="/results" className="theme-option">🌙 Dark</a></li>
            <li><a href="/results" className="theme-option">💻 Auto</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;