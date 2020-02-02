module.exports = db => ({
  getOrder: require('./getOrder')(db),
  createOrder: require('./createOrder')(db),
});
