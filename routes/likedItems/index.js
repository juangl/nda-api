let router = require('../../utils/router');
router = router(['liked_stores', 'liked_products']);
const get = require('./get');
const post = require('./post');
const del = require('./delete');

// Get liked items
router.get('/', get.likedItems);
// Post new liked item
router.post('/', post.likedItem);
// Delete liked item
router.delete('/:entityId', del.likedItem);
module.exports = router;
