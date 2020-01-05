const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');
const {
  db,
  general: { respond },
} = require('../../../../utils');

const handler = async (req, res) => {
  const userId = req.locals.user.id;
  respond(await db.likedItems.getLiked(userId), res);
};

module.exports = compose([authorize, grantAccess, handler]);
