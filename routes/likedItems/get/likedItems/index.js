const { compose } = require('compose-middleware');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');

const handler = async (req, res) => {
  const userId = req.locals.user.id;
  res.respond(await namespaces.likedItems.getLiked(userId));
};

module.exports = compose([authorize, grantAccess, handler]);
