const formatters = require('../../../utils/formatters');
const getProductsQuery = require('../../../utils/queries/products');
const whereClauseComposer = require('../../../utils/whereClauseComposer');

module.exports = db => async (storeId, userId, config) => {
  const { pagination, filters } = config;

  const products = await db.query(`
  ${getProductsQuery(userId)}
  ${filters.joinSqlString}
  ${whereClauseComposer(
    [`products.storeId = ${storeId}`, filters.whereSqlString].filter(a => a),
  )}
  ${pagination.sqlString};
`);

  for (let i = 0; i < products.length; i++) {
    await formatters.product(products[i]);
  }

  return products;
};
