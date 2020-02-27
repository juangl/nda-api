const { compose } = require('compose-middleware');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createVerifyProperty = require('../../../../middlewares/verifyProperty');

const verifyProperty = createVerifyProperty();

const handler = async (req, res) => {
  res.respond(await namespaces.orders.getOrder(req.params.id));
};

module.exports = compose([authorize, grantAccess, verifyProperty, handler]);
