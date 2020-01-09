module.exports = db => (tableName, id, idField = 'id') =>
  db.query(`
    DELETE FROM ${tableName} WHERE ${idField} = ${id};
  `);
