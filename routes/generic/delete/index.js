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
} = require('../../../middlewares');

const prepareSetPermissions = (req, res, next) => {
  req.params.entityType = camelCase(req.params.entityType);
  setPermissions(req.params.entityType)(req, res, next);
};

const handler = (req, res) => {
  try {
    const entityId = req.params.entityId;
    const entityType = req.params.entityType;
    const result = await del(entityType, entityId);
    // respond(result, res, err => {
    //   console.log(err);
    // });
  } catch (e) {

  }
};

module.exports = compose([
  prepareSetPermissions,
  authorize,
  grantAccess,
  handler,
]);
