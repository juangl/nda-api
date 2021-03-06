let { router } = require('../../utils');
const get = require('./get');
const patch = require('./patch');
const post = require('./post');

router = router(['users']);

// Get user data
router.get('/', get.user);
// Patch user
router.patch('/', patch.user);
// Signup
router.post('/signup', post.signUp);
// Signin
router.post('/signin', post.signIn);
// Validate token
router.get('/validate_token', get.validateToken);

module.exports = router;
