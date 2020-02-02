const bcrypt = require('bcrypt');
const debug = require('debug')('signUp');
const {
  db,
  general: { validateInsertion },
} = require('../../../../utils');

module.exports = async (req, res) => {
  try {
    debug('Registering an user');
    const type = req.query.type;
    let user = req.body;
    let realPassword = user.password;
    user.password = await bcrypt.hash(user.password, 10);
    user.roleId = await db.namespaces.users.getRoleId(type);
    // if (validateInsertion(await db.namespaces.users.register(user))) {
    if (validateInsertion(await db.utils.insert('users', user))) {
      res.respond(await db.namespaces.users.login(user.email, realPassword));
    } else {
      res.respond(
        new Error(`There was an error while trying to register you`),
        () =>
          debug(
            `There was an error while trying to register the client with email ${user.email}`,
          ),
      );
    }
  } catch (e) {
    respond(e);
  }
};
