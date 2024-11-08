// App.js
import React, { useEffect } from 'react';
import './style/App.css';
import AppRouter from './Router/AppRouter';

function App() {
  useEffect(() => {
    createParticles(); // Initiate particles on mount
  }, []);

  return (
    <div className="app">
      <div className="background-overlay">
          <AppRouter />
        <div id="particles-container"></div>
      </div>
    </div>
  );
}

export default App;

function createParticles() {
  const container = document.getElementById('particles-container');
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Randomize position and size
    particle.style.width = `${Math.random() * 6 + 4}px`;
    particle.style.height = particle.style.width;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    
    // Randomize blur for depth effect
    const blur = Math.random() * 8;
    particle.style.filter = `blur(${blur}px)`;
    
    // Parallax speed (simulated by animation duration)
    particle.style.animationDuration = `${Math.random() * 5 + 15}s`;

    container.appendChild(particle);
  }
}