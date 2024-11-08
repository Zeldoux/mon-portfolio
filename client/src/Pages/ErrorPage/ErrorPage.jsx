import React, { useState, useEffect } from 'react';
import LandingPage from '../../Pages/MainPage/LandingPage';
import Login from '../../components/Login';
//import Profile from '../components/Profile';
//import Skills from '../components/Skills';
import Projects from '../../components/Projects';

const ErrorPage = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [projects, setProjects] = useState([]);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleEnterSite = () => {
    setShowLandingPage(false); // Hide the landing page to show main content
  };

  return (
    <div className="main-page">
      {showLandingPage ? (
        <LandingPage onEnter={handleEnterSite} />
      ) : (
        <>
          {/* Main content available to everyone */}
          
          <Projects
            projects={projects}
            setProjects={setProjects}
            token={token} // Pass token to conditionally render add/delete options
            fetchProjects={fetchProjects}
          />

          {/* Show login form if not authenticated */}
          {!token && <Login onLogin={handleLogin} />}

          {/* Logout button for authenticated users */}
          {token && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </>
      )}
    </div>
  );
};

export default ErrorPage;
