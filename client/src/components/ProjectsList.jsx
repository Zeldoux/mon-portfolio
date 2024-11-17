import React, { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import Gallery from './Gallery';

import SkillData from '../data/Skills.json';

function ProjectList({ projects }) {
  const [modalContent, setModalContent] = useState(null);

  // Fonction pour récupérer le logo d'une compétence
  const getSkillLogo = (skillName) => {
    for (const category of SkillData) {
      const skill = category.skills.find((s) => s.name.toLowerCase() === skillName.toLowerCase());
      if (skill) return skill.logo;
    }
    return null; // Si aucune correspondance n'est trouvée
  };

  const handleCardClick = (project) => {
    setModalContent(
      <>
        <div className="project-info">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Lien GitHub vers le Projet
            </a>
          )}
          <h2>{project.title}</h2>
          <p>{project.description}</p>

          <h3>Problématiques rencontrées</h3>
          <ul>
            {project.problems.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>

          <h3>Solutions apportées</h3>
          <ul>
            {project.solutions.map((solution, index) => (
              <li key={index}>{solution}</li>
            ))}
          </ul>
          <h3>Compétences développées</h3>
          <ul>
          <div className="skills-icons">
            {project.skills.map((skill, index) => {
              const logo = getSkillLogo(skill); // Récupère le logo depuis les données
              return logo ? (
                <img key={index} src={logo} alt={skill} title={skill} />
              ) : (
                <span key={index}>{skill}</span> // Affiche le nom si aucun logo n'est trouvé
              );
            })}
          </div>
          </ul>
          
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