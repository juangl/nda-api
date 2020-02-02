const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  try {
    res.respond(await db.namespaces.orders.getOrders(req.locals.user.id));
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
