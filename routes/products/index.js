const post = require('./post');
let { router } = require('../../utils');

router = router(['products']);

// Create product
router.post('/', post.product);

module.exports = router;
