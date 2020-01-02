const getPrefix = method => {
  let prefix = null;
  switch (method) {
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
  return prefix;
};

const getPermission = (prefix, sufix) => `${prefix}_${sufix}`;

module.exports = sufixes => {
  if (!Array.isArray(sufixes))
    throw new Error(
      'You have to provide an array of sufixes to create a grantable access router',
    );
  const router = require('express').Router();
  router.use('/', (req, res, next) => {
    const prefix = getPrefix(req.method);
    req.locals.endpoint = req.locals.endpoint || {};
    req.locals.endpoint.requiredPermissions = sufixes.map(sufix =>
      getPermission(prefix, sufix),
    );
    next();
  });
  return router;
};
