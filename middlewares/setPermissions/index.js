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
    case 'PATCH':
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

module.exports = entityTypes => (req, res, next) => {
  if (!Array.isArray(entityTypes))
    throw new Error(
      'You have to provide an array of sufixes to create a grantable access router',
    );
  const prefix = getPrefix(req.method);
  req.locals.endpoint = req.locals.endpoint || {};
  req.locals.endpoint.requiredPermissions = entityTypes.map(sufix =>
    getPermission(prefix, sufix),
  );
  next();
};
