// src/components/Footer.js
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://www.linkedin.com/in/yoannsousa/" target="_blank" rel="noopener noreferrer" aria-label="Visitez la page LinkDin de Yoann Sousa">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Zeldoux" target="_blank" rel="noopener noreferrer" aria-label="visitez la page Github de Yoann Sousa">
          <FaGithub />
        </a>
        <a href="mailto:contacter-moi@ysportfolio.fr" aria-label="Envoyer un email a Yoann Sousa">
          <FaEnvelope />
        </a>
        <a href="https://altcha.org">Protected by ALTCHA</a>
      </div>
    </footer>
  );
};

export default Footer;