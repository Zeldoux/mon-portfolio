// src/Pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import LandingPage from '../MainPage/LandingPage';
import Projects from '../../components/Projects';
import ProjectsAddForm from '../../components/ProjectForm';
import Login from '../../components/LoginForm';

const AdminPage = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem('token'); // Read token directly

  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setShowLandingPage(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowLandingPage(true);
  };

  return (
    <main>
      {showLandingPage ? (
        <LandingPage onEnter={() => setShowLandingPage(false)} />
      ) : (
        <>
          {token ? (
            <>
              <ProjectsAddForm token={token} fetchProjects={fetchProjects} />
              <Projects projects={projects} fetchProjects={fetchProjects} />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </>
      )}
    </main>
  );
};

export default AdminPage;
