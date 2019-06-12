const jwt = require('jsonwebtoken');

const errorRef = require('../helpers/errorRef');

const auth = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({
      message: 'Invalid Credentials',
    });
  }
}

module.exports = auth;
