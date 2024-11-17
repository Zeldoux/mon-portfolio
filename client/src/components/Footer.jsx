// src/components/Footer.js
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://www.linkedin.com/in/yoannsousa/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Zeldoux" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="mailto:contacter-moi@ysportfolio.fr">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;