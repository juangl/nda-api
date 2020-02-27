const debug = require('debug')('getStore');
const { compose } = require('compose-middleware');
const authorize = require('../../../../middlewares/authorize');
const namespaces = require('../../../../utils/db/namespaces');
const grantAccess = require('../../../../middlewares/grantAccess');

const handler = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    res.respond(
      await namespaces.stores.getStore(storeId, req.locals.user.id),
      error => {
        if (error) {
          debug(`Get store with id ${storeId} has failed`);
        } else {
          debug(`Get store with id ${storeId} has been successful`);
        }
      },
    );
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
