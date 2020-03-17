module.exports = entityType => `
  SELECT
    userId,
    entityId,
    entityType,
    COUNT(id) as likesCount
  FROM
    likedItems
  WHERE
    entityType="${entityType}"
  GROUP BY likedItems.id
`;
