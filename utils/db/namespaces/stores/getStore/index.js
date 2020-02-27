const queries = require('../../../utils/queries');
const deleteProperties = require('../../../../general/deleteProperties');

module.exports = db => async (storeId, userId) => {
  let result = await db.query(`
    SELECT
      *
    FROM 
      stores s
    LEFT JOIN
      (${queries.ratings('store')}) storeRatings
    ON
      s.id = storeRatings.entityId
    LEFT JOIN
      (${queries.userRatings('store')}) userStoreRatings
    ON
      s.id = userStoreRatings.entityId AND
      userStoreRatings.userId = ${userId}
    WHERE
      s.id = ${storeId}
  `);
  if (!result.length) {
    return result; // NOTE: respond utility handles empty arrays as errors
  }
  result = result[0];

  const images = (await db.query(queries.images('store', storeId))).map(
    ({ url }) => url,
  );

  let products = await db.query(`
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
        p.storeId = ${storeId};
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

  result.images = images;
  result.products = products;
  result.ratedByUser = !!result.userRatings;
  deleteProperties(result, ['entityId', 'userId', 'userRatings']);
  return result;
};
