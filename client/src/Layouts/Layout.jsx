
import React from 'react';
import '../style/layout.css'
import ParticleBackground from '../components/ParticleBackground'
//import Footer from './Footer';


import Header from '../components/Header'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <ParticleBackground />
      <Header/> 
      <main className="main-page">
        
        {children} {/* This will render the page content */}
      </main>
      <Footer />
      </>
      
    
  );
};

export default Layout;