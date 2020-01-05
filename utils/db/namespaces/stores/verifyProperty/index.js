module.exports = db => async (storeId, userId) =>
  !!(
    await connection.query(
      `SELECT COUNT(*) as count FROM stores WHERE id = ${storeId} AND ownerId = ${userId}`,
    )
  )[0][0].count;
