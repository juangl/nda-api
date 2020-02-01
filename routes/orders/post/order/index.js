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

const handler = (req, res) => {
  db.namespaces.orders.createrOrder;
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
