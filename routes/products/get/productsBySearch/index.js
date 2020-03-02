const { compose } = require('compose-middleware');
const debug = require('debug')('getStoreProductsBySearch');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const setPagination = require('../../../../middlewares/setPagination');
const createRequiredQueryParams = require('../../../../middlewares/requiredQueryParams');

const requiredQueryParams = createRequiredQueryParams(['keyword']);

const handler = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    const userId = req.locals.user.id;
    res.respond(
      await namespaces.products.getProductsBySearch(
        keyword,
        userId,
        req.pagination.sqlString,
      ),
    );
  } catch (err) {
    next(err);
  }
};

module.exports = compose([
  authorize,
  grantAccess,
  requiredQueryParams,
  setPagination,
  handler,
]);
