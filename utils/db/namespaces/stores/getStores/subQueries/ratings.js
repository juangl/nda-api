module.exports = `
  SELECT
    entityId,
    AVG(stars) as rating,
    COUNT(stars) as whoRated
    FROM ratings
  WHERE
    entityType = "store"
  GROUP BY entityId
`;
