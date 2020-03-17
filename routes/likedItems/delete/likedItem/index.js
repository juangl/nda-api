const { camelCase } = require('change-case');
const { compose } = require('compose-middleware');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const setPermissions = require('../../../../middlewares/setPermissions');
const { delete: del, ensureExistance } = require('../../../../utils/db/utils');

const handler = async (req, res, next) => {
  try {
    const entityId = req.params.entityId;
    const exists = await ensureExistance('likedItems', {
      id: Number(entityId),
      userId: req.locals.user.id,
    });
    if (!exists) {
      throw new Error(
        'You do not own the entity you want to delete or it might have already been deleted',
      );
    }
    const result = await del('likedItems', entityId);
    res.respond(result);
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
