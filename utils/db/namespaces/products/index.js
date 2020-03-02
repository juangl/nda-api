module.exports = db => ({
  getProductsBySearch: require('./getProductsBySearch')(db),
});
