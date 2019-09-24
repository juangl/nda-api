const router = require('../utils/router')('users');
const bcrypt = require('bcrypt');
const debug = require('debug')('users');
const dbClient = require('../utils/dbClient');
const { authorize, grantAccess } = require('../utils/middlewares');
const userSanitizer = require('../utils/sanitizers').user;

router.get('/', authorize, async (req, res) => {
  res.json(await dbClient.user.getUser(res.locals.user.id));
});

router.patch('/', authorize, async (req, res) => {
  const patch = userSanitizer(req.body);
  const fields = Object.keys(patch);
  if (!fields.length) return res.status(422).json({
    success: false,
    payload: {
      message: 'invalid patch'
    }
  });
  const patching = await dbClient.patch('users', res.locals.user.id, patch);
  if (patching){
    debug('The user was patched successfuly');
    res.json({
      success: true,
    });
  } else {
    debug('Error while patching the user');
    res.json({
      success: false,
      payload: {
        message: 'there was an error while trying to update the resource'
      }
    })
  }
});

router.post('/signup', async (req, res) => {
  debug('Registering an user');
  const type = req.query.type;
  let user = req.body;
  user._password = user.password;
  user.password = await bcrypt.hash(user.password, 10);
  user.roleId = await dbClient.user.getRoleId(type);
  const response = await dbClient.user.register(user);
  if (!response){
    return res.json({
      success: false,
      payload: {
        message: 'Something went wrong while your registration'
      }
    })
  }
  res.json(await dbClient.user.login(user.email, user._password));
});

router.post('/signin', async (req, res) => {
  debug('An user is signing in');
  const user = req.body;
  res.json(await dbClient.user.login(user.email, user.password));
});

router.put('/', (req, res) => {

});

// router.delete('/', (req, res) => {

// });

module.exports = router;