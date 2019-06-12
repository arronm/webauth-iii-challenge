const express = require('express');

const db = require('../data/models.js');
const auth = require('../middleware/auth');
const errorRef = require('../helpers/errorRef');

const router = express.Router();

router.get('/', auth, (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.status(500).send(errorRef(error)));
});

module.exports = router;
