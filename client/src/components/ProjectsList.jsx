// src/components/ProjectList.js
import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import Gallery from './Gallery';
import '../style/ProjectList.css'; 

function ProjectList({ projects }) {
  const [modalContent, setModalContent] = useState(null);

  const handleCardClick = (project) => {
    setModalContent(
      <>
        <div className='project-info'>
        <h2>{project.title}</h2>
        {project.link && (
          
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            Lien GitHub vers le Projet
          </a>
        
        )}
        <p>{project.description}</p>

        </div>
        
        {project.imageUrl && project.imageUrl.length > 0 && (
          <Gallery images={project.imageUrl} />
        )}
        
      </>
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
