// --- Imports --- //

// Dependencies
const router = require('express').Router()
const mongoose = require('mongoose')

// Models

const Client = require('../models/Client.model')
const Project = require('../models/Project.model')

// --- Routes --- //

// Get Projects // 

router.get('/:clientId/projects', (req, res, next) => {

    const {clientId} = req.params

    Client.findById(clientId)
    .populate('projects')
    .then((response) => res.json(response))
    .catch((err) => next(err))

})


// Create Project //

router.post('/new-project', (req, res, next) => {

    const { clientId, name } = req.body;

    Project.create({ name, client: clientId, cards:[]})
    .then((newProject) => {
        return Client.findByIdAndUpdate(newProject.client, { $push: { projects: newProject._id } }, { new: true });
      })
    .then((response) => res.json(response))
    .catch((err) => next(err))


})

// Edit Project

router.put('/:projectId', (req, res, next) => {

    const {projectId} = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

    Project.findByIdAndUpdate(projectId, req.body, {new:true})
    .then((response) => res.json(response))
    .catch((err) => next(err))

})

// Delete Project

router.delete('/:projectId', (req, res, next) => {

    const {projectId} = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

      Project.findByIdAndDelete(projectId)
      .then((deletedProject) => {
        return Client.findByIdAndUpdate(deletedProject.client, { $pull: { projects: projectId } })
      })
      .then(() => res.json({message: `Project ${projectId} was deleted`}))
      .catch((err) => next(err))


})

module.exports = router