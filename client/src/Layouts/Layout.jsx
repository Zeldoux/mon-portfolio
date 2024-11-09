
import React from 'react';
import '../style/layout.css'
import ParticleBackground from '../components/ParticleBackground'
//import Footer from './Footer';


import Header from '../components/Header'
const Layout = ({ children }) => {
  return (
    <>
      <ParticleBackground />
      <Header/> 
      <main>
        
        {children} {/* This will render the page content */}
      </main>
      </>
      
    
  );
};

export default Layout;