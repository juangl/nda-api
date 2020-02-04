const debug = require('debug')('patchStore');
const { compose } = require('compose-middleware');
const {
  authorize,
  sanitizer: createSanitizer,
  grantAccess,
} = require('../../../../middlewares');
const { db, shapes } = require('../../../../utils');

const sanitizer = createSanitizer(shapes.store, { secured: true });

const handler = async (req, res) => {
  const storeId = req.params.id;
  if (
    !(await db.namespaces.stores.verifyProperty(storeId, req.locals.user.id))
  ) {
    res.respond(new Error(`You can't edit a store which is not of your own`));
  }
  if (!Object.keys(req.body).length) {
    res.status(422);
    return respond(new Error('Invalid patch'), res);
  }
  res.respond(await db.utils.patch('stores', storeId, req.body), error => {
    if (error) {
      debug(`Store with id ${storeId} has failed by being patched`);
    } else {
      debug(`Store with id ${storeId} was succesfully patched`);
    }
  });
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
