module.exports = (entityType, storeId) => `
  SELECT
    i.url
  FROM
    images i
  WHERE
    i.entityType = "${entityType}" AND
    i.entityId = ${storeId}
`;
