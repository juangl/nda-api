const debug = require('debug')('signIn');
const { db } = require('../../../../utils');

module.exports = async (req, res) => {
  const user = req.body;
  debug(`User with email ${user.email} is signing in`);
  res.respond(
    await db.namespaces.users.login(user.email, user.password),
    err => {
      if (err) return debug(`Sign in failed with email ${user.email}`);
      debug(`User with email ${user.email} has successfuly signed in`);
    },
  );
};
