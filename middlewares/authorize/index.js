const jwt = require('jsonwebtoken');
const debug = require('debug')('authorize');
const namespaces = require('../../utils/db/namespaces');

module.exports = async (req, res, next) => {
  req.locals.user = {};
  res.status(401);
  let token = req.headers.authorization;
  if (token) {
    token = token.replace('Bearer ', '');
    try {
      res.status(200);
      const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
      req.locals.user = await namespaces.users.getUser(userId);
      req.locals.user.permissions = await namespaces.users.getPermissions(
        userId,
      );
      debug(
        `[authorize] User with id ${req.locals.user.id} was successfuly authorized`,
      );
      next();
    } catch (e) {
      res.respond(e, () => {
        debug(`[authorize] There was an error while trying to verify an user`);
      });
    }
  } else {
    res.respond(new Error('you must provide a jwt'), () => {
      debug(`[authorize] User tried to request without any token`);
    });
  }
};
