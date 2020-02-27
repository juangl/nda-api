module.exports = {
  sanitizer: require('./sanitizer'),
  authorize: require('./authorize'),
  extensions: require('./extensions'),
  grantAccess: require('./grantAccess'),
  errorHandler: require('./errorHandler'),
  persistParams: require('./persistParams'),
  setPagination: require('./setPagination'),
  setPermissions: require('./setPermissions'),
  verifyProperty: require('./verifyProperty'),
  realEntityMapper: require('./realEntityMapper'),
  entityIdParamValidator: require('./entityIdParamValidator'),
};
