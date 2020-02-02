const {
  db: {
    utils: { ensureExistance },
  },
} = require('../../utils');
const { secureGet } = require('./helpers');

module.exports = (entityType, idLocation, ownerIdLocation) => (
  req,
  res,
  next,
) => {
  try {
    let id;
    let ownerId;
    if (idLocation) {
      const securedGot = secureGet(req, idLocation);
      if (!secureGot)
        throw new Error('Could not find the id from the specified id location');
      id = securedGot;
    } else {
      if (req.params.id) {
        id = req.params.id;
      } else {
        throw new Error(
          'This request route does not implement an :id params, provide an id location to the middleware creator function',
        );
      }
    }
    //
    if (ownerIdLocation) {
      const securedGot = secureGet(req, ownerIdLocation);
      if (!secureGot)
        throw new Error(
          'Could not find the id from the specified owner id location',
        );
      ownerId = securedGot;
    } else {
      if (req.locals.user.id) {
        ownerId = req.locals.user.id;
      } else {
        throw new Error(
          'This request route does not have an userId, this might happen because you are not using the authorize middleware',
        );
      }
    }

    const tableName =
      entityType ||
      (req.locals.entityTypes.length && req.locals.entityTypes[0]);

    if (!tableName)
      throw new Error(`There isn't any provided entityType to the router`);

    if (ensureExistance(tableName, { id, userId: ownerId })) {
      next();
    } else {
      throw new Error('The requester does not own the entity');
    }
  } catch (e) {
    res.respond(e);
  }
};
