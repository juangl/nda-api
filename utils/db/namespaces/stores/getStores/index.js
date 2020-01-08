const queries = require('../../../utils/queries');
const { deleteProperties } = require('../../../../general');

module.exports = db => async category => {
  let baseQuery = `SELECT * FROM stores`;
  if (category) {
    const results = await db.query(
      `SELECT id FROM categories WHERE category = "${category}"`,
    );
    if (results.length) baseQuery += ` WHERE categoryId = ${results[0].id}`;
  }

  const finalQuery = `
    SELECT *, base.id as id
    FROM
      (${baseQuery}) base
    LEFT JOIN
      (${queries.ratings('store')}) ratings
    ON base.id = ratings.entityId
  `;

  const stores = await db.query(finalQuery);

  for (let i = 0; i < stores.length; i++) {
    const currentStore = stores[i];
    currentStore.images = await db.query(
      queries.images('store', currentStore.id),
    );
    deleteProperties(currentStore, ['ownerId', 'entityId']);
  }

  return stores;
};
