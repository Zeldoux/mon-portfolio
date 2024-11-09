// src/components/Projects.js
import React, { useState } from 'react';

function Projects({ projects, setProjects, token, fetchProjects }) {
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', link: '' });

  const handleAddProject = (e) => {
    e.preventDefault();
    fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify(newProject),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add project');
        }
        return res.json();
      })
      .then((data) => {
        
        fetchProjects();
        setNewProject({ title: '', description: '', image: '', link: '' });
      })
      .catch((err) => {
        console.error(err);
        
      });
  };

  const handleDeleteProject = (id) => {
    fetch(`/api/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete project');
        }
        return res.json();
      })
      .then(() => {
      
        fetchProjects();

      })
      .catch((err) => {
        console.error(err);
        
      });
  };

  return (
    <div>
      <h2>My Projects</h2>
      {token && (
        <form onSubmit={handleAddProject}>
          <h3>Add New Project</h3>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link"
            value={newProject.link}
            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          />
          <button type="submit">Add Project</button>
        </form>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.image && <img src={project.image} alt={project.title} style={{ width: '200px' }} />}
            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </p>
            )}
            {token && (
              <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
