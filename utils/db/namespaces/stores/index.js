module.exports = db => ({
  getStore: require('./getStore')(db),
  getStores: require('./getStores')(db),
  getStoreProducts: require('./getStoreProducts')(db),
});
