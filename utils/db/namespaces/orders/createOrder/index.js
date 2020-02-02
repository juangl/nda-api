const ensureInsertion = require('../../../utils/ensureInsertion');

const servicePrice = 30; // TODO: Make this dynamically

module.exports = db => async order => {
  const getOrder = require('../getOrder')(db);
  let totalPrice = 0;
  const { products } = order;
  for (let i = 0; i < products.length; i++) {
    const { id, quantity } = products[i];
    // TODO: Consider currencies
    const result = (
      await db.query(`
      SELECT price FROM products WHERE id=${id} LIMIT 1
    `)
    )[0];
    if (!result) throw new Error(`The product with id ${id} does not exist`);
    totalPrice += result.price * quantity;
  }

  totalPrice += servicePrice;

  const invoiceId = ensureInsertion(
    await db.query(`
    INSERT INTO
      invoices(
        charge
      )
      VALUES(
        ${totalPrice}
      );
  `),
  );

  const orderId = ensureInsertion(
    await db.query(`
    INSERT INTO
      orders(
        userId,
        address,
        coords,
        invoiceId
      )
      VALUES(
        ${order.userId},
        "${order.address}",
        "${order.coords}",
        ${invoiceId}
      );
  `),
  );

  const orderProducts = order.products
    .map(
      product =>
        `(
          ${orderId},
          ${product.id},
          ${product.quantity},
          ${product.comment ? `"${product.comment}"` : 'NULL'}
        )`,
    )
    .join(',');

  ensureInsertion(
    await db.query(`
    INSERT INTO
      ordersProducts(
        orderId,
        productId,
        quantity,
        comment
      )
    VALUES
      ${orderProducts};
  `),
  );

  return await getOrder(orderId);
};
