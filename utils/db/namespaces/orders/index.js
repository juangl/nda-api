module.exports = db => ({
  createOrder: require('./createOrder')(db),
});
