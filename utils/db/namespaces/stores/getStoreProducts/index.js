const queries = require('../../../utils/queries');
const deleteProperties = require('../../../../general/deleteProperties');

module.exports = db => async (storeId, userId, pagination) => {
  const products = await db.query(`
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
      WHERE
        p.storeId = ${storeId}
      ${pagination};
  `);

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
      'userRatings',
    ]);
  }
  return products;
};
