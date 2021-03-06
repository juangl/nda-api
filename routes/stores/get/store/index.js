const debug = require('debug')('getStore');
const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  const storeId = req.params.id;
  res.respond(
    await db.namespaces.stores.getStore(storeId, req.locals.user.id),
    error => {
      if (error) {
        debug(`Get store with id ${storeId} has failed`);
      } else {
        debug(`Get store with id ${storeId} has been successful`);
      }
    },
  );
};

module.exports = compose([authorize, grantAccess, handler]);
