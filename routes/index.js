const router = require('express').Router();
const users = require('./users');
const orders = require('./orders');
const stores = require('./stores');
const products = require('./products');
const rate = require('./generic/rate');
const del = require('./generic/delete');
const likedItems = require('./likedItems');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => {
  res.respond({
    greeting: 'Welcome to domi-app api!',
    version: '1.0',
  });
});

router.use('/liked_items', likedItems);

router.delete('/:entityType/:entityId', del);
router.post('/:entityType/:entityId/rate', rate);

router.use('/users', users);
router.use('/orders', orders);
router.use('/stores', stores);
router.use('/products', products);

router.use(errorHandler);

module.exports = router;
