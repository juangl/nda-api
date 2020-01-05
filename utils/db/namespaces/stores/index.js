module.exports = db => ({
  getStore: require('./getStore')(db),
  getStores: require('./getStores')(db),
  createStore: require('./createStore')(db),
  verifyProperty: require('./verifyProperty')(db),
});
