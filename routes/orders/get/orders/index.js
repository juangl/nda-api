const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  res.respond(await db.namespaces.orders.getOrders(req.locals.user.id));
};

module.exports = compose([authorize, grantAccess, handler]);
