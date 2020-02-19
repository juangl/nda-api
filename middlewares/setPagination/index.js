module.exports = (req, res, next) => {
  const { limit, offset } = req.query;
  req.pagination = {
    limit: limit || 20,
    offset: offset || 0,
  };
  next();
};
