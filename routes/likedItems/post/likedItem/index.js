const debug = require('debug')('postLikedItem');
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
const sanitizer = createSanitizer(shapes.likedItem, true);

const handler = async (req, res) => {
  try {
    const userId = req.locals.user.id;
    const entityType = req.body.type;
    debug(
      `User with id ${userId} is adding a new ${entityType} to its liked items`,
    );
    req.body.userId = userId;
    respond(await db.namespaces.likedItems.likeItem(req.body), res, error => {
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
  } catch (e) {
    respond(e, res);
  }
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
