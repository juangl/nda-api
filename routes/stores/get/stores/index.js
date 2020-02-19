const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  res.respond(await db.namespaces.stores.getStores(req.query.category));
};

module.exports = compose([authorize, grantAccess, handler]);
