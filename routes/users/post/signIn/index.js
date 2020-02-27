const debug = require('debug')('signIn');
const namespaces = require('../../../../utils/db/namespaces');

module.exports = async (req, res, next) => {
  try {
    const user = req.body;
    debug(`User with email ${user.email} is signing in`);
    res.respond(
      await namespaces.users.login(user.email, user.password),
      err => {
        if (err) return debug(`Sign in failed with email ${user.email}`);
        debug(`User with email ${user.email} has successfuly signed in`);
      },
    );
  } catch (err) {
    next(err);
  }
};
