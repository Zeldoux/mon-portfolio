// src/components/AddProjectForm.js
import React, { useState } from 'react';

function AddProject({ token, fetchProjects }) {
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', link: '' });

  const handleAddProject = (e) => {
    e.preventDefault();
    fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newProject),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add project');
        return res.json();
      })
      .then(() => {
        fetchProjects();
        setNewProject({ title: '', description: '', image: '', link: '' });
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
        placeholder="Image URL"
        value={newProject.image}
        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
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

export default AddProject;