module.exports = db => async category => {
  let categoryId;
  let baseQuery = `SELECT * FROM stores`;
  if (category) {
    const result = (
      await db.query(`SELECT id FROM categories WHERE category = "${category}"`)
    )[0];
    if (result.length) categoryId = result[0].id;
  }

  if (categoryId) {
    baseQuery += ` WHERE categoryId = ${categoryId}`;
  }

  const finalQuery = `
  SELECT *, a.id as id FROM
    (${baseQuery}) a

  LEFT JOIN

    (SELECT
      entityId,
      AVG(stars) as rating,
      COUNT(stars) as whoRated,
      id
    FROM ratings
    WHERE
      entityType = "store") b
    ON a.id = b.entityId
  `;

  const stores = (await db.query(finalQuery))[0];

  for (each in stores) {
    stores[each].images = (
      await db.query(`
      SELECT
        url
      FROM images
      WHERE
        entityType = "store" AND
        entityId = ${stores[each].id}
    `)
    )[0];
  }

  return stores;
};
