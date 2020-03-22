const { getListWhereCondition } = require('./helpers');
const formatters = require('../../../utils/formatters');
const getProductsQuery = require('../../../utils/queries/products');

module.exports = db => async (list, userId) => {
  const products = await db.query(`
    ${getProductsQuery(userId)}
    WHERE
      ${getListWhereCondition(list)}
  `);

  for (let i = 0; i < products.length; i++) {
    await formatters.product(products[i]);
  }

  return products;
};
