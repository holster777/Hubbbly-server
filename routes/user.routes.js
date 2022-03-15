// --- Imports --- //

// Dependencies
const router = require('express').Router()
const mongoose = require('mongoose')
const { isAuthenticated } = require('../middleware/jwt.middleware');

// Models

const User = require('../models/User.model')
const Client = require('../models/Client.model')

// --- Routes --- //

// Get Clients

router.get('/clients', (req, res, next) => {

    const {_id} = req.payload

    User.findById(_id)
    .populate('clients')
    .then((response) =>  {
      console.log(response)
      res.json(response)})
    .catch((err) => next(err))

})


// Create Client //


router.post('/new-client', isAuthenticated, (req, res, next) => {

  const user = req.payload

    const { username, email, password } = req.body;

    Client.create({username, email, password, user: user._id, projects: []})
    .then((newClient) => {
       
        return User.findByIdAndUpdate(newClient.user, { $push: { clients: newClient._id } }, { new: true });
      })
    .then((response) => res.json(response))
    .catch((err) => next(err))


})

// Get One Client //


router.get('/:clientId', isAuthenticated, (req, res, next) => {

  const {clientId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Client.findById(clientId, req.body, {new:true})
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
      .then((deletedClient) => {
          console.log(deletedClient)
        return User.findByIdAndUpdate(deletedClient.user, { $pull: { clients: deletedClient._id } })
      })
      .then(() => res.json({message: `Client ${clientId} was deleted`}))
      .catch((err) => next(err))
})

module.exports = router