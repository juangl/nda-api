module.exports = async (db, orderId) => {
  return await Promise.all(
    (
      await db.query(`
    SELECT
      productId as id,
      quantity
    FROM
      ordersProducts
    WHERE
      orderId=${orderId};
  `)
    ).map(async ({ id, quantity }) => {
      const productInfo = (
        await db.query(`
      SELECT
        name,
        price,
        storeId
      FROM
        products
      WHERE
        products.id=${id}
      LIMIT 1;
    `)
      )[0];
      return Object.assign(productInfo, { quantity });
    }),
  );
};
