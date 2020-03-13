const queries = require('../../../utils/queries');
const deleteProperties = require('../../../../general/deleteProperties');
const whereClauseComposer = require('../../../utils/whereClauseComposer');

module.exports = db => async (storeId, userId, config) => {
  const { pagination, filters } = config;

  const query = `
  SELECT
    *
  FROM
    products p
  LEFT JOIN
    (${queries.ratings('product')}) productRatings
  ON
    p.id = productRatings.entityId
  LEFT JOIN
    (${queries.userRatings('product')}) userProductRatings
  ON
    p.id = userProductRatings.entityId AND
    userProductRatings.userId = ${userId}
  ${filters.join('p') /*Product table alias*/}
  ${whereClauseComposer(
    [`p.storeId = ${storeId}`, filters.whereClause].filter(a => a),
  )}
  ${pagination.sqlString};
`;

  const products = await db.query(query);

  for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];
    currentProduct.images = await db.query(
      queries.images('product', currentProduct.id),
    );
    currentProduct.ratedByUser = !!currentProduct.userRatings;
    deleteProperties(currentProduct, [
      'userId',
      'storeId',
      'entityId',
      'productId',
      'userRatings',
    ]);
  }
  return products;
};
