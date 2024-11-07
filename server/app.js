const express = require('express');
const path = require('path');
const cors = require('cors'); // Importez le middleware cors
const app = express();

const Project = require('./models/project');

// Middlewares et routes API
app.use(express.json());

// Utilisez le middleware cors
app.use(cors());
// Exemples de routes API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis le serveur !' });
});

// Route pour récupérer tous les projets
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Route pour ajouter un nouveau projet (optionnel)
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).send('Erreur lors de la création du projet');
  }
});

// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Gestion des routes inconnues pour React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;