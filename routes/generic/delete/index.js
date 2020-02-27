const { camelCase } = require('change-case');
const { compose } = require('compose-middleware');
const { delete: del } = require('../../../utils/db/utils');
const authorize = require('../../../middlewares/authorize');
const grantAccess = require('../../../middlewares/grantAccess');
const setPermissions = require('../../../middlewares/setPermissions');
const realEntityMapper = require('../../../middlewares/realEntityMapper');
const entityIdParamValidator = require('../../../middlewares/entityIdParamValidator');

const prepareSetPermissions = (req, res, next) => {
  setPermissions([req.params.entityType])(req, res, () => {
    req.params.entityType = camelCase(req.params.entityType);
    next();
  });
};

const handler = async (req, res) => {
  const entityId = req.params.entityId;
  const entityType = req.params.entityType;
  const result = await del(entityType, entityId);
  res.respond(result);
};

module.exports = compose([
  entityIdParamValidator(),
  prepareSetPermissions,
  authorize,
  grantAccess,
  realEntityMapper,
  handler,
]);
