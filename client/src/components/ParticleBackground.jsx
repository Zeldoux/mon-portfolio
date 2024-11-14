import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const pulseFactorRef = useRef(0.01); // Initial pulse factor
  const pulseVariationSpeed = 0.001; // Speed of pulse variation
  const waveAmplitude = 15; // Amplitude for the wave effect
  const particleDensity = 300; // Density of particles per wave
  const particlesWave1 = useRef([]);
  const particlesWave2 = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let animationFrameId;

    // Function to create particles
    const createParticles = () => 
      Array.from({ length: particleDensity }, (_, index) => ({
        x: (index / particleDensity) * canvas.width,
        y: canvas.height / 2 + (Math.random() * 10 - 5), // Initial random vertical offset
        size: Math.random() * 2 + 1,
        baseY: canvas.height / 2 + (Math.random() * 10 - 5),
        color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`,
        speed: Math.random() * 0.5 + 0.5,
        waveOffset: Math.random() * 100,
      }));

    // Initialize particles on first render
    particlesWave1.current = createParticles();
    particlesWave2.current = createParticles(); 

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = createGradient(ctx, pulseFactorRef.current);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate each wave of particles
      const animateWave = (particles) => {
        particles.forEach((p, index) => {
          p.y = p.baseY + Math.sin(Date.now() * 0.0005 + index * 0.05) * waveAmplitude;
          p.x += p.speed * 0.05;
          if (p.x > canvas.width) p.x = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
        
      };

      animateWave(particlesWave1.current); // First wave
      animateWave(particlesWave2.current); // Second wave

      pulseFactorRef.current = 0.06 + Math.sin(Date.now() * pulseVariationSpeed) * 0.03;
      animationFrameId = requestAnimationFrame(animateParticles);
      
      
    }

    animateParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesWave1.current = createParticles();
      particlesWave2.current = createParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas className='background-container'
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default ParticleBackground;

// Create gradient function
function createGradient(ctx, pulseFactor) {
  const gradient = ctx.createRadialGradient(
    ctx.canvas.width * 0.5,
    ctx.canvas.height * 0.5,
    0,
    ctx.canvas.width * 0.5 + pulseFactor * 100,
    ctx.canvas.height * 0.5 + pulseFactor * 100,
    ctx.canvas.width
  );

  gradient.addColorStop(0, `rgba(15, 15, 15, ${pulseFactor + 0.1})`);
  gradient.addColorStop(0.4, `rgba(50, 50, 50, ${pulseFactor + 0.4})`);
  gradient.addColorStop(0.7, `rgba(30, 30, 30, ${pulseFactor + 0.6})`);
  gradient.addColorStop(1, 'rgba(15, 15, 15, 0.9)');

  return gradient;
}

