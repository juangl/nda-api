const { camelCase } = require('change-case');
const { compose } = require('compose-middleware');
const {
  db: {
    utils: { delete: del },
  },
} = require('../../../utils');
const {
  authorize,
  grantAccess,
  setPermissions,
  realEntityMapper,
  entityIdParamValidator,
} = require('../../../middlewares');

const prepareSetPermissions = (req, res, next) => {
  setPermissions([req.params.entityType])(req, res, () => {
    req.params.entityType = camelCase(req.params.entityType);
    next();
  });
};

const handler = async (req, res) => {
  try {
    const entityId = req.params.entityId;
    const entityType = req.params.entityType;
    const result = await del(entityType, entityId);
    res.respond(result);
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([
  entityIdParamValidator(),
  prepareSetPermissions,
  authorize,
  grantAccess,
  realEntityMapper,
  handler,
]);
