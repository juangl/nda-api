module.exports = (req, res, next) => {
  req.persistedParams = Object.assign({}, req.params);
  next();
};
