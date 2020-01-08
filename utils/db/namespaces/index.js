module.exports = db => ({
  users: require('./users')(db),
  stores: require('./stores')(db),
  products: require('./products')(db),
  likedItems: require('./likedItems')(db),
});
