const { compose } = require('compose-middleware');
const debug = require('debug')('getCertainProducts');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createRequiredQueryParams = require('../../../../middlewares/requiredQueryParams');

const requiredQueryParams = createRequiredQueryParams(['list']);

const handler = async (req, res, next) => {
  try {
    res.respond(
      await namespaces.products.getProductsByList(
        req.query.list.split(','),
        req.locals.user.id,
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
  handler,
]);
