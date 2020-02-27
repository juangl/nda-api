const { compose } = require('compose-middleware');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');

const handler = async (req, res) => {
  res.respond(await db.namespaces.users.getUser(req.locals.user.id));
};

module.exports = compose([authorize, handler]);
