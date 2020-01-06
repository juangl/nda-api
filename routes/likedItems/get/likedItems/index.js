const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const {
  db,
  general: { respond },
} = require('../../../../utils');

const handler = async (req, res) => {
  try {
    const userId = req.locals.user.id;
    respond(await db.namespaces.likedItems.getLiked(userId), res);
  } catch (e) {
    respond(e, res);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
