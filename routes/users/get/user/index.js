const { compose } = require('compose-middleware');
const { authorize } = require('../../../../middlewares');
const { db } = require('../../../../utils');

const handler = async (req, res) => {
  res.respond(await db.namespaces.users.getUser(req.locals.user.id));
};

module.exports = compose([authorize, handler]);
