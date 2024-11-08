const Project = require('../models/project');

const fs = require('fs');


exports.createProject = (req,res,next) => {
    console.log('req.body:', req.body);
  const projectData = req.body;

  const project = new Project({
    ...projectData,
    userId: req.auth.userId,
    imageUrl: req.body.imageUrl || null,
  });

  project.save()
    .then(() => res.status(201).json({ message: 'Project registered' }))
    .catch((error) => res.status(400).json({ error }));
};


exports.modifyProject = (req,res,next) =>{
    
    console.log("modifying book started")
    const ProjectObject = req.file ? { // check if req contain image
        ...JSON.parse(req.body.project), // if it exist we handle the new image
        userId: req.auth.userId,
        imageUrl: req.body.imageUrl
        
    } : { ...req.body}; //if not we retrive just the body content 

    delete ProjectObject._userId;
    Project.findOne({_id: req.params.id})
        .then((project) => {
            if (project.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Project.updateOne({ _id: req.params.id}, { ...ProjectObject, _id: req.params.id}) // project before wasn't working (was updating the instance instead of the Book.book)
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };


exports.deleteProject = (req, res, next) => {
     Project.findOne({ _id: req.params.id }) // Find the project in the DB
    .then(project => {
      if (project.userId != req.auth.userId) { // Check if user IDs match
        res.status(401).json({ message: "Not authorized" });
      } else {
        console.log("Deleted Project")
        Project.deleteOne({ _id: req.params.id }) // Delete the project from the DB
            .then(() => { res.status(200).json({ message: "Project Deleted" }) })
            .catch(e => res.status(401).json({ e }));
            
      }
    })
    .catch(e => {
      res.status(500).json({ e });
    });
};

exports.getAllProject = (req,res,next) => {
    Project.find()
        .then(projects => res.status(200).json(projects))
        .catch( e => res.status(400).json({e}));
    
};

exports.getOneProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(404).json({ error }));
};