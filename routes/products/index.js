const get = require('./get');
const post = require('./post');
let { router } = require('../../utils');

router = router(['products']);

// Create product
router.post('/', post.product);
// Get products
router.get('/', get.products);


module.exports = router;
