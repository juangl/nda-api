const debug = require('debug')('patchStore');
const { compose } = require('compose-middleware');
const shapes = require('../../../../utils/shapes');
const dbUtils = require('../../../../utils/db/utils');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createSanitizer = require('../../../../middlewares/sanitizer');
const createVerifyProperty = require('../../../../middlewares/verifyProperty');

const verifyProperty = createVerifyProperty();

const sanitizer = createSanitizer(shapes.store, { secured: true });

const handler = async (req, res, next) => {
  try {
    const storeId = req.params.id;
    if (!Object.keys(req.body).length) {
      res.status(422);
      return res.respond(new Error('Invalid patch'), res);
    }
    res.respond(await dbUtils.patch('stores', storeId, req.body), error => {
      if (error) {
        debug(`Store with id ${storeId} has failed by being patched`);
      } else {
        debug(`Store with id ${storeId} was succesfully patched`);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = compose([
  authorize,
  grantAccess,
  verifyProperty,
  sanitizer,
  handler,
]);
