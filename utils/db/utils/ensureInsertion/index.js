module.exports = resultSet => {
  if (resultSet.__proto__.constructor.name !== 'ResultSetHeader')
    throw new Error(
      'You must provide a ResultSetHeader instance to ensureInsertion utility',
    );
  if (!resultSet.affectedRows)
    throw new Error(`There was an error while inserting`);
  return resultSet.insertId;
};
