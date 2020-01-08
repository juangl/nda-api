module.exports = db => ({
  createProduct: require('./createProduct')(db),
});
