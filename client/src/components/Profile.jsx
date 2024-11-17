import React from 'react';

import LogoSVG from '../Assets/LogoSVG';

function Profile() {
  return (
    <section className="profile section-container">
      {/* Titre Principal */}
      <h2 className="title-banner">Yoann Sousa - Développeur Web</h2>
      
      {/* Contenu Principal */}
      <div className="profile-content">
        <div className="profile-text">
          {/* Section À propos de moi */}
          <div className="profile-section">
            <h3 className="section-title">À propos de moi</h3>
            <p className="profile-description">
              Autodidacte passionné, je m’investis dans le développement web depuis plusieurs années. 
              Créatif et curieux, je conçois des expériences utilisateur intuitives et accessibles, 
              en mettant l’accent sur le design et l’innovation.
            </p>
            <p className="profile-description mobile-hide">
              Toujours prêt à relever de nouveaux défis, je m’intéresse aussi à l’open-source 
              et à la transmission des connaissances, que ce soit à travers des articles, 
              du mentoring ou des projets communautaires.
            </p>
          </div>
          
          {/* Séparateur Visuel */}
          <div className="divider"></div>
          
          {/* Section Expertise */}
          <div className="profile-section ">
            <h3 className="section-title">Expertise</h3>
            <p className="profile-description">
              Polyvalent, je maîtrise les technologies front-end comme Javascript et JSReact et CSS, SCSS 
              ainsi que le back-end avec Node.js, MongoDB. et MySQL Je suis également familier avec 
              les pratiques DevOps et l’intégration continue.
            </p>
            <p className="profile-description mobile-hide">
              Mon approche consiste à allier technique et créativité pour transformer 
              des idées en solutions web modernes et performantes.
            </p>
          </div>
        </div>
        
        {/* Logo */}
        <div className="logo-container">
          <LogoSVG className="landing-logo" />
        </div>
      </div>
    </section>
  );
}

export default Profile;
