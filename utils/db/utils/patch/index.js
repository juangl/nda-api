const debug = require('debug')('DB_PATCHER');

module.exports = db => async (tableName, resourceId, sanitized) => {
  let queriedFields = '';
  for (each in sanitized) {
    const isString = typeof each === 'string';
    queriedFields += ` ${each} = ${isString ? '"' : ''}${sanitized[each]}${
      isString ? '"' : ''
    },`;
  }
  queriedFields = queriedFields.substring(0, queriedFields.length - 1);
  debug(`Patching ${tableName} with`, queriedFields);
  return await db.query(
    `UPDATE ${tableName} SET${queriedFields} WHERE id = ${resourceId}`,
  );
};
