// src/Pages/AdminPage.js

import React, { useState, useEffect } from 'react';
import Projects from '../../components/Projects'; // Displays the list of projects
import ProjectsAddForm from '../../components/ProjectForm'; // Form to add new projects

/**
 * Component: AdminPage
 * 
 * The admin page for managing projects. Allows adding new projects and viewing existing ones.
 * Requires authentication to access.
 */
const AdminPage = () => {
  const [projects, setProjects] = useState([]); // State to store project data
  const token = localStorage.getItem('token'); // Read the authentication token from localStorage

  // Fetch projects from the backend
  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err)); // Log errors to the console
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/'; // Redirect to the main page
  };

  return (
    <main>
      <>
        {/* Form to add new projects */}
        <ProjectsAddForm token={token} fetchProjects={fetchProjects} />

        {/* List of projects */}
        <Projects projects={projects} fetchProjects={fetchProjects} />

        {/* Logout button */}
        <button onClick={handleLogout}>Logout</button>
      </>
    </main>
  );
};

export default AdminPage;
