// src/App.js
import React, { useEffect, useState } from 'react';
import Projects from './components/projects';
import Login from './components/login';

function App() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // Fetch projects when the component mounts
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

  return (
    <div>
      <h1>My Portfolio</h1>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Projects projects={projects} setProjects={setProjects} token={token} fetchProjects={fetchProjects} />
        </>
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Projects projects={projects} />
        </>
      )}
    </div>
  );
}

export default App;
