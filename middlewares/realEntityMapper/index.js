module.exports = (req, res, next) => {
  const entityType = req.params.entityType;
  if (!entityType)
    throw new Error('It is meant to be an entityType property in req.params');
  let realEntityType;
  // TODO: See if it must be better if I took this switch out to a helper funciton
  switch (entityType) {
    case 'likedProducts':
    case 'likedStores':
      realEntityType = 'likedItems';
      break;
    default:
      realEntityType = entityType;
      break;
  }
  req.params.entityType = realEntityType;
  next();
};
