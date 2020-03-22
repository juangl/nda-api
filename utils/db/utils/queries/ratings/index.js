module.exports = entityType => `
  SELECT
    entityId,
    AVG(stars) as rating,
    COUNT(stars) as whoRated
  FROM ratings
  WHERE
    entityType = "${entityType}"
  GROUP BY entityId
`;
