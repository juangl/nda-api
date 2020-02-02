const get = require('./get');
const post = require('./post');
let { router } = require('../../utils');

router = router(['orders']);

// Create order
router.post('/', post.order);
// Get orders
// router.get('/', get.orders);
// Get order info
router.get('/:id', get.order);

module.exports = router;
