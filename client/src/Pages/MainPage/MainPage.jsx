// src/Pages/MainPage.js
import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
// import Login from '../../components/Login';
import Profile from '../../components/Profile';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import Contact from '../../components/Contact'
const MainPage = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
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

  const handleEnterSite = () => {
    setShowLandingPage(false); // Hide the landing page to show main content
  };

  return (
    <>
      {showLandingPage ? (
        <article className="home-section">
        <LandingPage onEnter={handleEnterSite} />
        </article>
      ) : (
        <>
          <article className="profile-section">
            <Profile />
          </article>
          <article className="Skills-section">
            <Skills />
          </article>
          <article className="projects-section">
            <Projects projects={projects} />
          </article>
          <article className="Contact-section">
            <Contact />
          </article>
        </>
      )}
    </>
  );
};

export default MainPage;
