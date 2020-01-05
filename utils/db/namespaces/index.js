module.exports = db => ({
  users: require('./users')(db),
  stores: require('./stores')(db),
  likedItems: require('./likedItems')(db),
});
