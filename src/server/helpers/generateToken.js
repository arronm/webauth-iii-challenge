const jwt = require('jsonwebtoken');

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '8h',
  };

  const secret = 'purple unicorn rainbow farts';

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
