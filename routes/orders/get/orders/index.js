const { compose } = require('compose-middleware');
const namespaces= require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');

const handler = async (req, res) => {
  res.respond(await namespaces.orders.getOrders(req.locals.user.id));
};

module.exports = compose([authorize, grantAccess, handler]);
