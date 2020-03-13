module.exports = arrayOfWheres => {
  arrayOfWheres.map(eachWhere => eachWhere.trim());
  return `WHERE ${arrayOfWheres.join(' AND ')}`
};
