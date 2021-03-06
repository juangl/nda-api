const { compose } = require('compose-middleware');
const {
  authorize,
  grantAccess,
  setPermissions,
  entityIdParamValidator,
} = require('../../../middlewares');
const { db } = require('../../../utils');

// NOTE: This is a repeated code
const prepareSetPermissions = (req, res, next) => {
  ///////////////////////////////////
  // entityType possible options   //
  //-------------------------------//
  // products => product_ratings   //
  // stores => store_ratings       //
  ///////////////////////////////////
  let entityType = req.params.entityType;
  entityType = entityType.substring(0, entityType.length - 1);
  req.locals.endpoint = req.locals.endpoint || {};
  req.locals.endpoint.entityType = entityType;
  setPermissions([`${entityType}_ratings`])(req, res, next);
};

const handler = async (req, res) => {
  const { stars } = req.query;
  const { entityType } = req.locals.endpoint;
  const userId = parseInt(req.locals.user.id);
  const entityId = parseInt(req.params.entityId);
  const payload = {
    entityId,
    entityType,
    userId,
    stars: parseInt(stars),
  };
  if (
    !(await db.utils.ensureExistance(
      'ratings',
      {
        entityId,
        entityType,
      },
      '0',
    ))
  )
    throw new Error(`You already rated this ${entityType}`);
  res.respond(await db.utils.insert('ratings', payload));
};

module.exports = compose([
  entityIdParamValidator(),
  prepareSetPermissions,
  authorize,
  grantAccess,
  handler,
]);
