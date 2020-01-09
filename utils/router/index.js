const { setPermissions } = require('../../middlewares');
module.exports = sufixes => {
  const router = require('express').Router();
  router.use('/', setPermissions(sufixes));
  return router;
};
