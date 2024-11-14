// src/components/AddProjectForm.js
import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';

function AddProjectForm({ fetchProjects }) {
  const { token } = useContext(AuthContext);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    const imageUrlArray = newProject.imageUrl.split(',').map(url => url.trim());

    fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Inclure le jeton
      },
      body: JSON.stringify({ ...newProject, imageUrl: imageUrlArray }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add project');
        return res.json();
      })
      .then(() => {
        fetchProjects();
        setNewProject({ title: '', description: '', imageUrl: '', link: '' });
      })
      .catch((err) => console.error(err));
  };
  

  return (
    <form onSubmit={handleAddProject}>
      <h3>Add New Project</h3>
      <input
        type="text"
        placeholder="Title"
        value={newProject.title}
        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Image URLs (comma-separated)"
        value={newProject.imageUrls}
        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
      />
      <input
        type="text"
        placeholder="Link"
        value={newProject.link}
        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
      />
      <button type="submit">Add Project</button>
    </form>
  );
}

export default AddProjectForm;