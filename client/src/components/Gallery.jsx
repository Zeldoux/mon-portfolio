// src/components/Gallery.js
import React, { useState } from 'react';


function Gallery({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
  if (!images || images.length === 0) return null;

  
  const totalImages = images.length;

  // Fonction pour naviguer vers l'image précédente
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + totalImages) % totalImages
    );
  };

  // Fonction pour naviguer vers l'image suivante
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % totalImages
    );
  };

  return (
    <div className="gallery">
      {totalImages > 1 && (
        <button className="arrow left-arrow" onClick={prevImage}>
          &#8592; {/* Flèche gauche */}
        </button>
      )}
       <div className="gallery-image-wrapper">
        <img
          src={images[currentImageIndex]}
          alt={`Présentation du projet ${currentImageIndex + 1}`}
          className="gallery-image"
        />
       </div>
      {totalImages > 1 && (
        <button className="arrow right-arrow" onClick={nextImage}>
          &#8594; {/* Flèche droite */}
        </button>
      )}
      {totalImages > 1 && (
        <div className="image-index">
          {currentImageIndex + 1} / {totalImages}
        </div>
      )}
    </div>
  );
}

export default Gallery;
