import React from 'react';

function Card({ project, onClick }) {
  // check imageUrl exist and contain img 
  const imageUrl = project.imageUrl && project.imageUrl.length > 0 ? project.imageUrl[0] : null;

  return (
    <div className="card" onClick={() => onClick(project)}>
      {imageUrl ? (
        <img src={imageUrl} alt={project.title} className="card-image" />
      ) : (
        <div className="no-image">Pas d'image disponible</div>
      )}
      <h3 className="card-title">{project.title}</h3>
    </div>
  );
}

export default Card;