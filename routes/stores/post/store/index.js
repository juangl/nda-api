const debug = require('debug')('postStore');
const { compose } = require('compose-middleware');
const shapes = require('../../../../utils/shapes');
const dbUtils = require('../../../../utils/db/utils');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createSanitizer = require('../../../../middlewares/sanitizer');

const sanitizer = createSanitizer(shapes.store, {
  secured: true,
  required: true,
});

const handler = async (req, res, next) => {
  try {
    const ownerId = req.locals.user.id;
    debug(`A new store is being made for the user with id ${ownerId}`);
    req.body.ownerId = ownerId;
    res.respond(await dbUtils.insert('stores', req.body), error => {
      if (error) {
        debug(`User with id ${ownerId} has failed by creating a new store`);
      } else {
        debug(`User with id ${ownerId} has created a new store`);
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
