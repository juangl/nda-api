let router = require('../../utils/router');
router = router(['liked_stores', 'liked_products']);
const get = require('./get');
const post = require('./post');

// Get liked items
router.get('/', get.likedItems);
// Post new liked item
router.post('/', post.likedItem);
module.exports = router;
