const debug = require('debug')('patchStore');
const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const {
  db,
  general: { respond },
} = require('../../../../utils');

const handler = async (req, res) => {
  const storeId = req.params.id;
  const verification = await db.store.verifyProperty(
    storeId,
    req.locals.user.id,
  ); //TODO: verify the property of the store.
  const patch = sanitizer('store', req.body);
  const fields = Object.keys(patch);
  if (!fields.length) {
    res.status(422);
    return respond(new Error('invalid patch'), res);
  }
  respond(await db.patch('stores', storeId, patch), res, error => {
    if (error) {
      debug(`Store with id ${storeId} has failed by being patched`);
    } else {
      debug(`Store with id ${storeId} was succesfully patched`);
    }
  });
};

module.exports = compose([authorize, grantAccess, handler]);
