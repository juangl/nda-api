const jwt = require('jsonwebtoken');
const dbClient = require('./dbClient');
const debug = require('debug')('middleware');

module.exports = {
  authorize: async (req, res, next) => {
    res.locals.user = {};
    res.status(401);
    let token = req.headers.authorization;
    if (token) {
      token = token.replace('Bearer ', '');
      try {
        res.status(200);
        res.locals.user.id = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY,
        ).userId;
        res.locals.user.permissions = await dbClient.user.getPermissions(
          res.locals.user.id,
        );
        next();
      } catch (e) {
        res.json({
          success: false,
          payload: {
            message: e instanceof Error ? e.message : e,
          },
        });
      }
    } else {
      res.json({
        success: false,
        payload: {
          message: 'you must provide a jwt',
        },
      });
    }
  },
  grantAccess: (req, res, next) => {
    if (
      res.locals.user.permissions.indexOf(
        res.locals.endpoint.permissionNeeded,
      ) !== -1
    ) {
      return next();
    }
    res.status(403);
    res.json({
      success: false,
      payload: {
        message: 'you do not have enough permissions',
      },
    });
  },
};
