module.exports = entityType => `
  SELECT
    r.userId,
    r.entityId,
    COUNT(r.entityId) as userRatings
  FROM
    ratings r
  WHERE
    r.entityType = "${entityType}"
  GROUP BY r.entityId, r.userId
`;
