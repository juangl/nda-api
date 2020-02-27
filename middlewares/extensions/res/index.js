const { compose } = require('compose-middleware');
const respond = require('../../../utils/general/respond');

module.exports = compose([
  (req, res, next) => {
    res.respond = respond;
    next();
  },
]);
