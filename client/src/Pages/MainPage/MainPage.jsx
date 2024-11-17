// src/Pages/MainPage.js
import React, { useState, useEffect } from 'react';
import TypingEffect from '../../components/TypingEffect';
// import Login from '../../components/Login';
import Profile from '../../components/Profile';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import Contact from '../../components/Contact';


import '../../styles/Section.css';

const MainPage = () => {

  const [projects, setProjects] = useState([]);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };


  return (
      <>
      <article className="typing-container">
        <h1>
        <TypingEffect
              phrases={[
                "Bienvenue sur le Portfolio de Yoann Sousa",
                "Développeur web",
                "Passionné de programmation",
              ]}
              typingSpeed={80}  // typing speed
              deleteSpeed={50}   // delete speed
              pause={500}        // pause between sentences
            />
        </h1>
      </article>
        
      <article id="profile" className="article-container">
        <Profile />
      </article>
      <article id="skills" className="article-container">
        <Skills />
      </article>
      <article id="projects" className="article-container">
        <Projects projects={projects} />
      </article>
      <article id="contact" className="article-container">
        <Contact />
      </article>
      </>
  );
};

export default MainPage;
