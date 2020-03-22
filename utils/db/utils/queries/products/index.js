const ratings = require('../ratings');
const userLikes = require('../userLikes');
const userRatings = require('../userRatings');

const getProductQuery = userId => `
SELECT
  products.*,
  productRatings.rating,
  productRatings.whoRated,
  userLikes.likesCount,
  userProductRatings.userRatings
  FROM
    products
  LEFT JOIN
    (${ratings('product')}) productRatings
  ON
    products.id = productRatings.entityId
  LEFT JOIN
    (${userLikes('product')}) userLikes
  ON products.id = userLikes.entityId AND userLikes.userId = ${userId}
  LEFT JOIN
    (${userRatings('product')}) userProductRatings
  ON
    products.id = userProductRatings.entityId AND
    userProductRatings.userId = ${userId}
  `;

module.exports = getProductQuery;
