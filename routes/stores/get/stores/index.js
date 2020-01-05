const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const {
  db,
  general: { respond },
} = require('../../../../utils');

const handler = async (req, res) => {
  try {
    const category = req.query.category;
    respond(await db.store.getStores(category), res);
  } catch (e) {
    respond(e, res);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
