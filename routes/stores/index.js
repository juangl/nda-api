const debug = require('debug')('stores');
let utils = require('../../utils');
const { authorize, grantAccess, sanitizer } = require('../../middlewares');
const {
  general: { respond },
  db,
  shapes,
} = utils;

let { router } = utils;
router = router(['stores']);

router.get('/', authorize, grantAccess, async (req, res) => {
  const category = req.query.category;
  respond(await db.store.getStores(category), res);
});

router.get('/:id', authorize, grantAccess, async (req, res) => {
  const storeId = req.params.id;
  respond(await db.store.getStore(storeId, req.locals.user.id), res, error => {
    if (error) {
      debug(`Get store with id ${storeId} has failed`);
    } else {
      debug(`Get store with id ${storeId} has been successful`);
    }
  });
});

const postStoreSanitizer = sanitizer(shapes.store, {
  secured: true,
  required: true,
});

router.post(
  '/',
  authorize,
  grantAccess,
  postStoreSanitizer,
  async (req, res) => {
    const ownerId = req.locals.user.id;
    debug(`User with id ${ownerId} is creating a new store`);
    const newStore = req.body;
    newStore.ownerId = ownerId;
    respond(await db.store.createStore(newStore), res, error => {
      if (error) {
        debug(`User with id ${ownerId} has failed by creating a new store`);
      } else {
        debug(`User with id ${ownerId} has created a new store`);
      }
    });
  },
);

router.patch('/:id', authorize, grantAccess, async (req, res) => {
  const storeId = req.params.id;
  const verification = await db.store.verifyProperty(
    storeId,
    req.locals.user.id,
  ); //TODO: verify the property of the store.
  const patch = sanitizer('store', req.body);
  const fields = Object.keys(patch);
  if (!fields.length) {
    res.status(422);
    return respond(new Error('invalid patch'), res);
  }
  respond(await db.patch('stores', storeId, patch), res, error => {
    if (error) {
      debug(`Store with id ${storeId} has failed by being patched`);
    } else {
      debug(`Store with id ${storeId} was succesfully patched`);
    }
  });
});

module.exports = router;
