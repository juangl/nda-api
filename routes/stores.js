const router = require('../utils/router')('stores');
const debug = require('debug')('stores');
const dbClient = require('../utils/dbClient');
const { authorize, grantAccess } = require('../utils/middlewares');
const sanitizer = require('../utils/sanitizers');
const { respond } = require('../utils/general');

router.get('/', authorize, grantAccess, async (req, res) => {
  const category = req.query.category;
  respond(await dbClient.store.getStores(category), res);
});

router.get('/:id', authorize, grantAccess, async (req, res) => {
  const storeId = req.params.id;
  respond(await dbClient.store.getStore(storeId, res.locals.user.id), res);
});

router.post('/', authorize, grantAccess, async (req, res) => {
  const ownerId = res.locals.user.id;
  const ownerInfo = await dbClient.user.getUser(ownerId);
  if(ownerInfo.role !== 'partner') return respond(new Error('your account type is not the needed type to create a store'), res);
  let newStore = sanitizer('store', req.body, true, true);
  newStore.ownerId = ownerId;
  respond(await dbClient.store.createStore(newStore), res);
});

router.patch('/:id', authorize, grantAccess, async (req, res) => {
  const storeId = req.params.id;
  const verification = await dbClient.store.verifyProperty(storeId, res.locals.user.id); //TODO: verify the property of the store.
  const patch = sanitizer('store', req.body);
  const fields = Object.keys(patch);
  if (!fields.length){
    res.status(422);
    return respond(new Error('invalid patch'), res);
  }
  respond(await dbClient.patch('stores', storeId, patch), res);
});

module.exports = router;