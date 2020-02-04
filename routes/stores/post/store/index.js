const debug = require('debug')('postStore');
const { compose } = require('compose-middleware');
const { db, shapes } = require('../../../../utils');
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
  debug(`A new store is being made for the user with id ${ownerId}`);
  req.body.ownerId = ownerId;
  res.respond(await db.utils.insert('stores', req.body), error => {
    if (error) {
      debug(`User with id ${ownerId} has failed by creating a new store`);
    } else {
      debug(`User with id ${ownerId} has created a new store`);
    }
  });
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
