const debug = require('debug')('patchStore');
const { compose } = require('compose-middleware');
const {
  authorize,
  grantAccess,
  sanitizer: createSanitizer,
  verifyProperty: createVerifyProperty,
} = require('../../../../middlewares');
const { db, shapes } = require('../../../../utils');

const verifyProperty = createVerifyProperty();

const sanitizer = createSanitizer(shapes.store, { secured: true });

const handler = async (req, res) => {
  const storeId = req.params.id;
  if (!Object.keys(req.body).length) {
    res.status(422);
    return res.respond(new Error('Invalid patch'), res);
  }
  res.respond(await db.utils.patch('stores', storeId, req.body), error => {
    if (error) {
      debug(`Store with id ${storeId} has failed by being patched`);
    } else {
      debug(`Store with id ${storeId} was succesfully patched`);
    }
  });
};

module.exports = compose([
  authorize,
  grantAccess,
  verifyProperty,
  sanitizer,
  handler,
]);
