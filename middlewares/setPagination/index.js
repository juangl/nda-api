module.exports = (req, res, next) => {
  const { limit = 20, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  req.pagination = `LIMIT ${limit} OFFSET ${offset}`;

  next();
};
