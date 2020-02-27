const debug = require('debug')('createProduct');
const { compose } = require('compose-middleware');
const shapes = require('../../../../utils/shapes');
const dbUtils = require('../../../../utils/db/utils');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createSanitizer = require('../../../../middlewares/sanitizer');

const sanitizer = createSanitizer(shapes.product);

const handler = async (req, res, next) => {
  try {
    const storeId = req.persistedParams.id; // NOTE: Set in persistParams middleware
    const newStore = req.body;
    newStore.storeId = storeId;
    res.respond(await dbUtils.insert('products', newStore));
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
