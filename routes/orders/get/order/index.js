const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const {
  db,
  general: { respond },
} = require('../../../../utils');

const handler = async (req, res) => {
  respond(await db.namespaces.orders.getOrder(req.params.id), res);
};

module.exports = compose([authorize, grantAccess, handler]);
