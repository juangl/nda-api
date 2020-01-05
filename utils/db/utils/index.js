module.exports = db => ({
  patch: require('./patch')(db),
});
