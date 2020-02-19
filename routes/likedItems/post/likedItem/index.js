const debug = require('debug')('postLikedItem');
const { compose } = require('compose-middleware');
const { db, shapes } = require('../../../../utils');
const {
  authorize,
  grantAccess,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');
const sanitizer = createSanitizer(shapes.likedItem, true);

const handler = async (req, res) => {
  const userId = req.locals.user.id;
  const entityType = req.body.type;
  debug(
    `User with id ${userId} is adding a new ${entityType} to its liked items`,
  );
  req.body.userId = userId;
  res.respond(await db.utils.insert('likedItems', req.body), error => {
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
};

module.exports = compose([authorize, grantAccess, sanitizer, handler]);
