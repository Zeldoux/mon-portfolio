const express = require("express");

const router = express.Router();
const projectCtrl = require('../controllers/projectCtrl');
const auth = require('../middleware/auth');

// Protected routes

// POST (add new project)
router.post('/',auth, projectCtrl.createProject);


// PUT (updating a project)
router.put('/:id',auth,projectCtrl.modifyProject);

// DELETE (deleting a project)
router.delete('/:id',auth,  projectCtrl.deleteProject);


// Public routes

// GET all project
router.get('/',projectCtrl.getAllProject);

// GET a single project (ID)
router.get('/:id',projectCtrl.getOneProject);

module.exports = router;