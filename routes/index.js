const router = require('express').Router();
const users = require('./users');
const stores = require('./stores');
const likedItems = require('./likedItems');

router.get('/', (req, res) => {
  res.json({
    greeting: 'Welcome to domi-app api!',
    version: '1.0',
  });
});

router.use('/users', users);
router.use('/stores', stores);
router.use('/liked_items', likedItems);

module.exports = router;
