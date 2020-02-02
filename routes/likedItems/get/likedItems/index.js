const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  try {
    const userId = req.locals.user.id;
    res.respond(await db.namespaces.likedItems.getLiked(userId));
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
