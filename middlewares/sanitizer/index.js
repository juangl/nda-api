const debug = require('debug')('sanitizer');

module.exports = (shape, config = {}) => (req, res, next) => {
  const { required, secured } = config;
  const data = req.body;
  debug('Request body to sanitize', data);
  let sanitized = {};
  for (each in data) {
    if (each in shape) {
      if (
        secured &&
        typeof shape[each] === 'object' &&
        shape[each].secured &&
        shape[each].type &&
        typeof data[each] === shape[each].type
      ) {
        sanitized[each] = data[each];
        continue;
      }
      if (typeof data[each] === shape[each]) sanitized[each] = data[each];
    }
  }
  if (required) {
    for (each in shape) {
      if (!(each in sanitized)) {
        return res.respond(new Error('Invalid request body'));
      }
    }
  }
  debug('Request body sanitized', sanitized);
  req.body = sanitized;
  next();
};
