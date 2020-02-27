const { compose } = require('compose-middleware');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');

const handler = async (req, res, next) => {
  try {
    const userId = req.locals.user.id;
    res.respond(await namespaces.likedItems.getLiked(userId));
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
