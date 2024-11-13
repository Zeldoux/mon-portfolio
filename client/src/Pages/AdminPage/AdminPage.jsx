// src/Pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import LandingPage from '../MainPage/LandingPage';
import Login from '../../components/Login';
import Projects from '../../components/Projects';
import ProjectsAddForm from '../../components/ProjectForm';

const AdminPage = () => {
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
    <main>
      {showLandingPage ? (
        <LandingPage onEnter={handleEnterSite} />
      ) : (
        <>
           {token && (
            <ProjectsAddForm token={token} fetchProjects={fetchProjects} />
            )}
          <Projects
            projects={projects}
            setProjects={setProjects}
            token={token}
            fetchProjects={fetchProjects}
          />

          {!token && <Login onLogin={handleLogin} />}
          {token && <button onClick={handleLogout}>Logout</button>}
        </>
      )}
    </main>
  );
};

export default AdminPage;