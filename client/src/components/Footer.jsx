// src/components/Footer.js
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://www.linkedin.com/in/yoannsousa/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
        <a href="https://github.com/Zeldoux" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href="mailto:monadresseemail.com">
          <FaEnvelope /> monadresseemail
        </a>
      </div>
    </footer>
  );
};

export default Footer;