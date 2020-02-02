module.exports = db => ({
  getOrder: require('./getOrder')(db),
  getOrders: require('./getOrders')(db),
  createOrder: require('./createOrder')(db),
});
