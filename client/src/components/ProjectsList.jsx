// src/components/ProjectList.js
import React from 'react';

function ProjectList({ projects, token, fetchProjects }) {
  const handleDeleteProject = (id) => {
    fetch(`/api/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete project');
        return res.json();
      })
      .then(() => fetchProjects())
      .catch((err) => console.error(err));
  };

  return (
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
  );
}

export default ProjectList;
