const get = require('./get');
const post = require('./post');
const patch = require('./patch');
const products = require('../products');
let { router } = require('../../utils');
const { persistParams } = require('../../middlewares');

router = router(['stores']);

// Get stores
router.get('/', get.stores);
// Create new store
router.post('/', post.store);
// Get store by id
router.get('/:id', get.store);
// Patch store
router.patch('/:id', patch.store);
// Products router
router.use('/:id/products', persistParams, products);

router.addErrorHandlerMiddleware();

module.exports = router;
