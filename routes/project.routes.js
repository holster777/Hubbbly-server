// --- Imports --- //

// Dependencies
const router = require('express').Router()
const mongoose = require('mongoose')

// Models

const Project = require('../models/Project.model')
const Card = require('../models/Card.model')

// --- Routes --- //

// Get Cards //

router.get('/:projectId/cards', (req, res, next) => {

    const {projectId} = req.body

    Project.findById(projectId)
    .populate('cards')
    .then((response) => res.json(response))
    .catch((err) => next(err))

})


// Create Card //

router.post('/new-card', (req, res, next) => {

    const { projectId, cardType, name, description, images, colors, colorName, colorNotes  } = req.body;

    Card.create({cardType, name, description, images, colors, colorName, colorNotes, project: projectId})
    .then((newCard) => {
        return Project.findByIdAndUpdate(newCard.project, { $push: { cards: newCard._id } }, { new: true });
      })
    .then((response) => res.json(response))
    .catch((err) => next(err))


})


// Edit Card // 

router.put('/:cardId', (req, res, next) => {

    const {cardId} = req.params

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

    Card.findByIdAndUpdate(cardId, req.body, {new:true})
    .then((response) => res.json(response))
    .catch((err) => next(err))

})


// Delete Card //

router.delete('/:cardId', (req, res, next) => {

    const {cardId} = req.params

    if (!mongoose.Types.ObjectId.isValid(cardId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

      Card.findByIdAndDelete(cardId)
      .then((deletedCard) => {
        return Project.findByIdAndUpdate(deletedCard.project, { $pull: { cards: deletedCard._id } })
      })
      .then(() => res.json({message: `Card ${cardId} was deleted`}))
      .catch((err) => next(err))


})

module.exports = router