module.exports = db => async (orderId, status) => {
  const patch = require('../../../utils/patch')(db);
  return await patch('orders', orderId, { status });
};
