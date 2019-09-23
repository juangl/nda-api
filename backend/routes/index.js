const router = require('express').Router();
const users = require('./users');


router.get('/', (req, res) => {
  res.json({
    greeting: 'Welcome to domi-app api!',
    version: '1.0'
  });
});

router.use('/users/', users);


module.exports = router;