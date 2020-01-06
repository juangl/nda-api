const bcrypt = require('bcrypt');
const debug = require('debug')('signUp');
const {
  db,
  general: { respond },
} = require('../../../../utils');

module.exports = async (req, res) => {
  try {
    debug('Registering an user');
    const type = req.query.type;
    let user = req.body;
    user._password = user.password;
    user.password = await bcrypt.hash(user.password, 10);
    user.roleId = await db.namespaces.users.getRoleId(type);
    const response = await db.namespaces.users.register(user);
    if (!response) {
      return res.json({
        success: false,
        payload: {
          message: 'Something went wrong while your registration',
        },
      });
    }
    res.json(await db.namespaces.users.login(user.email, user._password));
  } catch (e) {
    respond(e, res);
  }
};
