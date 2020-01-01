module.exports = sufix => {
  const router = require('express').Router();
  router.use('/', (req, res, next) => {
    res.locals.endpoint = res.locals.endpoint || {};
    res.locals.endpoint.permissionNeeded = (() => {
      let prefix = null;
      switch (req.method) {
        case 'GET':
          prefix = 'read';
          break;
        case 'POST':
          prefix = 'create';
          break;
        case 'PUT':
          prefix = 'update';
          break;
        case 'DELETE':
          prefix = 'delete';
          break;
        default:
          prefix = 'read';
      }
      return `${prefix}_${sufix}`;
    })();
    next();
  });
  return router;
};
