const get = require('./get');
const post = require('./post');
const patch = require('./patch');
let { router } = require('../../utils');

router = router(['stores']);

// Get stores
router.get('/', get.stores);
// Get store by id
router.get('/:id', get.store);
// Create new store
router.post('/', post.store);
// Patch store
router.patch('/:id', patch.store);

module.exports = router;
