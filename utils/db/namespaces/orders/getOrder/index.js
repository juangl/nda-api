const getBasicOrders = require('../utils/getBasicOrder');
const getOrderProducts = require('../utils/getOrderProducts');

module.exports = db => async (orderId, userId) => {
  const order = (await getBasicOrders(db, { orderId, userId }))[0];

  if (!order) throw new Error(`Order with id ${orderId} does not exist`);

  return {
    ...order,
    products: await getOrderProducts(db, orderId),
  };
};
