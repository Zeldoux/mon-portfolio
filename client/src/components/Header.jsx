import React, { useEffect, useState } from 'react';
import '../style/header.css';
import LogoSVG from '../Assets/LogoSVG';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <nav>
        <div className="header-logo-container">
            <LogoSVG className="header-logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#profile">Profile</a></li>
          <li><a href="#skills">Compétences</a></li>
          <li><a href="#projects">Projets</a></li>
          <li><a href="#contact">Me Contacter</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
