const jwt = require('jsonwebtoken');
const dbClient = require('./dbClient');
const debug = require('debug')('middleware');
const { respond } = require('./general');

module.exports = {
  authorize: async (req, res, next) => {
    req.locals.user = {};
    res.status(401);
    let token = req.headers.authorization;
    if (token) {
      token = token.replace('Bearer ', '');
      try {
        res.status(200);
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY).userId;
        req.locals.user.id = userId;
        req.locals.user.permissions = await dbClient.user.getPermissions(
          userId,
        );
        debug(
          `[authorize] User with id ${req.locals.user.id} was successfuly authorized`,
        );
        next();
      } catch (e) {
        respond(e, res, () => {
          debug(
            `[authorize] There was an error while trying to verify an user`,
          );
        });
      }
    } else {
      respond(new Error('you must provide a jwt'), res, () => {
        debug(`[authorize] User tried to request without any token`);
      });
    }
  },
  grantAccess: (req, res, next) => {
    const userId = req.locals.user.id;
    const userPermissions = req.locals.user.permissions;
    const requiredPermissions = req.locals.endpoint.requiredPermissions;
    for (let i = 0; i < requiredPermissions.length; i++) {
      const currentRequiredPermission = requiredPermissions[i];
      if (userPermissions.indexOf(currentRequiredPermission) === -1) {
        res.status(403);
        return respond(
          new Error('you do not have enough permissions'),
          res,
          () => {
            debug(
              `[grantAccess] User with id ${userId} didn't have enough permissions to access this route`,
            );
          },
        );
      }
    }
    next();
  },
};
