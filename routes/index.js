const debugCreator = require('debug');
const router = require('express').Router();
const users = require('./users');
const orders = require('./orders');
const stores = require('./stores');
const likedItems = require('./likedItems');
const { delete: del, rate } = require('./generic');
const { errorHandler } = require('../middlewares');

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

router.use(errorHandler);

module.exports = router;
