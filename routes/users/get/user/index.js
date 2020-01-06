const { compose } = require('compose-middleware');
const { db } = require('../../../../utils');
const { authorize } = require('../../../../middlewares');

const handler = async (req, res) => {
  res.json(await db.namespaces.users.getUser(req.locals.user.id));
};

module.exports = compose([authorize, handler]);
