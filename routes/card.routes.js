// --- Imports --- //

// Dependencies
const router = require('express').Router()
const mongoose = require('mongoose')

// Models

const Project = require('../models/Project.model')
const Card = require('../models/Card.model')

// --- Routes --- //

// Get Cards //

router.get('/:cardId', (req, res, next) => {

    const {cardId} = req.params

    Card.findById(cardId)
    .then((response) => res.json(response))
    .catch((err) => next(err))

})

module.exports = router