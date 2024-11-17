// src/Pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import Projects from '../../components/Projects';
import ProjectsAddForm from '../../components/ProjectForm';


const AdminPage = () => {
  const [ setShowLandingPage] = useState(true);
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


  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowLandingPage(true);
  };

  return (
    <main>
            <>
              <ProjectsAddForm token={token} fetchProjects={fetchProjects} />
              <Projects projects={projects} fetchProjects={fetchProjects} />
              <button onClick={handleLogout}>Logout</button>
            </>
    </main>
  );
};

export default AdminPage;
