const router = require('../utils/router')('stores');
const debug = require('debug')('stores');
const dbClient = require('../utils/dbClient');
const { authorize, grantAccess } = require('../utils/middlewares');
const userSanitizer = require('../utils/sanitizers').store;

//Get list of stores
router.get('/', authorize, grantAccess, async (req, res) => {
  const category = req.query.category;
  res.json({
    success: true,
    payload: await dbClient.store.getStores(category)
  });
});

router.get('/:id', authorize, grantAccess, async (req, res) => {
  const storeId = req.params.id;
  const result = await dbClient.store.getStore(storeId, res.locals.user.id);
  if(!result){
    return res.json({
      success: false,
      payload: {
        message: 'the store was not found'
      }
    });
  }
  res.json({
    success: true,
    payload: result
  })
});

module.exports = router;