const jwt = require('jsonwebtoken');

const secret = require('../config/jwt-secret');

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '8h',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
