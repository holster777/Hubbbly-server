// --- Imports --- //

// Dependencies
const router = require('express').Router()
const mongoose = require('mongoose')

// Models

const User = require('../models/User.model')
const Client = require('../models/Client.model')

// --- Routes --- //

// Get Clients

router.get('/clients', (req, res, next) => {

    User.find()
    .populate('clients')
    .then((response) => res.json(response))
    .catch((err) => next(err))

})


// Create Client //


router.post('/new-client', (req, res, next) => {

    const { username, password, userId } = req.body;

    console.log(req.body)

    Client.create({username, password, projects: []})
    .then((newClient) => {
        return User.findByIdAndUpdate(userId, { $push: { clients: newClient._id } }, { new: true });
      })
    .then((response) => res.json(response))
    .catch((err) => next(err))


})

// Edit Client //

router.put('/:clientId', (req, res, next) => {

    const {clientId} = req.params

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

    Client.findByIdAndUpdate(clientId, req.body, {new:true})
    .then((response) => res.json(response))
    .catch((err) => next(err))

})

// Delete Client // 

router.delete('/:clientId', (req, res, next) => {

    const {clientId} = req.params

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

      Client.findOneAndDelete(clientId)
      .then(() => res.json({message: `Client ${clientId} was deleted`}))
      .catch((err) => next(err))
})

module.exports = router