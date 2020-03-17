module.exports = (req, res, next) => {
  const errors = [];
  const { category, priceRange } = req.query;
  const filters = {};

  if (category !== undefined) {
    const categoryId = Number(category);
    if (Number.isNaN(categoryId)) {
      errors.push('category is not a valid category id number');
    } else {
      filters.category = categoryId;
    }
  }

  if (priceRange !== undefined) {
    const splitted = priceRange.split('-');
    if (splitted.length !== 2) {
      errors.push(
        'priceRange does not respect the right priceRange format (FROM-TO)',
      );
    } else {
      filters.priceRange = {
        min: splitted[0],
        max: splitted[1],
      };
    }
  }

  if (errors.length) {
    if (errors.length === 1) {
      throw new Error(errors[0]);
    } else {
      throw new Error(`${errors[0]} and ${errors[1]}`);
    }
  }

  let whereClause = '';

  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    whereClause = ` price BETWEEN ${min} AND ${max}`;
  }

  req.filters = {
    whereClause,
    config: filters,
    join: productsTableName => {
      return filters.category
        ? `RIGHT JOIN
          (SELECT categoryId, productId FROM
            categoriesProducts cp
          WHERE cp.categoryId = ${filters.category}
          ) c
        ON ${productsTableName}.id = c.productId`
        : '';
    },
  };

  next();
};
