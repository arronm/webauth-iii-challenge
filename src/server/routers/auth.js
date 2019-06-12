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
}), async (req, res) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    const saved = await db.add({
      ...user,
      password: hash,
    });
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json(errorRef(error))
  }
});

router.post('/login', async(req, res) => {
  try {
    let { username, password } = req.body;
    const user = await db.findBy({ username }).first();

    if (!(user && bcrypt.compareSync(password, user.password))) return res.status(401).json({
      message: 'Invalid Credentials',
    });

    const token = generateToken(user);

    res.json({
      message: `Welcome ${user.username}`,
      token,
    });
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// router.delete('/logout', (req, res) => {
//   if (req.session && req.session.username) {
//     req.session.destroy();
//   }
//   res.json({
//     message: 'You have been logged out.',
//   });
// });

module.exports = router;
