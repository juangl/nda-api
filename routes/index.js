const router = require('express').Router();
const users = require('./users');
const stores = require('./stores');

router.get('/', (req, res) => {
  res.json({
    greeting: 'Welcome to domi-app api!',
    version: '1.0',
  });
});

router.use('/users', users);

router.use('/stores', stores);

module.exports = router;
