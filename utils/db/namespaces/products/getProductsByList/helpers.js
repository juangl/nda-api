const getListWhereCondition = list =>
  list.map(productId => `products.id = ${productId}`).join(' OR ');

module.exports = {
  getListWhereCondition,
};
