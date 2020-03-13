module.exports = db => ({
  getPriceRange: require('./getPriceRange')(db),
  getProductsBySearch: require('./getProductsBySearch')(db),
  getProductsCategories: require('./getProductsCategories')(db),
});
