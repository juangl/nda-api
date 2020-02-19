module.exports = (entityIdField = 'entityId') => (req, res, next) => {
  if (!parseInt(req.params[entityIdField]))
    return res.respond(new Error('You must provide an email'));
  next();
};
