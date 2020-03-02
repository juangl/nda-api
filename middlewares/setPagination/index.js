module.exports = (req, res, next) => {
  let { limit = 20, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  limit = parseInt(limit);
  page = parseInt(page);

  let errors = [];
  let errorCount = 0;

  if (Number.isNaN(limit)) {
    errorCount++;
    errors.push('limit');
  }
  if (Number.isNaN(page)) {
    errorCount++;
    errors.push('page');
  }

  if (errorCount) {
    throw new Error(
      `${errorCount === 1 ? errors[0] : errors.join(' and ')} must be${errorCount === 1 ? ' an' : ''} integer${errorCount > 1 ? 's' : ''}`,
    );
  }

  req.pagination = {
    config: {
      limit,
      offset,
    },
    sqlString: `LIMIT ${limit} OFFSET ${offset}`,
  };

  next();
};
