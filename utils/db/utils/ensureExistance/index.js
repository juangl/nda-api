const {
  validateNumber,
  equalityValidator,
  lessThanValidator,
  greaterThanValidator,
} = require('./helpers');

module.exports = db => async (tableName, object, configuration = '1') => {
  if (typeof configuration !== 'string')
    throw new Error('The configuration param of ensureEntity must be a string');
  const prefix = configuration.charAt(0);
  let validator;
  let amount;
  switch (prefix) {
    case '+':
      amount = configuration.substring(1, configuration.length);
      validator = greaterThanValidator;
      break;
    case '-':
      amount = configuration.substring(1, configuration.length);
      validator = lessThanValidator;
      break;
    default:
      amount = configuration;
      validator = equalityValidator;
      break;
  }
  validateNumber(amount);

  const objectEntries = Object.entries(object);

  let whereQuery = '';

  objectEntries.forEach(([key, value]) => {
    whereQuery += `${key} = ${
      typeof value === 'string' ? `"${value}"` : value
    } AND `;
  });

  // Remove the ' AND ';
  whereQuery = whereQuery.substring(0, whereQuery.length - 5);

  const results = await db.query(`
    SELECT * FROM
      ${tableName}
    WHERE
      ${whereQuery};
  `);

  return validator(amount, results.length);
};
