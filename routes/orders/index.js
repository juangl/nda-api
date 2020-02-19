const get = require('./get');
const patch = require('./patch');
const post = require('./post');
let { router } = require('../../utils');

router = router(['orders']);

// Create order
router.post('/', post.order);
// Get orders
router.get('/', get.orders);
// Get order info
router.get('/:id', get.order);
// Set order status
router.patch('/:id/:orderStatus', patch.orderStatus);

module.exports = router;
