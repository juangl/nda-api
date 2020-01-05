module.exports = db => async userId => {
  const response = {
    stores: [],
    products: [],
  };
  const likedItems = await db.query(`
    SELECT * FROM likedItems
    WHERE userId=${userId}
  `);

  for (let i = 0; i < likedItems.length; i++) {
    const currentItem = likedItems[i];
    let tableName = null;
    if (currentItem.entityType === 'store') {
      tableName = 'stores';
    } else if (currentItem.entityType === 'product') {
      tableName = 'products';
    } else {
      throw new Error(
        `There is no such thing as an entityType of ${currentItem.entityType}`,
      );
    }
    const entity = await db.query(`
      SELECT * FROM ${tableName}
      WHERE id=${currentItem.entityId}
      LIMIT 1
    `);
    response[tableName] = response[tableName].concat(entity);
  }

  return response;
};
