import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';
import Modal from '../components/Modal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';


const Layout = ({ children }) => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (newToken) => {
    login(newToken); // update context with new token 
    setShowLoginModal(false); // close modal for connection
  };
  

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <ParticleBackground />
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
      />
      <main className="main-page">{children}</main>
      <Footer />
      {showLoginModal && (
        <Modal
        content={<LoginForm onLogin={handleLogin} />} // handlelogin to loginForm
        onClose={() => setShowLoginModal(false)}
      />
      )}
    </>
  );
};

export default Layout;
