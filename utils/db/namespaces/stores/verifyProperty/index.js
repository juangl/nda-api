module.exports = db => async (storeId, userId) =>
  !!(
    await db.query(
      `SELECT
        COUNT(*) as count
      FROM
        stores
      WHERE
        id = ${storeId} AND
        ownerId = ${userId}`,
    )
  )[0].count;
