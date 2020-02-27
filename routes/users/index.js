const get = require('./get');
const post = require('./post');
const patch = require('./patch');
let router = require('../../utils/router');

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

router.addErrorHandlerMiddleware();

module.exports = router;
