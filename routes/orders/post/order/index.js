const { compose } = require('compose-middleware');
const {
  authorize,
  grantAccess,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');
const {
  db,
  shapes,
  general: { respond },
} = require('../../../../utils');

const sanitizer = createSanitizer(shapes.order);

const handler = async (req, res) => {
  const newOrder = {
    ...req.body,
    userId: req.locals.user.id,
  };
  respond(await db.namespaces.orders.createOrder(newOrder), res);
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
