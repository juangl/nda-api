const { compose } = require('compose-middleware');
const {
  authorize,
  grantAccess,
  verifyProperty: createVerifyProperty,
} = require('../../../../middlewares');
const { db } = require('../../../../utils');

const verifyProperty = createVerifyProperty();

const handler = async (req, res) => {
  try {
    res.respond(await db.namespaces.orders.getOrder(req.params.id));
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, grantAccess, verifyProperty, handler]);
