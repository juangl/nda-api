module.exports = entityType => `
  SELECT
    r.entityId,
    AVG(r.stars) as rating,
    COUNT(r.stars) as whoRated
  FROM ratings r
  WHERE
    r.entityType = "${entityType}"
  GROUP BY entityId
`;
