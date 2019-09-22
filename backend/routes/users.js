const router = require('express').Router();
const bcrypt = require('bcrypt');
const debug = require('debug')('route');
const dbClient = require('../utils/dbClient');
const { authorize } = require('../utils/middlewares');

router.get('/', authorize, async (req, res) => {
  res.json(await dbClient.user.getUser(res.locals.user.id));
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