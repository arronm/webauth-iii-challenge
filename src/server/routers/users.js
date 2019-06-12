const express = require('express');

const db = require('../data/models.js');
const auth = require('../middleware/auth');
const errorRef = require('../helpers/errorRef');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const users = await db.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
})

module.exports = router;
