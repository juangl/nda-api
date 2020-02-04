const debug = require('debug')('createProduct');
const { compose } = require('compose-middleware');
const { db, shapes } = require('../../../../utils');
const {
  authorize,
  grantAccess,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');

const sanitizer = createSanitizer(shapes.product);

const handler = async (req, res) => {
  const storeId = req.persistedParams.id; // NOTE: Set in persistParams middleware
  const newStore = req.body;
  newStore.storeId = storeId;
  res.respond(await db.utils.insert('products', newStore));
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
