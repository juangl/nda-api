const { compose } = require('compose-middleware');
const { authorize } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  try {
    res.respond(await db.namespaces.users.getUser(req.locals.user.id));
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, handler]);
