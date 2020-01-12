const {
  general: { respond },
} = require('../../utils');
module.exports = (entityIdField = 'entityId') => (req, res, next) => {
  if (!parseInt(req.params[entityIdField]))
    return respond(new Error('You must provide an email'), res);
  next();
};
