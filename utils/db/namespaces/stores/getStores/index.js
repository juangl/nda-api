const ratings = require('./subQueries/ratings');

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
      (${ratings}) ratings
    ON base.id = ratings.entityId
  `;

  const stores = await db.query(finalQuery);

  stores.forEach(async store => {
    store.images = await db.query(`
      SELECT
        url
      FROM images
      WHERE
        entityType = "store" AND
        entityId = ${store.id}
    `);
  });

  return stores;
};
