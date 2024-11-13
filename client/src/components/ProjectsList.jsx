// src/components/ProjectList.js
import React from 'react';

function ProjectList({ projects }) {
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
        </li>
      ))}
    </ul>
  );
}

export default ProjectList;