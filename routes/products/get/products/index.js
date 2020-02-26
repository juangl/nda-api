const { compose } = require('compose-middleware');
const debug = require('debug')('getStoreProducts');
const { db } = require('../../../../utils');
const {
  authorize,
  grantAccess,
  setPagination,
} = require('../../../../middlewares');

const handler = async (req, res) => {
  const storeId = req.persistedParams.id; // NOTE: Set in persistParams middleware
  const userId = req.locals.user.id;
  res.respond(
    await db.namespaces.stores.getStoreProducts(
      storeId,
      userId,
      req.pagination,
    ),
  );
};

module.exports = compose([authorize, grantAccess, setPagination, handler]);
