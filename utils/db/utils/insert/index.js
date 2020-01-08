const debug = require('debug')('DB_INSERTER');

// NOTE: This function removes the ", " from the dynamically concatenated query
const removeLastCharacters = string => string.substring(0, string.length - 2);

module.exports = db => async (tableName, newEntity) => {
  let queriedFields = '';
  let queriedValues = '';
  const newEntityKeys = Object.keys(newEntity);
  for (let i = 0; i < newEntityKeys.length; i++) {
    const newEntityPropertyName = newEntityKeys[i];
    const newEntityPropertyValue = newEntity[newEntityPropertyName];
    // FIELDS
    queriedFields += `${newEntityPropertyName}, `;
    // VALUES
    const value =
      typeof newEntityPropertyValue === 'string'
        ? `"${newEntityPropertyValue}"`
        : `${newEntityPropertyValue}`;

    queriedValues += `${value}, `;
  }
  queriedFields = removeLastCharacters(queriedFields);
  queriedValues = removeLastCharacters(queriedValues);
  debug(`Inserting into ${tableName} with`, newEntity);
  return await db.query(`
    INSERT INTO
      ${tableName}(${queriedFields})
    VALUES(
      ${queriedValues}
    );
  `);
};
