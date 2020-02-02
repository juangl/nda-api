const router = require('express').Router();
const users = require('./users');
const stores = require('./stores');
const likedItems = require('./likedItems');
const orders = require('./orders');
const { delete: del, rate } = require('./generic');

router.get('/', (req, res) => {
  res.respond({
    greeting: 'Welcome to domi-app api!',
    version: '1.0',
  });
});

router.delete('/:entityType/:entityId', del);
router.post('/:entityType/:entityId/rate', rate);

router.use('/users', users);
router.use('/stores', stores);
router.use('/liked_items', likedItems);
router.use('/orders', orders);

module.exports = router;
