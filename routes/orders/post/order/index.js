const { compose } = require('compose-middleware');
const {
  authorize,
  grantAccess,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');
const { db, shapes } = require('../../../../utils');

const sanitizer = createSanitizer(shapes.order);

const handler = async (req, res) => {
  try {
    const newOrder = {
      ...req.body,
      userId: req.locals.user.id,
    };
    res.respond(await db.namespaces.orders.createOrder(newOrder));
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
