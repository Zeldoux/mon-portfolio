// src/App.js
import React, { useEffect, useState } from 'react';
import Projects from './comp/Projects';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from your API
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Mon Portfolio</h1>
      {/* Render the Projects component and pass the projects data */}
      <Projects projects={projects} />
    </div>
  );
}

export default App;