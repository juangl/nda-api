module.exports = db => ({
  getLiked: require('./getLiked')(db),
});
