const debug = require('debug')('postLikedItem');
const { compose } = require('compose-middleware');
const shapes = require('../../../../utils/shapes');
const dbUtils = require('../../../../utils/db/utils');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createSanitizer = require('../../../../middlewares/sanitizer');

const sanitizer = createSanitizer(shapes.likedItem, true);

const handler = async (req, res, next) => {
  try {
    const userId = req.locals.user.id;
    const entityType = req.body.type;
    debug(
      `User with id ${userId} is adding a new ${entityType} to its liked items`,
    );
    req.body.userId = userId;
    res.respond(await dbUtils.insert('likedItems', req.body), error => {
      if (error) {
        debug(
          `User with id ${userId} has failed by adding a new item to its liked items`,
        );
      } else {
        debug(
          `User with id ${userId} has liked a ${entityType} with id ${req.body.id}`,
        );
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
