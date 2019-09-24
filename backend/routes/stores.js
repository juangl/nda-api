const router = require('../utils/router')('stores');
const debug = require('debug')('stores');
const dbClient = require('../utils/dbClient');
const { authorize, grantAccess } = require('../utils/middlewares');
const sanitizer = require('../utils/sanitizers');

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

router.patch('/:id', authorize, grantAccess, async (req, res) => {
  const storeId = req.params.id;

  const verification = await dbClient.store.verifyProperty(storeId, res.locals.user.id);

  const patch = sanitizer('store', req.body);
  const fields = Object.keys(patch);
  if (!fields.length) return res.status(422).json({
    success: false,
    payload: {
      message: 'invalid patch'
    }
  });
  const patching = await dbClient.patch('stores', storeId, patch);
  if (!patching){
    debug('Error while patching the store');
    return res.json({
      success: false,
      payload: {
        message: 'there was an error while trying to update the resource'
      }
    }) 
  }
  debug('The store was patched successfuly');
    res.json({
      success: true,
    });
});

module.exports = router;