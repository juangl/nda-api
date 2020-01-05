module.exports = db => async ({ userId, type, id }) => {
  return await db.query(`
    INSERT INTO likedItems(
      userId,
      entityType,
      entityId
    )
    VALUES(
      ${userId},
      "${type}",
      ${id}
    );
  `);
};
