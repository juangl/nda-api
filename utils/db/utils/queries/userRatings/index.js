module.exports = entityType => `
  SELECT
    userId,
    entityId,
    COUNT(entityId) as userRatings
  FROM
    ratings
  WHERE
    entityType = "${entityType}"
  GROUP BY entityId, userId
`;
