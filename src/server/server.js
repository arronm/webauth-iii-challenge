const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const PORT = process.env.PORT || 4444;

const auth = require('./routers/auth');
const users = require('./routers/users');

const middleware = [
  helmet(),
  cors(),
  express.json(),
];

const server = express();
server.use(middleware);

server.get('/', (req, res) => {
  res.json({
    message: 'API is working',
  });
});

server.use('/api/auth', auth);
server.use('/api/users', users);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
