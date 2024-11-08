import React, { useEffect, useState } from 'react';

import Projects from './components/projects';
import Login from './components/login';
import LandingPage from './components/landingPage';


function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLandingPage, setShowLandingPage] = useState(true); // Add this state

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
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleEnterSite = () => {
    setShowLandingPage(false); // Hide the landing page
  };

  return (
    <div className="app">
      {showLandingPage ? (
        <LandingPage onEnter={handleEnterSite} />
      ) : (
        <div className="main-content">
          <h1>My Portfolio</h1>
          {token ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Projects
                projects={projects}
                setProjects={setProjects}
                token={token}
                fetchProjects={fetchProjects}
              />
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} />
              <Projects projects={projects} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
