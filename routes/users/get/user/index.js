const { compose } = require('compose-middleware');
const { authorize } = require('../../../../middlewares');
const {
  db,
  general: { respond },
} = require('../../../../utils');

const handler = async (req, res) => {
  try {
    respond(await db.namespaces.users.getUser(req.locals.user.id), res);
  } catch (e) {
    respond(e, res);
  }
};

module.exports = compose([authorize, handler]);
