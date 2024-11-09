import React, { useEffect } from 'react';
import '../style/Background.css';

const Background = () => {
  useEffect(() => {
    createParticles(); // Create particles on mount
  }, []);

  return (
    <div className="background-overlay" aria-hidden="true"></div>
  );
};

export default Background;

function createParticles() {
  const container = document.querySelector('.background-overlay'); // Reuse background container
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.width = `${Math.random() * 6 + 4}px`;
    particle.style.height = particle.style.width;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    
    const blur = Math.random() * 8;
    particle.style.filter = `blur(${blur}px)`;
    particle.style.animationDuration = `${Math.random() * 5 + 15}s`;

    container.appendChild(particle);
  }
}
