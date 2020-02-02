const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  try {
    const category = req.query.category;
    res.respond(await db.namespaces.stores.getStores(category));
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
