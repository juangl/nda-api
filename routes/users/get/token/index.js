const { compose } = require('compose-middleware');
const authorize = require('../../../../middlewares/authorize');

const handler = async (req, res) => {
  res.respond(true);
};

module.exports = compose([authorize, handler]);
