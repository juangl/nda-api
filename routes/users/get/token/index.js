const { compose } = require('compose-middleware');
const authorize = require('../../../../middlewares/authorize');

const handler = async (req, res, next) => {
  try {
    res.respond(true);
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, handler]);
