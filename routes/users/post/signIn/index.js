const debug = require('debug')('signIn');
const {
  db,
  general: { respond },
} = require('../../../../utils');

module.exports = async (req, res) => {
  try {
    const user = req.body;
    debug(`User with email ${user.email} is signing in`);
    respond(
      await db.namespaces.users.login(user.email, user.password),
      res,
      err => {
        if (err) return debug(`Sign in failed with email ${user.email}`);
        debug(`User with email ${user.email} has successfuly signed in`);
      },
    );
  } catch (e) {
    respond(e, res);
  }
};
