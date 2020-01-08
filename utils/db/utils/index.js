module.exports = db => ({
  patch: require('./patch')(db),
  queries: require('./queries'),
});
