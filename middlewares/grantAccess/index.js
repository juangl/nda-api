const debug = require('debug')('grantAccess');
const {
  general: { respond },
} = require('../../utils');

module.exports = (req, res, next) => {
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
};
