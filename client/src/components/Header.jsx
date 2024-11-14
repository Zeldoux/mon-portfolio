// src/components/Header.js
import React from 'react';
import '../style/header.css';
import LogoSVG from '../Assets/LogoSVG';

const Header = ({ isLoggedIn, onLoginClick, onLogoutClick }) => (
  <header className="header">
    <nav>
      <div className="header-logo-container">
        <LogoSVG className="header-logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#profile">Profile</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        {isLoggedIn ? (
          <li><button onClick={onLogoutClick}>Logout</button></li>
        ) : (
          <li><button onClick={onLoginClick}>Login</button></li>
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
