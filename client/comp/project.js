// src/comp/Projects.js
import React from 'react';

function Projects({ projects }) {
  return (
    <div>
      <h2>My Projects</h2>
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
    </div>
  );
}

export default Projects;