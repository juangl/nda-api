const router = require('../utils/router')(['liked_stores', 'liked_products']);
const debug = require('debug')('likedItems');
const dbClient = require('../utils/dbClient');
const { authorize, grantAccess } = require('../utils/middlewares');
const sanitizer = require('../utils/sanitizers');
const { respond } = require('../utils/general');

router.get('/', authorize, grantAccess, async (req, res) => {
  const userId = req.locals.user.id;
  respond(await dbClient.likedItems.getLiked(userId), res);
});

// router.get('/:id', authorize, grantAccess, async (req, res) => {
//   const storeId = req.params.id;
//   respond(
//     await dbClient.store.getStore(storeId, req.locals.user.id),
//     res,
//     error => {
//       if (error) {
//         debug(`Get store with id ${storeId} has failed`);
//       } else {
//         debug(`Get store with id ${storeId} has been successful`);
//       }
//     },
//   );
// });

// router.post('/', authorize, grantAccess, async (req, res) => {
//   const ownerId = req.locals.user.id;
//   debug(`User with id ${ownerId} is creating a new store`);
//   let newStore = sanitizer('store', req.body, true, true);
//   newStore.ownerId = ownerId;
//   respond(await dbClient.store.createStore(newStore), res, error => {
//     if (error) {
//       debug(`User with id ${ownerId} has failed by creating a new store`);
//     } else {
//       debug(`User with id ${ownerId} has created a new store`);
//     }
//   });
// });

// router.patch('/:id', authorize, grantAccess, async (req, res) => {
//   const storeId = req.params.id;
//   const verification = await dbClient.store.verifyProperty(
//     storeId,
//     req.locals.user.id,
//   ); //TODO: verify the property of the store.
//   const patch = sanitizer('store', req.body);
//   const fields = Object.keys(patch);
//   if (!fields.length) {
//     res.status(422);
//     return respond(new Error('invalid patch'), res);
//   }
//   respond(await dbClient.patch('stores', storeId, patch), res, error => {
//     if (error) {
//       debug(`Store with id ${storeId} has failed by being patched`);
//     } else {
//       debug(`Store with id ${storeId} was succesfully patched`);
//     }
//   });
// });

module.exports = router;
