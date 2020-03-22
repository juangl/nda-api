const formatters = require('../../../utils/formatters');
const getProductsQuery = require('../../../utils/queries/products');
const deleteProperties = require('../../../../general/deleteProperties');

module.exports = db => async (keyword, userId, pagination) => {
  const products = await db.query(`
      ${getProductsQuery(userId)}
      WHERE
        products.name LIKE "%${keyword}%"
      ${pagination};
  `);

  for (let i = 0; i < products.length; i++) {
    await formatters.product(products[i]);
  }

  return products;
};
