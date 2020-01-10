const { camelCase } = require('change-case');
const { compose } = require('compose-middleware');
const {
  db: {
    utils: { delete: del },
  },
  general: { respond },
} = require('../../../utils');
const {
  authorize,
  grantAccess,
  setPermissions,
  realEntityMapper,
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
    respond(result, res);
  } catch (e) {
    respond(e, res);
  }
};

module.exports = compose([
  prepareSetPermissions,
  authorize,
  grantAccess,
  realEntityMapper,
  handler,
]);
