/**
 * Persist params middleware.
 * @description This middleware should be used when you want to still have
 * access to req.params, this case is not to frequent but when you nest a
 * different express router req.params is cleaned.
 */

module.exports = (req, res, next) => {
  req.persistedParams = Object.assign({}, req.params);
  next();
};
