import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import Login from '../../components/Login';
import Profile from '../../components/Profile';
// import Skills from '../../components/Skills';
import Projects from '../../components/Projects';

const MainPage = () => {
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
    <section className="main-page">
      {showLandingPage ? (
          <LandingPage onEnter={handleEnterSite} />
        ) : (
          <>
            <article className="profile-section">
              <Profile />
            </article>

            <section className="projects-section">
              <h2>Projects</h2>
              <Projects
                projects={projects}
                setProjects={setProjects}
                token={token}
                fetchProjects={fetchProjects}
              />
            </section>

            <section className="login-section">
              {!token ? (
                <Login onLogin={handleLogin} />
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </section>
        </>
    )}
    </section>
);
};

export default MainPage;
