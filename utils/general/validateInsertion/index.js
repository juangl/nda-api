module.exports = result => {
  if (result.__proto__.constructor.name === 'ResultSetHeader')
    return !!result.affectedRows;
  return false;
};
