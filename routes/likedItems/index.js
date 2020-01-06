const debug = require('debug')('likedItems');
const utils = require('../../utils');
const { authorize, grantAccess, sanitizer } = require('../../middlewares');
const {
  general: { respond },
  db,
} = utils;

let { router } = utils;
router = router(['liked_stores', 'liked_products']);

router.get('/', authorize, grantAccess, async (req, res) => {
  const userId = req.locals.user.id;
  respond(await db.namespaces.likedItems.getLiked(userId), res);
});

router.post('/', authorize, grantAccess, async (req, res) => {
  const userId = req.locals.user.id;
  const entityType = req.body.type;
  debug(
    `User with id ${userId} is adding a new ${entityType} to its liked items`,
  );
  const newLikedItem = sanitizer('likedItem', req.body, true);
  newLikedItem.userId = userId;
  respond(await db.namespaces.likedItems.likeItem(newLikedItem), res, error => {
    if (error) {
      debug(
        `User with id ${userId} has failed by adding a new item to its liked items`,
      );
    } else {
      debug(
        `User with id ${userId} has liked a ${entityType} with id ${req.body.id}`,
      );
    }
  });
});

// router.get('/:id', authorize, grantAccess, async (req, res) => {
//   const storeId = req.params.id;
//   respond(
//     await db.namespaces.stores.getStore(storeId, req.locals.user.id),
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

// router.patch('/:id', authorize, grantAccess, async (req, res) => {
//   const storeId = req.params.id;
//   const verification = await db.namespaces.stores.verifyProperty(
//     storeId,
//     req.locals.user.id,
//   ); //TODO: verify the property of the store.
//   const patch = sanitizer('store', req.body);
//   const fields = Object.keys(patch);
//   if (!fields.length) {
//     res.status(422);
//     return respond(new Error('invalid patch'), res);
//   }
//   respond(await db.patch('stores', storeId, patch), res, error => {
//     if (error) {
//       debug(`Store with id ${storeId} has failed by being patched`);
//     } else {
//       debug(`Store with id ${storeId} was succesfully patched`);
//     }
//   });
// });

module.exports = router;
