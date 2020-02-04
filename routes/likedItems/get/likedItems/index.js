const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  const userId = req.locals.user.id;
  res.respond(await db.namespaces.likedItems.getLiked(userId));
};

module.exports = compose([authorize, grantAccess, handler]);
