const bcrypt = require('bcrypt');
const debug = require('debug')('signUp');
const dbUtils = require('../../../../utils/db/utils');
const namespaces = require('../../../../utils/db/namespaces');
const validateInsertion = require('../../../../utils/general/validateInsertion');

module.exports = async (req, res) => {
  debug('Registering an user');
  const type = req.query.type;
  let user = req.body;
  let realPassword = user.password;
  user.password = await bcrypt.hash(user.password, 10);
  user.roleId = await namespaces.users.getRoleId(type);
  // if (validateInsertion(await db.namespaces.users.register(user))) {
  if (validateInsertion(await dbUtils.insert('users', user))) {
    res.respond(await namespaces.users.login(user.email, realPassword));
  } else {
    res.respond(
      new Error(`There was an error while trying to register you`),
      () =>
        debug(
          `There was an error while trying to register the client with email ${user.email}`,
        ),
    );
  }
};
