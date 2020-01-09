// NOTE: Requiring this way (not from index file) to avoid cyclic dependencies
// middlewares/index.js > middlewares/authorize/index.js > utils/index.js > utils/router/index.js
// TODO: Improve the way we are requiring this module
const setPermissions = require('../../middlewares/setPermissions');

module.exports = sufixes => {
  const router = require('express').Router();
  router.use('/', setPermissions(sufixes));
  return router;
};
