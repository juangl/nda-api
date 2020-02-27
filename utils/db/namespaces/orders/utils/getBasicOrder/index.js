const invoices = require('../subQueries/invoices');
const deleteProperties = require('../../../../../general/deleteProperties');

module.exports = async (db, { orderId, userId, status }) => {
  let whereStatement = '';
  if (orderId) {
    whereStatement += `o.id=${orderId} AND `;
  }
  if (userId) {
    whereStatement += `o.userId=${userId} AND `;
  }
  if (status) {
    whereStatement += `o.status=${status} AND `;
  }
  whereStatement = whereStatement.substring(0, whereStatement.length - 5);
  const orders = await db.query(`
    SELECT
      o.*, i.*
    FROM
      orders o
    LEFT JOIN
      (${invoices}) i
    ON
      o.invoiceId=i.invoiceId
    WHERE
      ${whereStatement};
  `);
  orders.forEach(order => deleteProperties(order, ['userId', 'invoiceId']));
  return orders;
};
