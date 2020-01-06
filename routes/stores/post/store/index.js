const debug = require('debug')('postStore');
const { compose } = require('compose-middleware');
const {
  db,
  shapes,
  general: { respond },
} = require('../../../../utils');
const {
  authorize,
  grantAccess,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');

const sanitizer = createSanitizer(shapes.store, {
  secured: true,
  required: true,
});

const handler = async (req, res) => {
  const ownerId = req.locals.user.id;
  debug(`User with id ${ownerId} is creating a new store`);
  const newStore = req.body;
  newStore.ownerId = ownerId;
  respond(await db.namespaces.stores.createStore(newStore), res, error => {
    if (error) {
      debug(`User with id ${ownerId} has failed by creating a new store`);
    } else {
      debug(`User with id ${ownerId} has created a new store`);
    }
  });
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
