// src/components/Projects.js
import React from 'react';
import ProjectList from './ProjectsList';

function Projects({ projects }) {
  return (
    <section className="section-container">
      <h2 className="title-banner">Mes Projets</h2>
      <ProjectList projects={projects} />
    </section>
  );
}

export default Projects;