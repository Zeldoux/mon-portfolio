// src/components/ProjectList.js
import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import Gallery from './Gallery';

function ProjectList({ projects }) {
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (project) => {
    setModalContent(
      <div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        {project.imageUrl && project.imageUrl.length > 0 && (
          <Gallery images={project.imageUrl} />
        )}
        {project.link && (
          <p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </p>
        )}
      </div>
    );
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="project-list">
      {projects.map((project) => (
        <Card key={project._id} project={project} onClick={() => handleCardClick(project)} />
      ))}
      {modalContent && <Modal content={modalContent} onClose={closeModal} />}
    </div>
  );
}

export default ProjectList;
