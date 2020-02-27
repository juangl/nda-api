const { compose } = require('compose-middleware');
const shapes = require('../../../../utils/shapes');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createSanitizer = require('../../../../middlewares/sanitizer');

const sanitizer = createSanitizer(shapes.order);

const handler = async (req, res, next) => {
  try {
    const newOrder = {
      ...req.body,
      userId: req.locals.user.id,
    };
    res.respond(await namespaces.orders.createOrder(newOrder));
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
