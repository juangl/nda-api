module.exports = db => async (storeId, userId) => {
  const ratings = `
  SELECT
    AVG(stars) as avg,
    COUNT(stars) as count
  FROM ratings
  WHERE
    entityType = "store" AND
    entityId = "${storeId}"`;

  const userRatings = `
  SELECT
    COUNT(*) as userRatings
  FROM ratings
  WHERE
    entityType = "store" AND
    entityId = ${storeId} AND
    userId = ${userId}
  `;

  let result = (
    await db.query(`
  SELECT * FROM 
  (SELECT * FROM stores WHERE id = ${storeId}) stores
  JOIN
  (SELECT
    ratings.avg as rating,
    ratings.count as whoRated,
    userRatings.userRatings
  FROM
    (${ratings}) ratings
    JOIN
    (${userRatings}) userRatings
  ) ratingsStuff
  `)
  )[0];
  if (!result.length) {
    // Send an error
    return result;
  }
  result = result[0];

  const images = (
    await db.query(`
  SELECT
    url
  FROM images
  WHERE
    entityType = "store" AND
    entityId = ${storeId}
  `)
  )[0].map(({ url }) => url);

  let products = (
    await db.query(`
  SELECT
    id,
    name,
    availability,
    maxQuantity
  FROM products
  WHERE
    storeId = ${storeId}
  `)
  )[0];

  for (each in products) {
    products[each].images = (
      await db.query(`
      SELECT
        url
      FROM images
      WHERE
        entityType = "product" AND
        entityId = ${products[each].id}
    `)
    )[0];

    Object.assign(
      products[each],
      (
        await db.query(`
    SELECT * FROM
      (SELECT
        AVG(stars) as rating,
        COUNT(stars) as whoRated
      FROM ratings
      WHERE
        entityType = "product" AND
        entityId = ${products[each].id}) a
      
      JOIN

      (SELECT
        COUNT(*) as userRatings
      FROM ratings
      WHERE
        entityType = "product" AND
        entityId = ${userId}) b
    `)
      )[0][0],
    );

    products[each].ratedByUser = !!products[each].userRatings;
    delete products[each].userRatings;
  }

  result.images = images;
  result.products = products;
  result.ratedByUser = !!result.userRatings;
  delete result.userRatings;
  return result;
};
