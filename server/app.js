const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');


mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Erreur de connexion à MongoDB :', err));

const app = express();

// Middlewares et routes API
app.use(express.json());

// Utilisez le middleware cors si nécésaire
//app.use(cors());


app.use('/api/project', projectRoutes); // Project routes
app.use('/api/auth', authRoutes); // Auth routes

app.use('/images', express.static(path.join(__dirname, 'images'))); // img routes 



// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Gestion des routes inconnues pour React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;