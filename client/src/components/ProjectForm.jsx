// src/components/AddProjectForm.js
import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
function AddProjectForm({ fetchProjects }) {
  const { token } = useContext(AuthContext);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    problems: '',
    solutions: '',
    skills: '',
    imageUrl: '',
    link: '',
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    const imageUrlArray = newProject.imageUrl.split(',').map((url) => url.trim());
    const problemsArray = newProject.problems.split('\n').map((item) => item.trim());
    const solutionsArray = newProject.solutions.split('\n').map((item) => item.trim());
    const skillsArray = newProject.skills.split(',').map((item) => item.trim());

    fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newProject,
        imageUrl: imageUrlArray,
        problems: problemsArray,
        solutions: solutionsArray,
        skills: skillsArray,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add project');
        return res.json();
      })
      .then(() => {
        fetchProjects();
        setNewProject({
          title: '',
          description: '',
          problems: '',
          solutions: '',
          skills: '',
          imageUrl: '',
          link: '',
        });
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
      <textarea
        placeholder="Problems (one per line)"
        value={newProject.problems}
        onChange={(e) => setNewProject({ ...newProject, problems: e.target.value })}
      />
      <textarea
        placeholder="Solutions (one per line)"
        value={newProject.solutions}
        onChange={(e) => setNewProject({ ...newProject, solutions: e.target.value })}
      />
      <input
        type="text"
        placeholder="Technologies (comma-separated)"
        value={newProject.skills}
        onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URLs (comma-separated)"
        value={newProject.imageUrl}
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
