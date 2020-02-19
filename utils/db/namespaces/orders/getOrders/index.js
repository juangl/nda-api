const getBasicOrders = require('../utils/getBasicOrder');
const getOrderProducts = require('../utils/getOrderProducts');

module.exports = db => async userId => {
  let orders = await getBasicOrders(db, { userId });

  if (!orders.length)
    throw new Error(`Order with id ${orderId} does not exist`);

  orders = orders.map(async order => ({
    ...order,
    products: await getOrderProducts(db, order.id),
  }));

  return await Promise.all(orders);
};
