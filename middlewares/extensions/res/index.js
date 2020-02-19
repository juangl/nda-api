const { compose } = require('compose-middleware');
const {
  general: { respond },
} = require('../../../utils');

module.exports = compose([
  (req, res, next) => {
    res.respond = respond;
    next();
  },
]);
