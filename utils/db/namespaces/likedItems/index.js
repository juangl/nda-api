module.exports = db => ({
  getLiked: require('./getLiked')(db),
  likeItem: require('./likeItem')(db),
});
