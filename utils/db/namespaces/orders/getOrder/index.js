const invoices = require('./subQueries/invoices');
const { deleteProperties } = require('../../../../general');

module.exports = db => async (orderId, userId) => {
  const order = (
    await db.query(`
    SELECT o.*, i.*
      FROM orders o
    LEFT JOIN
      (${invoices}) i
    ON
      o.invoiceId=i.invoiceId
    WHERE
      o.id=${orderId};
  `)
  )[0];
  if (!order) throw new Error(`Order with id ${orderId} does not exist`);
  deleteProperties(order, ['userId', 'invoiceId']);
  const orderProducts = (
    await db.query(
      `
    SELECT
      productId as id,
      quantity
    FROM
      ordersProducts
    WHERE
      orderId=${orderId};
  `,
    )
  ).map(async ({ id, quantity }) => {
    const productInfo = (
      await db.query(`
      SELECT
        name,
        price,
        storeId
      FROM
        products
      WHERE products.id=${id};
    `)
    )[0];
    return Object.assign(productInfo, { quantity });
  });
  return {
    ...order,
    products: await Promise.all(orderProducts),
  };
};
