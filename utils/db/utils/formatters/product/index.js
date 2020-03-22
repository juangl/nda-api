const db = require('../../../db');
const getImagesQuery = require('../../queries/images');

const productFormatter = async product => {
  product.images = await db.query(getImagesQuery('product', product.id));
  product.ratedByUser = !!product.userRatings;
  product.likedByUser = !!product.likesCount;
  product.price = Number(product.price);
  product.rating = product.rating || 0;
  product.whoRated = product.whoRated || 0;
  product.deleteProperties([
    'userId',
    'storeId',
    'entityId',
    'productId',
    'entityType',
    'likesCount',
    'userRatings',
  ]);
};

module.exports = productFormatter;
