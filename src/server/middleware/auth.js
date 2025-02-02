const jwt = require('jsonwebtoken');

const secret = require('../config/jwt-secret');
const errorRef = require('../helpers/errorRef');

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(400).json({
      message: 'No credentials provided.',
    });

    jwt.verify(req.headers.authorization, secret, (error, decoded) => {
      if (error) return res.status(401).json({
        message: "Invalid Credentials",
      });

      req.department = decoded.department;

      next();
    })
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
}

module.exports = auth;
