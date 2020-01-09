module.exports = db => ({
  getStore: require('./getStore')(db),
  getStores: require('./getStores')(db),
  verifyProperty: require('./verifyProperty')(db),
});
