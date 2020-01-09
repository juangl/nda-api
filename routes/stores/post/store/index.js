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
  try {
    const ownerId = req.locals.user.id;
    debug(`A new store is being made for the user with id ${ownerId}`);
    req.body.ownerId = ownerId;
    respond(await db.utils.insert('stores', req.body), res, error => {
      if (error) {
        debug(`User with id ${ownerId} has failed by creating a new store`);
      } else {
        debug(`User with id ${ownerId} has created a new store`);
      }
    });
  } catch (e) {
    respond(e, res);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
