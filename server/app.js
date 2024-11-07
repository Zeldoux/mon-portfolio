const express = require('express');
const path = require('path');
const cors = require('cors'); // Importez le middleware cors
const app = express();

// Middlewares et routes API
app.use(express.json());

// Utilisez le middleware cors
app.use(cors());
// Exemples de routes API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis le serveur !' });
});

// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Gestion des routes inconnues pour React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;