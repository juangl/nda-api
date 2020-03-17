module.exports = entityType => `
  SELECT
    *,
    COUNT(*) as likesCount
  FROM
    likedItems
  WHERE
    entityType="${entityType}"
  GROUP BY likedItems.id
`;
