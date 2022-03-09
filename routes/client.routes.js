// --- Imports --- //

// Dependencies
const router = require('express').Router()
const mongoose = require('mongoose')

// Models

const User = require('../models/User.model')
const Client = require('../models/Client.model')
const Card = require('../models/Card.model')

// --- Routes --- //

// Create Card //

router.post('/new-card', (req, res, next) => {

    const { clientId, cardType, name, description, images, colors, colorName, colorNotes  } = req.body;

    Card.create({cardType, name, description, images, colors, colorName, colorNotes})
    .then((newCard) => {
        return Client.findByIdAndUpdate(clientId, { $push: { cards: newCard._id } }, { new: true });
      })
    .then((response) => res.json(response))
    .catch((err) => next(err))


})

module.exports = router