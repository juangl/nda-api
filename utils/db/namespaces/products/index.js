module.exports = db => ({
  getPriceRange: require('./getPriceRange')(db),
  getProductsByList: require('./getProductsByList')(db),
  getProductsBySearch: require('./getProductsBySearch')(db),
  getProductsCategories: require('./getProductsCategories')(db),
});
