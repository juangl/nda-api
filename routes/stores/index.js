const get = require('./get');
const post = require('./post');
const patch = require('./patch');
let router = require('../../utils/router');
const productsStoreRouter = require('../products/storeRouter');
const persistParams = require('../../middlewares/persistParams');

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
router.use('/:id/products', persistParams, productsStoreRouter);

router.addErrorHandlerMiddleware();

module.exports = router;
