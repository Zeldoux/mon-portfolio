// src/components/Projects.js
import React from 'react';
import ProjectList from './ProjectsList';

function Projects({ projects }) {
  return (
    <div className="section-container">
      <h2 className="title-banner">Mes Projets</h2>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;