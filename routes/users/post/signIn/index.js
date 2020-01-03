const debug = require('debug')('signIn');
const { db } = require('../../../../utils');

module.exports = async (req, res) => {
  debug('An user is signing in');
  const user = req.body;
  res.json(await db.user.login(user.email, user.password));
};
