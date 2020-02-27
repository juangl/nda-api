const { compose } = require('compose-middleware');
const debug = require('debug')('getStoreProducts');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const setPagination = require('../../../../middlewares/setPagination');

const handler = async (req, res, next) => {
  try {
    const storeId = req.persistedParams.id; // NOTE: Set in persistParams middleware
    const userId = req.locals.user.id;
    res.respond(
      await namespaces.stores.getStoreProducts(storeId, userId, req.pagination),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, setPagination, handler]);
