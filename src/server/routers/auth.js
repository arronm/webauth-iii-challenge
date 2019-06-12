const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../data/models');
const generateToken = require('../helpers/generateToken');
const validateBody = require('../middleware/validateBody');
const errorRef = require('../helpers/errorRef');

router.post('/register', validateBody({
  username: {
    type: 'string',
    require: true,
  },
  department: {
    type: 'string',
    require: true,
  },
  password: {
    type: 'string',
    require: true,
  },
}), (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(errorRef(error));
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a cookie`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(errorRef(error));
    });
});

router.delete('/logout', (req, res) => {
  if (req.session && req.session.username) {
    req.session.destroy();
  }
  res.json({
    message: 'You have been logged out.',
  });
});

module.exports = router;
