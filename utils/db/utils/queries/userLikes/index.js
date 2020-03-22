module.exports = entityType => `
  SELECT
    userId,
    entityId,
    COUNT(id) as likesCount
  FROM
    likedItems
  WHERE
    entityType="${entityType}"
  GROUP BY entityId, userId
`;
